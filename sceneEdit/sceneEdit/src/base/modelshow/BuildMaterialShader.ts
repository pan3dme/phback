module left {
    import MaterialShader = Pan3d.MaterialShader
    export class BuildMaterialShader extends MaterialShader {
        public static BuildMaterialShader: string = "BuildMaterialShader";
        constructor() {
            super();
            this.name = "BuildMaterialShader";
        }
        public buildParamAry($material: materialui.MaterialTree): void {
            this.paramAry = [$material.useUv, $material.useNormal, $material.useLightUv];
 
        }
        public binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");

            var useUv: boolean = this.paramAry[0];
            var useNormal: boolean = this.paramAry[1];
            var useLightUv: boolean = this.paramAry[2];

            var id: number = 2

            if (useLightUv) {
                $context.bindAttribLocation(this.program, id++, "v2Lightuv");
            }
            if (useNormal) {
                $context.bindAttribLocation(this.program, id++, "v3Tangent");
                $context.bindAttribLocation(this.program, id++, "v3Bitangent");
                $context.bindAttribLocation(this.program, id++, "v3Normal");
            }

        }
        public getVertexShaderString(): string {

            var useUv: boolean = this.paramAry[0];
            var useNormal: boolean = this.paramAry[1];
            var useLightUv: boolean = this.paramAry[2];


            var $str: string =
                "attribute vec3 v3Position;\n" +
                "attribute vec2 v2CubeTexST;\n" +
                "varying vec2 v0;\n";

            if (useLightUv) {
                $str += "attribute vec2 v2Lightuv;\n";
                $str += "varying vec2 lightuv;\n";
            }

            if (useUv) {
                $str += "varying vec2 uvpos;\n";
            }
          
          

            if (useNormal) {
                $str +=
                    "attribute vec3 v3Tangent;\n" +
                    "attribute vec3 v3Bitangent;\n" +
                    "attribute vec3 v3Normal;\n" +
                    "varying vec3 T;\n" +
                    "varying vec3 B;\n" +
                    "varying vec3 N;\n";
            }
            $str +=
                "uniform mat4 vpMatrix3D;\n" +
                "uniform mat4 posMatrix3D;\n" +
                "uniform mat3 rotationMatrix3D;\n";

            $str +=
                "varying highp vec3 vPos;\n";
            $str +=
                "void main(void){\n" +
                "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);\n" +
                "vec4 vt0= vec4(v3Position, 1.0);\n" +
                "vt0 = posMatrix3D * vt0;\n";

          
            if (useUv) {
                $str += "uvpos = v2CubeTexST;\n";
            }
            if (useLightUv) {
                $str += "lightuv = v2Lightuv;\n";
            }
            if (useNormal) {
                $str +=
                    "T = v3Tangent;\n" +
                    "B = v3Bitangent;\n" +
                    "N = v3Normal;\n"
            }

            $str += "vt0 = vpMatrix3D * vt0;\n";
              

            $str += "gl_Position = vt0;\n";
            $str += "vPos = v3Position;\n";

            $str += "}";


            return $str


        }

    }
}