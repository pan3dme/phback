module prop {
    import Vector2D = Pan3d.Vector2D
    import UICompenent = Pan3d.UICompenent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Scene_data = Pan3d.Scene_data;
    import LabelTextFont = Pan3d.LabelTextFont
    import TextAlign = Pan3d.TextAlign
    import MouseType = Pan3d.MouseType
    import LoadManager = Pan3d.LoadManager
    import UIAtlas = Pan3d.UIAtlas
    import TextureManager = Pan3d.TextureManager
    import UIRectangle = Pan3d.UIRectangle
    import UIManager = Pan3d.UIManager
    import Rectangle = Pan3d.Rectangle
    export class InputFunTextUi extends BaseMeshUi {
        public constructor(w: number = 64, h: number = 64) {
            super(w, h);

            this.width = 100
            this.height = 100
 
        }
        protected initView(): void {
            this.makeHtmlArear()
            this.addEvets()
        }
        public destory(): void {
            document.body.removeChild(this.chatHtmlIArea);
            this.chatHtmlIArea = null;
            super.destory()

        }
        private chatHtmlIArea: HTMLTextAreaElement;
        private makeHtmlArear(): void {
            if (!this.chatHtmlIArea) {
                this.chatHtmlIArea = <HTMLTextAreaElement>document.createElement("textarea");
                this.chatHtmlIArea.style.position = "absolute";
                this.chatHtmlIArea.style["z-index"] = 100
               // this.chatHtmlIArea.style.background = "transparent"
                this.chatHtmlIArea.style.backgroundColor = "#bbbbbb";
                this.chatHtmlIArea.style.color = "#000000";
                document.body.appendChild(this.chatHtmlIArea);
                this.chatHtmlIArea.addEventListener("change", (cevt: any) => { this.changeInputTxt(cevt) });
                this.chatHtmlIArea.style.left = 0 + "px";
                this.chatHtmlIArea.style.top = 0 + "px";
                var tw: number = 40
                var th: number = 20;
                this.chatHtmlIArea.style.fontSize = String(12) + "px";
                this.chatHtmlIArea.style.width = String(tw) + "px";
                this.chatHtmlIArea.style.height = 'auto';
                this.chatHtmlIArea.style.height = 300 + "px";

                this.resize()
            }
    

 
 

        }

        private changeInputTxt(evt: any): void {
            var $agalStr: string = this.chatHtmlIArea.value
            var id: number = $agalStr.lastIndexOf("}")
            $agalStr = $agalStr.substr(0, id+1);
        

            var frameStr: string =   //模拟判断是否能通过编译
                " precision mediump float;\n" +

                "\n" + $agalStr +
                "\n" +
 
                "void main(void)\n" +
                "{\n" +
                    "gl_FragColor = vec4(1.0,1.0,1.0,1.0);\n" +
                "}"
 
            var $context: WebGLRenderingContext = Scene_data.context3D.renderContext;
            var fShader: WebGLShader = $context.createShader($context.FRAGMENT_SHADER);
            $context.shaderSource(fShader, frameStr);
            $context.compileShader(fShader);

            var info: string = $context.getShaderInfoLog(fShader)
            if (!info||info== "") {
                var $reflectionEvet: ReflectionEvet = new ReflectionEvet(ReflectionEvet.CHANGE_DATA)
                $reflectionEvet.data = $agalStr;
                this.dispatchEvent($reflectionEvet);
                this.text = $agalStr;

            } else {
                this.text = $agalStr+"\n------------有错"
                console.log("--------------")
                console.log(frameStr);
                console.log(info);
                console.log("--------------");
                throw "脚本有错。不做保存.";


            
            }
 
 

        }
        public resize(): void {
            super.resize()
            if (this.chatHtmlIArea) {
                this.chatHtmlIArea.style.left = (this.textureContext.left + this.x - 10) + "px";
                this.chatHtmlIArea.style.top = (this.textureContext.top + this.y + this.nodeLenHeight) + "px";
                this.chatHtmlIArea.style.width = this.width + "px";
                console.log(this.nodeLenHeight)
            }
 
        }
       
        public width: number;
        public height: number;
        private agalStr: string
        public set text(value: string) {
            this.agalStr = value
            this.makeHtmlArear()
            this.chatHtmlIArea.value = this.agalStr 
            this.drawUrlImgToUi(this.ui, "ui/materialmenu/meshfunui.png");

         
        }
        protected drawUrlImgToUi(ui: Pan3d.UICompenent, url: string): void {

            LoadManager.getInstance().load(Scene_data.fileuiRoot + url, LoadManager.IMG_TYPE,
                ($img: any) => {
                    this.drawImgToUi(ui, $img)
                });
        }
        private drawTittleBg($ctx: CanvasRenderingContext2D, $img: any): void {
            var s15: number = 1.5;
            var A: Rectangle = new Rectangle(2, 2, 164, 24);
       
           // $ctx.drawImage($img, A.x, A.y, A.width, A.height, A.x * s15, A.y * s15, A.width * s15, A.height * s15);

            $ctx.drawImage($img, 2, 2, 24, 24, A.x * s15, A.y * s15, 24 * s15, A.height * s15);
            $ctx.drawImage($img, 2 + 24, 2, 164-(2*24), 24, 24, A.y * s15, 200 * s15, A.height * s15);
            $ctx.drawImage($img, 164 - 24, 2, 24, 24, 200 * s15, A.y * s15, 24 * s15, A.height * s15);
 
            $ctx.font = "24px Georgia";
            $ctx.fillStyle = "#ffffff";
            $ctx.lineWidth = 0;
            $ctx.fillText("函数(" + materialui.NodeTreeFun.getMathFunName(this.agalStr) + ")", 20, 8);
        }
        private PointRectByTypeStr(value: string): Rectangle {
            var C: Rectangle = new Rectangle(177, 10, 16, 16);
            switch (value) {
                case materialui.MaterialItemType.FLOAT:  //float
                    C = new Rectangle(218, 10, 16, 16);
                    break
                case materialui.MaterialItemType.VEC2:  //vec2
                    C = new Rectangle(238, 10, 16, 16);
                    break
                case materialui.MaterialItemType.VEC3: //vec3
                    C = new Rectangle(177, 10, 16, 16);
                    break
                case materialui.MaterialItemType.VEC4: //vec4
                    C = new Rectangle(196, 10, 16, 16);
                    break
                default:
                    break
            }
            return C

        }
        protected drawImgToUi(ui: Pan3d.UICompenent, $img: any): void {

            var $UIAtlas: UIAtlas = ui.uiRender.uiAtlas
            var $textureStr: string = ui.skinName
            var rec: UIRectangle = $UIAtlas.getRec($textureStr);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

          //  this.drawTittleBg($ctx, $img);
            var s15: number = 1.5;

            var arr: Array<materialui.DataMathFunNode> = materialui.NodeTreeFun.getDataMathFunArr(this.agalStr);
            var outType: string = materialui.NodeTreeFun.getMathFunReturnType(this.agalStr);

            var B: Rectangle = new Rectangle(8, 30, 50, 50);
         
            $ctx.drawImage($img, B.x, B.y, B.width, B.height, 4, 35, (200 + (20)) * s15, arr.length * 30 + 30);
            $ctx.font = "24px Georgia";
            $ctx.fillStyle = "#ffffff";
            $ctx.lineWidth = 0;
            $ctx.font = "22px Georgia";

            var outRect: Rectangle = this.PointRectByTypeStr(outType)
 
            $ctx.drawImage($img, outRect.x, outRect.y, outRect.width, outRect.height, (200 ) * s15, 50, 16 * s15, 16 * s15);
            $ctx.fillText("out", (170) * s15,  50);
   
            for (var i: number = 0; i < arr.length; i++) {

                var inputRect: Rectangle = this.PointRectByTypeStr(arr[i].type)
                $ctx.drawImage($img, inputRect.x, inputRect.y, inputRect.width, inputRect.height, 15, i * 30 + 50, 16 * s15, 16 * s15);
         
                $ctx.fillText(arr[i].name, 50, i * 30 + 50);
            }
 
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, $ctx);

            this.nodeLenHeight = arr.length * 30 +20
            this.resize();
        }
        private nodeLenHeight: number=0



    }
}