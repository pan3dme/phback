module xyz {
    import Shader3D = Pan3d.Shader3D
    import Display3D = Pan3d.Display3D;
    import ProgrmaManager = Pan3d.ProgrmaManager
    import TextureManager = Pan3d.TextureManager
    import UIManager = Pan3d.UIManager;
    import TextureRes = Pan3d.TextureRes;
    import Matrix3D = Pan3d.Matrix3D
    import Scene_data = Pan3d.Scene_data;

    export class TooBoxDisplay3DShader extends Shader3D {
        static TooBoxDisplay3DShader: string = "TooBoxDisplay3DShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");

        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "uniform vec4 baseColorVect4;" +
                "varying vec4 colorv4;\n" +
                "void main(void)" +
                "{" +
                "   colorv4 = baseColorVect4 ;" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "varying vec4 colorv4;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor =colorv4;\n" +
                "}"
            return $str

        }

    }

    export class TooBoxDisplay3DSprite extends Display3D {

        constructor() {
            super();
            this.initData()
            this.colorVect = new Vector3D(1, 1, 1, 1)
        }
        protected initData(): void {
            ProgrmaManager.getInstance().registe(TooBoxDisplay3DShader.TooBoxDisplay3DShader, new TooBoxDisplay3DShader);
            this.shader = ProgrmaManager.getInstance().getProgram(TooBoxDisplay3DShader.TooBoxDisplay3DShader);
            this.program = this.shader.program;

            this.objData = new ObjData;


 
 
            this.objData=    this.makeBoxTampData( 0.1)


            this.upToGpu();
        }

        private makeBoxTampData( scale: number = 1): ObjData {

            var tempObj: ObjData = new ObjData;

            var Vitem: Array<Vector3D> = new Array();

 

            var bx: number = -10 * scale;
            var by: number = -10 * scale;
            var bz: number = -10 * scale;
            var ex: number = 10 * scale;
            var ey: number = 10 * scale;
            var ez: number = 10 * scale;
 



            //手工写入一个盒子的模型
            Vitem.push(new Vector3D(bx, by, ez));
            Vitem.push(new Vector3D(bx, by, bz));
            Vitem.push(new Vector3D(ex, by, bz));
            Vitem.push(new Vector3D(ex, by, ez));

            Vitem.push(new Vector3D(bx, ey, ez));
            Vitem.push(new Vector3D(bx, ey, bz));
            Vitem.push(new Vector3D(ex, ey, bz));
            Vitem.push(new Vector3D(ex, ey, ez));



            //不考虑是否是正面
            var Iitem: Array<number> = new Array();
            Iitem.push(0, 1, 2);
            Iitem.push(0, 2, 3);

            Iitem.push(4, 6, 5);
            Iitem.push(4, 7, 6);

            Iitem.push(5, 2, 1);
            Iitem.push(5, 6, 2);

            Iitem.push(6, 3, 2);
            Iitem.push(6, 7, 3);

            Iitem.push(4, 1, 0);
            Iitem.push(4, 5, 1);

            Iitem.push(4, 0, 3);
            Iitem.push(4, 3, 7);

            tempObj.vertices = new Array
 
            tempObj.indexs = new Array
            for (var i: number = 0; i < Iitem.length; i++) {
                var P: Vector3D = Vitem[Iitem[i]];
                tempObj.vertices.push(P.x, P.y, P.z);
                tempObj.indexs.push(i);
            }
            return tempObj;

        }

        public upToGpu(): void {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        }
        public colorVect: Vector3D
        public update(): void {
            if (this.objData && this.objData.indexBuffer) {
                Scene_data.context3D.cullFaceBack(false)
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);

                Scene_data.context3D.setVc4fv(this.shader, "baseColorVect4", [this.colorVect.x, this.colorVect.y, this.colorVect.z, this.colorVect.w]);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

            }


        }



    }
}