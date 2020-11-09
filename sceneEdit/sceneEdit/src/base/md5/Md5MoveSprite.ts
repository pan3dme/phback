
module md5list {
    import Display3DSprite = Pan3d.Display3DSprite
    import Shader3D = Pan3d.Shader3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import LoadManager = Pan3d.LoadManager
    import ObjData = Pan3d.ObjData
    import Quaternion = Pan3d.Quaternion
    import DualQuatFloat32Array = Pan3d.DualQuatFloat32Array
    import Matrix3D = Pan3d.Matrix3D
    import UIManager = Pan3d.UIManager
    import TextureManager = Pan3d.TextureManager
    import TextureRes = Pan3d.TextureRes
    import Vector3D = Pan3d.Vector3D
    import Scene_data = Pan3d.Scene_data


    export class Md5MoveSprite extends Display3DSprite {
        private md5shader: Shader3D
        constructor() {
            super();
            ProgrmaManager.getInstance().registe(Md5MeshShader.Md5MeshShader, new Md5MeshShader);
            this.md5shader = ProgrmaManager.getInstance().getProgram(Md5MeshShader.Md5MeshShader);
            this.loadTexture();
        }
        public md5MeshData: Md5MeshData;
        public md5objData: ObjData;
        protected loadBodyMesh(): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + this.bodyUrl, LoadManager.XML_TYPE, ($str: any) => {
                this.md5MeshData = new Md5Analysis().addMesh($str);
                new MeshImportSort().processMesh(this.md5MeshData);
                this.md5objData = new MeshToObjUtils().getObj(this.md5MeshData);
                this.loadAnimFrame();
            });
        }
        private bodyUrl: string;
        private animUrl: string;

        public setMd5url($bodyurl: string, $animurl: string, $picurl: string = null): void {
            this.bodyUrl = $bodyurl;
            this.animUrl = $animurl;
            if ($picurl) {
                TextureManager.getInstance().getTexture(Scene_data.fileRoot + $picurl, ($texture: TextureRes) => {
                    this.uvTextureRes = $texture;
                });
            }
            this.loadBodyMesh();
        }
        public frameQuestArr: Array<DualQuatFloat32Array>;
        protected loadAnimFrame(): void {
            LoadManager.getInstance().load(Scene_data.fileRoot  + this.animUrl, LoadManager.XML_TYPE, ($str: any) => {
                var $matrixAry: Array<Array<Matrix3D>> = new Md5animAnalysis().addAnim($str);
                this.frameQuestArr = new Array;
                for (var i: number = 0; i < $matrixAry.length; i++) {
                    var $frameAry: Array<Matrix3D> = $matrixAry[i];
                    for (var j: number = 0; j < $frameAry.length; j++) {
                        $frameAry[j].prepend(this.md5objData.invertAry[j]);
                    }
                    this.frameQuestArr.push(this.makeDualQuatFloat32Array($matrixAry[i]));
                }
            });
        }
        protected makeDualQuatFloat32Array($frameAry: Array<Matrix3D>): DualQuatFloat32Array {
            var newIDBoneArr: Array<number> = this.md5MeshData.boneNewIDAry
            var baseBone: Array<Matrix3D> = $frameAry;
            var $tempDq: DualQuatFloat32Array = new DualQuatFloat32Array;
            $tempDq.quat = new Float32Array(newIDBoneArr.length * 4);
            $tempDq.pos = new Float32Array(newIDBoneArr.length * 3);
            for (var k: number = 0; k < newIDBoneArr.length; k++) {
                var $m: Matrix3D = baseBone[newIDBoneArr[k]].clone();
                $m.appendScale(-1, 1, 1)  //特别标记，因为四元数和矩阵运算结果不一
                var $q: Quaternion = new Quaternion();
                $q.fromMatrix($m)
                var $p: Vector3D = $m.position;
                $tempDq.quat[k * 4 + 0] = $q.x;
                $tempDq.quat[k * 4 + 1] = $q.y;
                $tempDq.quat[k * 4 + 2] = $q.z;
                $tempDq.quat[k * 4 + 3] = $q.w;

                $tempDq.pos[k * 3 + 0] = $p.x;
                $tempDq.pos[k * 3 + 1] = $p.y;
                $tempDq.pos[k * 3 + 2] = $p.z;
            }
            return $tempDq
        }
        protected loadTexture(): void {
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(128, 128, false);
            $ctx.fillStyle = "rgb(255,0,0)";
            $ctx.fillRect(0, 0, 128, 128);
            this.uvTextureRes = TextureManager.getInstance().getCanvasTexture($ctx);

        }
        protected uvTextureRes: TextureRes
        private baseShder: Shader3D;
        public update(): void {
            if (this.md5objData && this.frameQuestArr) {
                this.updateMaterialMeshCopy();
            }
        }

        private lastTm: number = 0
        private _actionTime: number=0
        public updateMaterialMeshCopy(): void {
            

            this.baseShder = this.md5shader
            Scene_data.context3D.setProgram(this.baseShder.program);
            Scene_data.context3D.setVpMatrix(this.baseShder, Scene_data.vpMatrix.m);

    

            Scene_data.context3D.setVcMatrix4fv(this.baseShder, "posMatrix3D", this.posMatrix.m);
            Scene_data.context3D.setRenderTexture(this.baseShder, "fc0", this.uvTextureRes.texture, 0);
            Scene_data.context3D.setVa(0, 3, this.md5objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, this.md5MeshData.uvBuffer);
            Scene_data.context3D.setVa(2, 4, this.md5MeshData.boneIdBuffer);
            Scene_data.context3D.setVa(3, 4, this.md5MeshData.boneWeightBuffer);
 

            var t: number = Pan3d.TimeUtil.getTimer() - this.lastTm;
            this.lastTm = Pan3d.TimeUtil.getTimer()
            this._actionTime += t;


            var _curentFrame: number = float2int(this._actionTime / (Scene_data.frameTime * 2));

            var $len: number = this.frameQuestArr.length;
            var $dualQuatFloat32Array: DualQuatFloat32Array = this.frameQuestArr[_curentFrame % $len]

            Scene_data.context3D.setVc4fv(this.baseShder, "boneQ", $dualQuatFloat32Array.quat); //旋转
            Scene_data.context3D.setVc3fv(this.baseShder, "boneD", $dualQuatFloat32Array.pos);  //所有的位移

            Scene_data.context3D.drawCall(this.md5MeshData.indexBuffer, this.md5MeshData.treNum);

        }
        private skipNum: number = 0

    }
}