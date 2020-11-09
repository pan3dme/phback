module materialui {
    import Scene_data = Pan3d.Scene_data
    import MaterialBaseParam = Pan3d.MaterialBaseParam
    import TexItem = Pan3d.TexItem
    import Vector3D = Pan3d.Vector3D
    import Vector2D = Pan3d.Vector2D
    import TextureCube = Pan3d.TextureCube
    import TextureRes = Pan3d.TextureRes
    import ConstItem = Pan3d.ConstItem
    import CubemapLoad = Pan3d.CubemapLoad
    import LoadManager = Pan3d.LoadManager
    import TextureManager = Pan3d.TextureManager

    export class CompileTwo {

        public static SPACE: string = " ";
        public static COMMA: string = ",";
        public static END: string = ";";
        public static FC: string = "fc";
        public static FT: string = "ft";
        public static TEXTURE: string = "texture";
        public static FS: string = "fs";
        public static VI: string = "v";
        public static OP: string = "op";
        public static FO: string = "gl_FragColor";
        public static XYZ: string = ".xyz";
        public static XY: string = ".xy";
        public static X: string = ".x";
        public static Y: string = ".y";
        public static Z: string = ".z";
        public static W: string = ".w";
        public static ZW: string = ".zw";
        public static MOV: string = "mov";
        //public static ONE:string = "1";
        public static ONE_FLOAT: string = "1.0";
        public static ZERO: string = "[0]";
        public static ONE: string = "[1]";
        public static TWO: string = "[2]";
        public static TWO_FLOAT: string = "2.0";
        public static THREE: string = "3";
        public static FOUR: string = "4";
        public static LN: string = "\n";
        public static texType: string = "<2d,linear,repeat>";
        public static TEX_2D: string = "2d";
        //  public static TEX_CUBE: string = "cube";
        public static TEX_LINEAR: string = "linear";
        public static TEX_NEAREST: string = "nearest";
        public static TEX_WRAP_REPEAT: string = "repeat";
        public static TEX_WRAP_CLAMP: string = "clamp";
        public static LEFT_BRACKET: string = "<";
        public static RIGHT_BRACKET: string = ">";
        public static texCubeType: string = "<cube,clamp,linear,mipnone>";

        public static TEX: string = "tex";
        public static ADD: string = "add";
        public static SUB: string = "sub";
        public static MUL: string = "mul";
        public static DIV: string = "div";
        public static ADD_MATH: string = "+";
        public static SUB_MATH: string = "-";
        public static MUL_MATH: string = "*";
        public static MUL_EQU_MATH: string = "*=";
        public static DIV_MATH: string = "/";
        public static RCP: string = "rcp";
        public static MIN: string = "min";
        public static MAX: string = "max";
        public static FRC: string = "frc";
        public static SQT: string = "sqt";
        public static RSQ: string = "rsq";
        public static POW: string = "pow";
        public static LOG: string = "log";
        public static EXP: string = "exp";
        public static NRM: string = "normalize";
        public static SIN: string = "sin";
        public static COS: string = "cos";
        public static CRS: string = "crs";
        public static DP3: string = "dp3";
        public static DOT: string = "dot";
        public static DP4: string = "dp4";
        public static ABS: string = "abs";
        public static NEG: string = "neg";
        public static SAT: string = "sat";
        public static LERP: string = "lerp";
        public static KIL: string = "kil";
        public static M33: string = "m33";

        public static VEC4: string = "vec4";
        public static VEC3: string = "vec3";
        public static VEC2: string = "vec2";
        public static EQU: string = "=";
        public static texture2D: string = "texture2D";
        public static textureCube: string = "textureCube";
        public static LEFT_PARENTH: string = "(";
        public static RIGHT_PARENTH: string = ")";
        public static DEFAULT_VEC4: string = "vec4(0,0,0,1)";
        public static MIX: string = "mix";
        public static REFLECT: string = "reflect";
        public static IF: string = "if";
        public static DISCARD: string = "{discard;}";
        public static scalelight: string = "scalelight";


        public priorityList: Array<Array<NodeTree>>;
        private fragmentTempList: Array<RegisterItem>;
        private fragmentTexList: Array<RegisterItem>;
        private fragmentConstList: Array<RegisterItem>;
        private defaultUvReg: RegisterItem;


        private strVec: Array<string>;
        private texVec: Array<TexItem>;
        private constVec: Array<ConstItem>;
   

        private hasTime: boolean;
        private timeSpeed: number;
        private timeValue: Vector2D
        private useNormal: boolean;
        private useUv: boolean
        private useLightUv: boolean
 

        private fcNum: number;

        private _timeID: number = 0;
        private _fcBeginID: number = 0;

        public constructor() {
            this.initReg();
            new Vector3D
            this.defaultUvReg = new RegisterItem(0);

        }
        private initReg(): void {
            this.fragmentTempList = new Array
            this.fragmentTexList = new Array
            this.fragmentConstList = new Array
            for (var i: number = 0; i < 8; i++) {
                this.fragmentTempList.push(new RegisterItem(i));
                this.fragmentTexList.push(new RegisterItem(i));
            }
            for (i = 0; i < 28; i++) {
                this.fragmentConstList.push(new RegisterItem(i));
            }
        }

        public compile($priorityList: Array<Array<NodeTree>>, $materialTree: MaterialTree): string {

            NodeTree.jsMode = true;
            this.priorityList = $priorityList;
            this.strVec = new Array;
            this.texVec = new Array;
            this.constVec = new Array;
            this.hasTime = false;
            this.useNormal = false;

            this.cubeTextItem = null
            this.initBaseFc();
            this.funNodeStr = ""
            this.FunDic = {}
            for (var i: number = this.priorityList.length - 1; i >= 0; i--) {
                var treelist: Array<NodeTree> = this.priorityList[i];
                for (var j: number = 0; j < treelist.length; j++) {
                    this.processNode(treelist[j]);
                }
            }
            var resultStr: string = this.getGLSLStr();
            $materialTree.shaderStr = resultStr;
            $materialTree.constList = this.constVec;
            $materialTree.texList = this.texVec;
            $materialTree.cubeTextItem = this.cubeTextItem;
            var $materialBaseParam: MaterialBaseParam = new MaterialBaseParam()
            $materialBaseParam.setData($materialTree, []);

            $materialTree.fcNum = this.getMaxFc();
            $materialTree.fcData = this.makeFc($materialTree.fcNum);


            $materialTree.hasTime = this.hasTime;
            $materialTree.timeSpeed = this.timeSpeed;
            $materialTree.timeValue = this.timeValue;
            $materialTree.useNormal = this.useNormal;
            $materialTree.useUv = this.useUv;
            $materialTree.useLightUv = this.useLightUv;
             
            $materialTree.roughness = 0;



            return resultStr

        }
        private getMaxFc(): number {
            var maxID: number = 0;
            if (this.constVec.length) {
                maxID = this.constVec[this.constVec.length - 1].id + 1;
            } else {
                if (this._fcBeginID > 0) {
                    maxID = this._fcBeginID;
                }
            }
            return maxID
        }
        private makeFc(fcNum: number): Float32Array {
            var fcData: Float32Array = new Float32Array(fcNum * 4);
            for (var i: number = 0; i < this.constVec.length; i++) {
                this.constVec[i].creat(fcData);
            }
            return fcData

        }
        private funNodeStr: string
        private getGLSLStr(): string {

            var mainStr: string = "";
            for (var i: number = 0; i < this.strVec.length; i++) {
                mainStr += this.strVec[i] + "\n";
            }
            var perStr: string = "precision mediump float;\n";
            var texStr: string = "";
            for (i = 0; i < this.texVec.length; i++) {
                if (this.texVec[i].type == TexItem.CUBEMAP) {
                    texStr += "uniform samplerCube fs" + this.texVec[i].id + ";\n";
                } else {
                    texStr += "uniform sampler2D fs" + this.texVec[i].id + ";\n";
                }

            }
            if (this.cubeTextItem) {
                texStr += "uniform samplerCube skyBoxCube; \n";
            }
            var constStr: string = "";
            var maxID: number = 0;
            if (this.constVec.length) {
                maxID = this.constVec[this.constVec.length - 1].id + 1;
            } else {
                if (this._fcBeginID > 0) {
                    maxID = this._fcBeginID;
                }
            }
            this.fcNum = maxID;
            if (this.fcNum > 0) {
                constStr += "uniform vec4 fc[" + (this.fcNum) + "];\n";
            }
            var varyStr: string = "";
            varyStr += "varying vec2 v0;\n";
            varyStr += "varying highp vec3 vPos;\n";
            varyStr += "uniform vec3 cam3DPos;\n";

            if (this.hasTime) {
                varyStr += "uniform float time;\n";
            }
            if (this.useUv) {
                 varyStr += "varying vec2 uvpos;\n";
            }
            if (this.useLightUv) {
                varyStr += "varying vec2 lightuv;\n";
            }

            if (this.useNormal) {
                varyStr += "varying vec3 T;\n";
                varyStr += "varying vec3 B;\n";
                varyStr += "varying vec3 N;\n";
                varyStr += "vec3 normalpic(vec3 n) { \n" +
                    "n=2.0*n-vec3(1.0);\n" +
                    "return normalize(T*n.x+B*n.y+N*n.z);\n" +
                    "}\n";
            }
            var beginStr: string = "void main(void){\n";
            if (this.useNormal) {
                var inputNormal = this.getInputNormal();
                if (inputNormal.parentNodeItem) {
                    beginStr += "vec3 normalVec = normalpic(" + "texture2D(fs" + inputNormal.parentNodeItem.node.regResultTex.id + ",v0).xyz)" + CompileTwo.END + "\n";
                } else {
                    beginStr += "vec3 normalVec = " + "N.xyz" + CompileTwo.END + "\n";
                }
            }
            var endStr: string = "\n}";
            var resultStr: string = perStr + texStr + constStr + varyStr + this.funNodeStr + beginStr + mainStr + endStr;
            console.log(resultStr)
            return resultStr;
        }
        private getInputNormal(): NodeTreeInputItem {
            for (var i: number = this.priorityList.length - 1; i >= 0; i--) {
                var treelist: Array<NodeTree> = this.priorityList[i];
                for (var j: number = 0; j < treelist.length; j++) {
                    if (treelist[j].type == NodeTree.OP) {
                        return treelist[j].inputVec[1]
                    }
                }
            }
            return null
        }
        private getFragmentTex($nodeTreeTex: NodeTreeTex = null): RegisterItem {
            for (var i: number = 0; i < this.fragmentTexList.length; i++) {
                if (!this.fragmentTexList[i].inUse) {
                    this.fragmentTexList[i].inUse = true;
                    this.fragmentTexList[i].url = "";
                    return this.fragmentTexList[i];
                }
            }
            return null;
        }
        private getFragmentTemp(): RegisterItem {
            for (var i: number = 0; i < this.fragmentTempList.length; i++) {
                if (!this.fragmentTempList[i].inUse) {
                    this.fragmentTempList[i].inUse = true;
                    return this.fragmentTempList[i];
                }
            }
            return null;
        }
        private processTexCubeNode($node: NodeTree): void {

            var texItem: TextureCube = new TextureCube;
            texItem.url = (<NodeTreeTex>$node).url;
            texItem.isDynamic = (<NodeTreeTex>$node).isDynamic;
            texItem.paramName = (<NodeTreeTex>$node).paramName;
            texItem.isMain = (<NodeTreeTex>$node).isMain;
            texItem.wrap = (<NodeTreeTex>$node).wrap;
            texItem.filter = (<NodeTreeTex>$node).filter;
            texItem.mipmap = (<NodeTreeTex>$node).mipmap;
            texItem.permul = (<NodeTreeTex>$node).permul;
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + texItem.url, ($texture: TextureRes) => {
                texItem.textureRes = $texture;


            });
            LoadManager.getInstance().load(Scene_data.fileRoot + texItem.url, LoadManager.IMG_TYPE, ($img: any, $info: any) => {

                //   texItem.cubeTextWebgl = CubemapLoad.makeTempCubeTextture($img)


            });
            this.cubeTextItem = texItem
        }
        public cubeTextItem: TextureCube
        private processTex3DNode($node: NodeTree): void {
            var str: string = ""
            var input: NodeTreeInputItem = $node.inputVec[0];
            var regtex: RegisterItem = this.getFragmentTex(<NodeTreeTex>$node);
            var regtemp: RegisterItem = this.getFragmentTemp();
            var resultStr: string;
            if (regtemp.hasInit) {
                resultStr = CompileTwo.FT + regtemp.id;
            } else {
                resultStr = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtemp.id;
                regtemp.hasInit = true;
            }
            if (input.parentNodeItem) {
                var pNode: NodeTree = input.parentNodeItem.node;
                str = resultStr + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + "textureCube" + CompileTwo.LEFT_PARENTH + CompileTwo.FS + regtex.id + CompileTwo.COMMA + pNode.getComponentID(input.parentNodeItem.id) + CompileTwo.RIGHT_PARENTH + CompileTwo.END;
            }

            $node.regResultTemp = regtemp;
            $node.regResultTex = regtex;
            $node.shaderStr = str;
            this.strVec.push(str);

            var texItem: TexItem = new TexItem;
            texItem.id = regtex.id;
            texItem.url = (<NodeTreeTex>$node).url;
            texItem.isDynamic = (<NodeTreeTex>$node).isDynamic;
            texItem.paramName = (<NodeTreeTex>$node).paramName;
            texItem.isMain = (<NodeTreeTex>$node).isMain;
            texItem.wrap = (<NodeTreeTex>$node).wrap;
            texItem.filter = (<NodeTreeTex>$node).filter;
            texItem.mipmap = (<NodeTreeTex>$node).mipmap;
            texItem.permul = (<NodeTreeTex>$node).permul;
            texItem.type = TexItem.CUBEMAP

            LoadManager.getInstance().load(Scene_data.fileRoot + texItem.url, LoadManager.IMG_TYPE, ($img: any, $info: any) => {
                texItem.textureRes = new Pan3d.TextureRes()
                texItem.textureRes.texture = CubemapLoad.makeTempCubeTextture($img)
            });

            this.texVec.push(texItem);
            input.hasCompiled = true;
            if (pNode) {
                pNode.releaseUse();
            }

        }
        private processTexNode($node: NodeTree): void {
            var str: string = ""
            var input: NodeTreeInputItem = $node.inputVec[0];
            var regtex: RegisterItem = this.getFragmentTex(<NodeTreeTex>$node);
            var regtemp: RegisterItem = this.getFragmentTemp();

            var resultStr: string;

            if (regtemp.hasInit) {
                resultStr = CompileTwo.FT + regtemp.id;
            } else {
                resultStr = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtemp.id;
                regtemp.hasInit = true;
            }
            if (input.parentNodeItem) {
                var pNode: NodeTree = input.parentNodeItem.node;

                str = resultStr + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.texture2D + CompileTwo.LEFT_PARENTH + CompileTwo.FS + regtex.id + CompileTwo.COMMA + pNode.getComponentID(input.parentNodeItem.id) + CompileTwo.RIGHT_PARENTH + CompileTwo.END;
            } else {

                str = resultStr + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.texture2D + CompileTwo.LEFT_PARENTH + CompileTwo.FS + regtex.id + CompileTwo.COMMA + CompileTwo.VI + this.defaultUvReg.id + CompileTwo.RIGHT_PARENTH + CompileTwo.END;
            }
            if ((<NodeTreeTex>$node).permul) {
                str += CompileTwo.LN + CompileTwo.FT + regtemp.id + CompileTwo.XYZ + CompileTwo.SPACE + CompileTwo.MUL_EQU_MATH + CompileTwo.SPACE + CompileTwo.FT + regtemp.id + CompileTwo.W + CompileTwo.END;
            }

            $node.regResultTemp = regtemp;
            $node.regResultTex = regtex;
            $node.shaderStr = str;

            this.strVec.push(str);

            var texItem: TexItem = new TexItem;
            texItem.id = regtex.id;
            texItem.url = (<NodeTreeTex>$node).url;
            texItem.isDynamic = (<NodeTreeTex>$node).isDynamic;
            texItem.paramName = (<NodeTreeTex>$node).paramName;
            texItem.isMain = (<NodeTreeTex>$node).isMain;
            texItem.wrap = (<NodeTreeTex>$node).wrap;
            texItem.filter = (<NodeTreeTex>$node).filter;
            texItem.mipmap = (<NodeTreeTex>$node).mipmap;
            texItem.permul = (<NodeTreeTex>$node).permul;

            TextureManager.getInstance().getTexture(Scene_data.fileRoot + texItem.url, ($texture: TextureRes) => {
                texItem.textureRes = $texture;
            });
            this.texVec.push(texItem);

            input.hasCompiled = true;
            if (pNode) {
                pNode.releaseUse();
            }

        }
        private processFunNode($node: NodeTree): void {
            var $nodeTreeFun: NodeTreeFun = <NodeTreeFun>$node;

            var str: string = ""
            var input0: NodeTreeInputItem = $node.inputVec[0];

            var output: NodeTreeOutoutItem = $node.outputVec[0];
            var regtemp: RegisterItem = this.getFragmentTemp();
            var resultStr: string = "";

            if (!regtemp.hasInit) {//vec4(0,0,0,0)
                resultStr = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtemp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.DEFAULT_VEC4 + CompileTwo.END + CompileTwo.LN;
                regtemp.hasInit = true;
            }
            if (output.type == MaterialItemType.FLOAT) {
                str = CompileTwo.FT + regtemp.id + CompileTwo.X + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            } else if (output.type == MaterialItemType.VEC2) {
                str = CompileTwo.FT + regtemp.id + CompileTwo.XY + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            } else if (output.type == MaterialItemType.VEC3) {
                str = CompileTwo.FT + regtemp.id + CompileTwo.XYZ + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            } else {
                str = CompileTwo.FT + regtemp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            }
            str = resultStr + str;

            var $kfuncstr: string = $nodeTreeFun.funName + "("
            for (var i: number = 0; i < $node.inputVec.length; i++) {
                var $inputNodeTreeInputItem: NodeTreeInputItem = $node.inputVec[i];
                $inputNodeTreeInputItem.hasCompiled = true
                $inputNodeTreeInputItem.parentNodeItem.node.releaseUse()
                var kkkk: string = $inputNodeTreeInputItem.parentNodeItem.node.getComponentID($inputNodeTreeInputItem.parentNodeItem.id);
                $kfuncstr += kkkk
                if (i < $node.inputVec.length - 1) {
                    $kfuncstr += ",";
                }
            }
            $kfuncstr += ")" + CompileTwo.END;

            str += $kfuncstr;

            $node.regResultTemp = regtemp;
            $node.shaderStr = str;
            this.strVec.push(str);


            if (!this.FunDic[$nodeTreeFun.funName]) {
                //函数只会添加一组
                this.funNodeStr += $nodeTreeFun.funStr;
                this.FunDic[$nodeTreeFun.funName] = $nodeTreeFun
            }
        }
        private FunDic: any;
        private processDynamicNode($node: NodeTree, opCode: string): void {
            var str: string = ""
            var input0: NodeTreeInputItem = $node.inputVec[0];
            var input1: NodeTreeInputItem = $node.inputVec[1];


            var pNode0: NodeTree = input0.parentNodeItem.node;
            var pNode1: NodeTree = input1.parentNodeItem.node;

            var output: NodeTreeOutoutItem = $node.outputVec[0];

            var regtemp: RegisterItem = this.getFragmentTemp();

            var resultStr: string = "";

            if (!regtemp.hasInit && !(input0.type == MaterialItemType.VEC4 || input1.type == MaterialItemType.VEC4)) {//vec4(0,0,0,0)
                resultStr = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtemp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.DEFAULT_VEC4 + CompileTwo.END + CompileTwo.LN;
                regtemp.hasInit = true;
            }
            if (input0.type == MaterialItemType.VEC4 || input1.type == MaterialItemType.VEC4) {
                if (!regtemp.hasInit) {
                    resultStr = CompileTwo.VEC4 + CompileTwo.SPACE;
                    regtemp.hasInit = true;
                }
                str = CompileTwo.FT + regtemp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            } else if (output.type == MaterialItemType.FLOAT) {

                str = CompileTwo.FT + regtemp.id + CompileTwo.X + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            } else if (output.type == MaterialItemType.VEC2) {

                str = CompileTwo.FT + regtemp.id + CompileTwo.XY + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            } else if (output.type == MaterialItemType.VEC3) {
                str = CompileTwo.FT + regtemp.id + CompileTwo.XYZ + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE;
            }

            str += pNode0.getComponentID(input0.parentNodeItem.id);

            str += CompileTwo.SPACE + opCode + CompileTwo.SPACE;

            str += pNode1.getComponentID(input1.parentNodeItem.id);

            str = resultStr + str + CompileTwo.END;


            input0.hasCompiled = true;
            input1.hasCompiled = true;
            pNode0.releaseUse();
            pNode1.releaseUse();

            $node.regResultTemp = regtemp;
            $node.shaderStr = str;
            this.strVec.push(str);
        }

        private processNode($node: NodeTree): void {
            switch ($node.type) {
                case NodeTree.VEC3:
                case NodeTree.FLOAT:
                case NodeTree.VEC2:
                    this.processVec3Node($node);
                    break;
                case NodeTree.TEX:
                    this.processTexNode($node);
                    break;
                case NodeTree.TEX3D:
                    this.processTex3DNode($node);
                    break;
                case NodeTree.TEXCUBE:
                    this.processTexCubeNode($node);
                    break;
                case NodeTree.FUN:
                    this.processFunNode($node);
                    break;
                case NodeTree.MUL:
                    this.processDynamicNode($node, "*");
                    break;
                case NodeTree.ADD:
                    this.processDynamicNode($node, "+");
                    break;
                case NodeTree.SUB:
                    this.processDynamicNode($node, "-");
                    break;
                case NodeTree.DIV:
                    this.processDynamicNode($node, "/");
                    break;
                case NodeTree.OP:
                    this.processOpNode($node);
                    break;
      

                case NodeTree.SIN:
                    this.processStaticNode($node, CompileTwo.SIN);
                    break;
                case NodeTree.COS:
                    this.processStaticNode($node, CompileTwo.COS);
                    break;
                case NodeTree.NORMAL:
                    this.useNormal = true;
                    break;
                case NodeTree.TEXCOORD:
                    this.useUv = true;
                    break;
                case NodeTree.TEXCOORDLIGHT:
                    this.useLightUv = true;
                    break;
                case NodeTree.TIME:
                   // this.processTimeNode($node);
                    this.hasTime = true;
                    this.timeSpeed = (<NodeTreeTime>$node).speed;
                    this.timeValue = (<NodeTreeTime>$node).timeValue;
                    break;

                default:
                    break
            }

        }
        private processTimeNode($node: NodeTree): void {
            var str: string = ""
            var regtemp: RegisterItem = this.getFragmentTemp();

            var pNode: NodeTreeFloat = new NodeTreeFloat;
            pNode.type = NodeTree.FLOAT;
            pNode.constValue = (<NodeTreeTime>$node).speed;
            this.processVec3Node(pNode);

            if (!regtemp.hasInit) {
                str = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtemp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.DEFAULT_VEC4 + CompileTwo.END;
                regtemp.hasInit = true;
                this.strVec.push(str);
            }


            //str =  FT + regtemp.id + X + SPACE + EQU + SPACE + FC + ZERO + W + SPACE +  MUL_MATH + SPACE + pNode.getComponentID(0) + END;
            str = CompileTwo.FT + regtemp.id + CompileTwo.X + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + this.timeStr + CompileTwo.SPACE + CompileTwo.MUL_MATH + CompileTwo.SPACE + pNode.getComponentID(0) + CompileTwo.END;

            this.strVec.push(str);
            $node.regResultTemp = regtemp;
            this.hasTime = true;

        }
        private processStaticNode($node: NodeTree, opCode: string): void {
            var str: string = "";
            var input: NodeTreeInputItem = $node.inputVec[0];
            var pNode: NodeTree = input.parentNodeItem.node;

            var regtemp: RegisterItem = this.getFragmentTemp();


            if (!regtemp.hasInit) {//vec4(0,0,0,0)
                str = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtemp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.DEFAULT_VEC4 + CompileTwo.END + CompileTwo.LN;
                regtemp.hasInit = true;
            }

            str += CompileTwo.FT + regtemp.id + CompileTwo.X + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + opCode + CompileTwo.LEFT_PARENTH + pNode.getComponentID(input.parentNodeItem.id) + CompileTwo.RIGHT_PARENTH + CompileTwo.END;

            input.hasCompiled = true;
            pNode.releaseUse();

            $node.regResultTemp = regtemp;
            $node.shaderStr = str;
            this.strVec.push(str);
        }


        private traceFt(): void {
            return;
        }
        private get timeStr(): string {
            return "fc[" + this._timeID + "].y";
        }
        private processVec3Node($node: NodeTree): void {

            this.setFragmentConst($node);
            this.addConstItem($node);
        }
        private addConstItem($node: NodeTree): void {
            if ($node.isDynamic) {
                console.log($node.paramName);
            }
            var constItem: ConstItem;

            var id: number = $node.regResultConst.id;

            for (var i: number = 0; i < this.constVec.length; i++) {
                if (this.constVec[i].id == id) {
                    constItem = this.constVec[i];
                }
            }

            if (!constItem) {
                constItem = new ConstItem;
                constItem.id = $node.regResultConst.id;
                this.constVec.push(constItem);
            }


            if ($node.type == NodeTree.VEC3) {
                if ($node.regConstIndex == 0) {
                    var v3d: Vector3D = (<NodeTreeVec3>$node).constVec3;
                    constItem.value.setTo(v3d.x, v3d.y, v3d.z);
                    if ($node.isDynamic) {
                        constItem.paramName0 = $node.paramName;
                        constItem.param0Type = 4;
                        constItem.param0Index = 0;
                    }
                }
            } else if ($node.type == NodeTree.FLOAT) {
                var num: number = (<NodeTreeFloat>$node).constValue;
                if ($node.regConstIndex == 0) {
                    constItem.value.x = num;
                    if ($node.isDynamic) {
                        constItem.paramName0 = $node.paramName;
                        constItem.param0Type = 1;
                        constItem.param0Index = 0;
                    }
                } else if ($node.regConstIndex == 1) {
                    constItem.value.y = num;
                    if ($node.isDynamic) {
                        constItem.paramName1 = $node.paramName;
                        constItem.param1Type = 1;
                        constItem.param1Index = 1;
                    }
                } else if ($node.regConstIndex == 2) {
                    constItem.value.z = num;
                    if ($node.isDynamic) {
                        constItem.paramName2 = $node.paramName;
                        constItem.param2Type = 1;
                        constItem.param2Index = 2;
                    }
                } else if ($node.regConstIndex == 3) {
                    constItem.value.w = num;
                    if ($node.isDynamic) {
                        constItem.paramName3 = $node.paramName;
                        constItem.param3Type = 1;
                        constItem.param3Index = 3;
                    }
                }
            } else if ($node.type == NodeTree.VEC2) {
                var vec2: Vector2D = (<NodeTreeVec2>$node).constValue;
                if ($node.regConstIndex == 0) {
                    constItem.value.x = vec2.x;
                    constItem.value.y = vec2.y;
                    if ($node.isDynamic) {
                        constItem.paramName0 = $node.paramName;
                        constItem.param0Type = 2;
                        constItem.param0Index = 0;
                    }
                } else if ($node.regConstIndex == 1) {
                    constItem.value.y = vec2.x;
                    constItem.value.z = vec2.y;
                    if ($node.isDynamic) {
                        constItem.paramName1 = $node.paramName;
                        constItem.param1Type = 2;
                        constItem.param1Index = 1;
                    }
                } else if ($node.regConstIndex == 2) {
                    constItem.value.z = vec2.x;
                    constItem.value.w = vec2.y;
                    if ($node.isDynamic) {
                        constItem.paramName2 = $node.paramName;
                        constItem.param2Type = 2;
                        constItem.param2Index = 2;
                    }
                }
            }



        }
        private setFragmentConst($nodeTree: NodeTree): void {
            for (var i: number = this._fcBeginID; i < this.fragmentConstList.length; i++) {
                var tf: boolean = this.fragmentConstList[i].getUse($nodeTree);
                if (tf) {
                    break;
                }
            }
        }

        private processOpNode($node: NodeTree): void {
            //diffuse


            var str: string = "";
            var inputDiffuse: NodeTreeInputItem = $node.inputVec[0];
            var inputNormal: NodeTreeInputItem = $node.inputVec[1];
            var inputAlpha: NodeTreeInputItem = $node.inputVec[3];

            if (inputNormal.parentNodeItem) {
                this.useNormal = true;
            }


            var regOp: RegisterItem;


            this.traceFt();

            if (inputDiffuse.parentNodeItem) {//漫反射部分


                var pNodeDiffuse: NodeTree = inputDiffuse.parentNodeItem.node;//diffuse输入节点

                var regtempLightMap: RegisterItem = this.getFragmentTemp();
                var resultStr: string;
                if (regtempLightMap.hasInit) {
                    resultStr = CompileTwo.FT + regtempLightMap.id;
                } else {
                    resultStr = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regtempLightMap.id;
                    regtempLightMap.hasInit = true;
                }

                str = resultStr + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.VEC4 + CompileTwo.LEFT_PARENTH + pNodeDiffuse.getComponentID(inputDiffuse.parentNodeItem.id) + CompileTwo.COMMA + "1.0" + CompileTwo.RIGHT_PARENTH + CompileTwo.END;

                this.strVec.push(str);
                pNodeDiffuse.releaseUse();
                regOp = this.getFragmentTemp();//输出用临时寄存器

                if (!regOp.hasInit) {
                    str = CompileTwo.VEC4 + CompileTwo.SPACE + CompileTwo.FT + regOp.id + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.DEFAULT_VEC4 + CompileTwo.END;
                    regOp.hasInit = true;
                    this.strVec.push(str);
                }
                str = CompileTwo.FT + regOp.id + CompileTwo.XYZ + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.FT + regtempLightMap.id + CompileTwo.XYZ + CompileTwo.END;


                inputDiffuse.hasCompiled = true;
                this.strVec.push(str);
                regtempLightMap.inUse = false;

            }
            str = "";
            if (inputAlpha.parentNodeItem) {//漫反射部分

                var pNodeAlpha: NodeTree = inputAlpha.parentNodeItem.node;//diffuse输入节点
                str += CompileTwo.FT + regOp.id + CompileTwo.W + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + pNodeAlpha.getComponentID(inputAlpha.parentNodeItem.id) + CompileTwo.END;


                pNodeAlpha.releaseUse();
            } else {
                str = CompileTwo.FT + regOp.id + CompileTwo.W + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.ONE_FLOAT + CompileTwo.END;
            }

            this.strVec.push(str);
            str = "";
            str = CompileTwo.FO + CompileTwo.SPACE + CompileTwo.EQU + CompileTwo.SPACE + CompileTwo.FT + regOp.id + CompileTwo.END;
            this.strVec.push(str);

        }
        private initBaseFc(): void {
            var dataID: number = 0;
            var $hasTime: Boolean = false;
            for (var i: number = this.priorityList.length - 1; i >= 0; i--) {
                var treelist: Array<NodeTree> = this.priorityList[i];
                for (var j: number = 0; j < treelist.length; j++) {
                    var node: NodeTree = treelist[j];
                    if (node.type == NodeTree.OP) {
                    } else if (node.type == NodeTree.TIME  ) {
                        $hasTime = true;
                    }
                }
            }
            if ($hasTime) {
                dataID++;
            }
            dataID=0

            this._fcBeginID = dataID;

        }

    }
}