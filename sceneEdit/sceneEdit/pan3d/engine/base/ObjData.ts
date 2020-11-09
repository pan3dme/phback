module Pan3d {
    export class ObjData extends ResCount {
        public dataView: DataView;
        public vertices: Array<number> = new Array;
        public uvs: Array<number> = new Array;
        public indexs: Array<number> = new Array;
        public lightuvs: Array<number> = new Array;
        public normals: Array<number> = new Array;
        public tangents: Array<number> = new Array;
        public bitangents: Array<number> = new Array;
        public collision: CollisionItemVo;
     
        public  invertAry: Array<Matrix3D>

        private _treNum: number = 0;
        public get treNum(): number {
            return this._treNum
        }
        public set treNum(value: number) {
            this._treNum = value
        }
        public getMaxSize(): number {
            /*
            var minV3d: Vector3D = new Vector3D;
            var maxV3d: Vector3D = new Vector3D;
            for (var i: number = 0; i < this.vertices.length/3; i++) {
                var P: Vector3D = new Vector3D(this.vertices[i * 3 + 0], this.vertices[i * 3 + 1], this.vertices[i * 3 + 2])
                if (!minV3d) {  maxV3d = P.clone()  }
                if (!maxV3d) {   maxV3d = P.clone()  }
          
                minV3d.x = Math.min(minV3d.x, P.x)
                minV3d.y = Math.min(minV3d.y, P.y)
                minV3d.z = Math.min(minV3d.z, P.z)

                maxV3d.x = Math.max(maxV3d.x, P.x)
                maxV3d.y = Math.max(maxV3d.y, P.y)
                maxV3d.z = Math.max(maxV3d.z, P.z)
 
            }
            var size: number = Math.max(Math.abs(minV3d.x), Math.abs(minV3d.y), Math.abs(minV3d.z), Math.abs(maxV3d.x), Math.abs(maxV3d.y), Math.abs(maxV3d.z));
            */

            var pv: number=0
            for (var i: number = 0; i < this.vertices.length; i++) {

                pv = (pv + Math.abs(this.vertices[i])) / 2
            }
         

            console.log("模型size", pv)
            return pv

        }


        public vertexBuffer: WebGLBuffer;
        public uvBuffer: WebGLBuffer;
        public indexBuffer: WebGLBuffer;
        public lightUvBuffer: WebGLBuffer;
        public normalsBuffer: WebGLBuffer;
        public tangentBuffer: WebGLBuffer;
        public bitangentBuffer: WebGLBuffer;

        /**顶点 uv lightuv normal 合成一个 va */
        public compressBuffer: boolean = false;
        public uvsOffsets: number;
        public lightuvsOffsets: number;
        public normalsOffsets: number;
        public tangentsOffsets: number;
        public bitangentsOffsets: number;
        public stride: number;
        public hasdispose: boolean = false;

        constructor() {
            super();
        }

        public destory(): void {

            this.vertices.length = 0;
            this.vertices = null;

            this.uvs.length = 0;
            this.uvs = null;

            this.indexs.length = 0;
            this.indexs = null;

            this.lightuvs.length = 0;
            this.lightuvs = null;

            this.normals.length = 0;
            this.normals = null;

            this.tangents.length = 0;
            this.tangents = null;

            this.bitangents.length = 0;
            this.bitangents = null;


            if (this.vertexBuffer) {
                Scene_data.context3D.deleteBuffer(this.vertexBuffer);
                this.vertexBuffer = null;
            }
            if (this.uvBuffer) {
                Scene_data.context3D.deleteBuffer(this.uvBuffer);
                this.uvBuffer = null;
            }
            if (this.indexBuffer) {
                Scene_data.context3D.deleteBuffer(this.indexBuffer);
                this.indexBuffer = null;
            }
            if (this.lightUvBuffer) {
                Scene_data.context3D.deleteBuffer(this.lightUvBuffer);
                this.lightUvBuffer = null;
            }
            if (this.normalsBuffer) {



                Scene_data.context3D.deleteBuffer(this.normalsBuffer);
                this.normalsBuffer = null;
            }
            if (this.tangentBuffer) {
                Scene_data.context3D.deleteBuffer(this.tangentBuffer);
                this.tangentBuffer = null;
            }
            if (this.bitangentBuffer) {
                Scene_data.context3D.deleteBuffer(this.bitangentBuffer);
                this.bitangentBuffer = null;
            }

            this.hasdispose = true;


        }




    }
}