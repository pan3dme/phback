module xyz {
    import Shader3D = Pan3d.Shader3D
    import Display3D = Pan3d.Display3D;
    import ProgrmaManager = Pan3d.ProgrmaManager
    import TextureManager = Pan3d.TextureManager
    import UIManager = Pan3d.UIManager;
    import TextureRes = Pan3d.TextureRes;
    import Matrix3D = Pan3d.Matrix3D
    import Scene_data = Pan3d.Scene_data;


    export class TooLineTri3DShader extends Shader3D {
        static TooLineTri3DShader: string = "TooLineTri3DShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "nrmPosition");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec3 nrmPosition;" +

                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +

                "varying vec3 v3_nrm;" +

                "void main(void)" +
                "{" +

                "   v3_nrm = nrmPosition;" +
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
                "varying vec3 v3_nrm;" +
                "void main(void)\n" +
                "{\n" +
                    "gl_FragColor =vec4(v3_nrm,1.0);\n" +
                "}"
            return $str

        }

    }

    export class TooLineTri3DSprite extends Display3D {

        constructor() {
            super();
            this.initData()
            this.updateMatrix
        }
        protected initData(): void {
            ProgrmaManager.getInstance().registe(TooLineTri3DShader.TooLineTri3DShader, new TooLineTri3DShader);
            this.shader = ProgrmaManager.getInstance().getProgram(TooLineTri3DShader.TooLineTri3DShader);
            this.program = this.shader.program;

            this.objData = new ObjData;

      

            var hitBox: TooObjectHitBox = new TooObjectHitBox(0, 0, 0);
            var size: number=0.1
            hitBox.beginx = -0;
            hitBox.beginy = -size;
            hitBox.beginz = -size;
            hitBox.endx = 20;
            hitBox.endy = size;
            hitBox.endz = size;

            this.objData = this.makeBoxTampData(hitBox, 1);

            //this.makeBoxObjdata(new Vector3D(1,1,1))

            this.upToGpu();
        
        }

        private makeBoxObjdata(color: Vector3D): void {

            this.objData.vertices = new Array();
            this.objData.vertices.push(0, 0, 0);
            this.objData.vertices.push(100, 0, 0);
            this.objData.vertices.push(100, 0, 100);

            this.objData.normals = new Array();
            this.objData.normals.push(color.x, color.y, color.z);
            this.objData.normals.push(color.x, color.y, color.z);
            this.objData.normals.push(color.x, color.y, color.z);
  
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);

    
        

   

        }
        private makeBoxTampData(hitbox: TooObjectHitBox, scale: number = 1): ObjData {

            var tempObj: ObjData = new ObjData;

            var Vitem: Array<Vector3D> = new Array();

            var w: number = Math.max(Math.abs(hitbox.beginx), Math.abs(hitbox.endx)) * scale
            var h: number = Math.max(Math.abs(hitbox.beginz), Math.abs(hitbox.endz)) * scale

            var bx: number = -10;
            var by: number = -10;
            var bz: number = -10;
            var ex: number = 10;
            var ey: number = 10;
            var ez: number = 10;

            bx = hitbox.beginx
            ex = hitbox.endx
            by = hitbox.beginy
            ey = hitbox.endy
            bz = hitbox.beginz
            ez = hitbox.endz




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

            Iitem.push(4, 5, 6);
            Iitem.push(4, 6, 7);

            Iitem.push(5, 1, 2);
            Iitem.push(5, 2, 6);

            Iitem.push(6, 2, 3);
            Iitem.push(6, 3, 7);

            Iitem.push(4, 0, 1);
            Iitem.push(4, 1, 5);

            Iitem.push(4, 3, 0);
            Iitem.push(4, 7, 3);

            tempObj.vertices = new Array
            tempObj.normals = new Array
            tempObj.indexs = new Array
            for (var i: number = 0; i < Iitem.length; i++) {
                var P: Vector3D = Vitem[Iitem[i]];
                tempObj.vertices.push(P.x, P.y, P.z);
                tempObj.normals.push(1, 1, 0);
                tempObj.indexs.push(i);
            }
            return tempObj;

        }
   

        public upToGpu(): void {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.normalsBuffer = Scene_data.context3D.uploadBuff3D(this.objData.normals);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        }
        public update(): void {
            if (this.objData && this.objData.indexBuffer ) {
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);

                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 3, this.objData.normalsBuffer);
 
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

            }


        }



    }
}