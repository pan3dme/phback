module xyz {
    import Shader3D = Pan3d.Shader3D
    import Display3D = Pan3d.Display3D;
    import ProgrmaManager = Pan3d.ProgrmaManager
    import TextureManager = Pan3d.TextureManager
    import UIManager = Pan3d.UIManager;
    import TextureRes = Pan3d.TextureRes;
    import Matrix3D = Pan3d.Matrix3D
    import Scene_data = Pan3d.Scene_data;
    import Object3D = Pan3d.Object3D;
    import Vector3D = Pan3d.Vector3D;
    import LineDisplayShader = Pan3d.LineDisplayShader
    export class TooLineDisplaySprite extends Display3D {

        constructor() {
            super();
            this.objData = new ObjData;
            this.shader = ProgrmaManager.getInstance().getProgram(LineDisplayShader.LineShader);
            this.program = this.shader.program;
            this.makeLineMode(new Vector3D(0, 0, 0), new Vector3D(30, 0, 0), new Vector3D(1, 0, 1));

            this.upToGpu();

        }
        public lineVecPos: Array<number>;
        public lineColor: Array<number>
        public lineIndex: Array<number>
        public baseColor: Vector3D = new Vector3D(1, 0, 1, 1)
        public makeLineMode(a: Vector3D, b: Vector3D, $color: Vector3D = null): void {
            if (!this.lineVecPos || !this.lineIndex) {
                this.clear()
            }
            if ($color) {
                this.baseColor = $color
            }
            this.lineVecPos.push(a.x, a.y, a.z);
            this.lineVecPos.push(b.x, b.y, b.z);

            this.lineColor.push(this.baseColor.x, this.baseColor.y, this.baseColor.z)
            this.lineColor.push(this.baseColor.x, this.baseColor.y, this.baseColor.z)

            this.lineIndex.push(this.lineIndex.length + 0, this.lineIndex.length + 1)

        }
        public clear(): void {
            this.lineVecPos = new Array;
            this.lineIndex = new Array
            this.lineColor = new Array

            if (this.objData.indexBuffer) {
                this.objData.indexBuffer = null
            }
        }
        public upToGpu(): void {
            if (this.lineIndex.length) {
                //console.log("A星长度", this.lineIndex.length)
                this.objData.treNum = this.lineIndex.length
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.lineVecPos);
                this.objData.normalsBuffer = Scene_data.context3D.uploadBuff3D(this.lineColor);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.lineIndex);
            }
        }
        public update(): void {
            if (this.objData && this.objData.indexBuffer) {
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 3, this.objData.normalsBuffer);
                Scene_data.context3D.drawLine(this.objData.indexBuffer, this.objData.treNum);


            }


        }



    }

}