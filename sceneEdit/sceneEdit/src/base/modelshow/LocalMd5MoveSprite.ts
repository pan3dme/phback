
 
 
module left {
    import Md5MoveSprite = md5list.Md5MoveSprite
    import Md5animAnalysis = md5list.Md5animAnalysis
    import Md5Analysis = md5list.Md5Analysis
    import MeshImportSort = md5list.MeshImportSort
    import MeshToObjUtils = md5list.MeshToObjUtils
    import Matrix3D = Pan3d.Matrix3D
    export class LocalMd5MoveSprite extends Md5MoveSprite {
        private meshItem: Array<Md5MoveSprite>;
        constructor() {
            super();
            this.meshItem = new Array;
        }
        public addLocalMeshByStr($str: string): void {
            this.md5MeshData = new Md5Analysis().addMesh($str);
            new MeshImportSort().processMesh(this.md5MeshData);
            this.md5objData = new MeshToObjUtils().getObj(this.md5MeshData);


            var $temp: Md5MoveSprite = new Md5MoveSprite()
            $temp.md5MeshData = this.md5MeshData;
            $temp.md5objData = this.md5objData;
            this.meshItem.push($temp);
        }
        public addLocalAdimByStr($str: string): void {
            var $matrixAry: Array<Array<Matrix3D>> = new Md5animAnalysis().addAnim($str);
            this.frameQuestArr = new Array;
            for (var i: number = 0; i < $matrixAry.length; i++) {
                var $frameAry: Array<Matrix3D> = $matrixAry[i];
                for (var j: number = 0; j < $frameAry.length; j++) {
                    $frameAry[j].prepend(this.md5objData.invertAry[j]);
                }
                this.frameQuestArr.push(this.makeDualQuatFloat32Array($matrixAry[i]));
            }
        }
        public update(): void {
            if (this.md5objData && this.frameQuestArr) {
                for (var i: number = 0; i < this.meshItem.length; i++) {
                    this.md5MeshData = this.meshItem[i].md5MeshData;
                    this.md5objData = this.meshItem[i].md5objData;
                    this.updateMaterialMeshCopy();
                }
            }
        }

        protected loadBodyMesh(): void {
        }
        protected loadAnimFrame(): void {
             
        }
    }
}
