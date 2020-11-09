module cctv {
    import Shader3D = Pan3d.Shader3D
    import Display3D = Pan3d.Display3D;
    import ProgrmaManager = Pan3d.ProgrmaManager
    import TextureManager = Pan3d.TextureManager
    import UIManager = Pan3d.UIManager;
    import TextureRes = Pan3d.TextureRes;
    import Matrix3D = Pan3d.Matrix3D
    import Scene_data = Pan3d.Scene_data;

    export class TooJianTouDisplay3DShader extends Shader3D {
        static TooJianTouDisplay3DShader: string = "TooJianTouDisplay3DShader";
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

    export class TooRotationDisplay3DSprite extends Display3D {

        constructor() {
            super();
            this.initData()
            this.colorVect = new Vector3D(1, 1, 1, 1)
        }
        protected initData(): void {
            ProgrmaManager.getInstance().registe(TooJianTouDisplay3DShader.TooJianTouDisplay3DShader, new TooJianTouDisplay3DShader);
            this.shader = ProgrmaManager.getInstance().getProgram(TooJianTouDisplay3DShader.TooJianTouDisplay3DShader);
            this.program = this.shader.program;

            this.objData = new ObjData;


            var numLen: number = 0.2
            var $num50: number = 2 * (numLen) * 2
            var $wSize: number = 5 * (numLen) * 2

            this.objData = this.mathRoundTri(2)

            this.upToGpu();
        }

        private mathRoundTri($scale: number = 1): ObjData {
            var $objData: ObjData = new ObjData;
            $objData.vertices = []
            $objData.uvs = []
            $objData.indexs = []
            var $num50: number = 10
            var _disNum360: number = 360
            var $wSize: number = 1 * ($num50 / 50) * $scale

            var A: Vector3D = new Vector3D(+$wSize, $num50, 0)
            var B: Vector3D = new Vector3D(-$wSize, $num50, 0)
            var $m: Matrix3D = new Matrix3D
            var $p0: Vector3D;
            var $p1: Vector3D;
            var $num: number
            var $indexLen: number = 0
            for (var i: number = 0; i < _disNum360; i++) {
                $m.identity();
                $m.appendRotation(i, Vector3D.X_AXIS)
                $p0 = $m.transformVector(A)
                $p1 = $m.transformVector(B)
                $objData.vertices.push($p0.x, $p0.y, $p0.z)
                $objData.vertices.push($p1.x, $p1.y, $p1.z)

                $objData.uvs.push(0, 0)
                $objData.uvs.push(0, 0)
                if (i != 0) {
                    $num = i - 1
                    $objData.indexs.push($indexLen + $num * 2 + 0, $indexLen + $num * 2 + 1, $indexLen + $num * 2 + 2)
                    $objData.indexs.push($indexLen + $num * 2 + 2, $indexLen + $num * 2 + 1, $indexLen + $num * 2 + 3)
                }

            }
            return $objData
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