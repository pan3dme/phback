module prop {
    import Vector2D = Pan3d.Vector2D
    import UICompenent = Pan3d.UICompenent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Scene_data = Pan3d.Scene_data;
    import LabelTextFont = Pan3d.LabelTextFont
    import TextAlign = Pan3d.TextAlign
    import MouseType = Pan3d.MouseType


    export class InputTextUi extends TextLabelUI{

        public constructor(w: number = 64, h: number = 64) {
            super(w, h);
            this.onHtmlInputMouseDownFun = ($evt: MouseEvent) => { this.onHtmlInputMouseDown($evt) }
        }
        private onHtmlInputMouseDown($e: MouseEvent): void {
            if ($e.target != this.chatHtmlInput) {
                if (this.chatHtmlInput) {
                    this.chatHtmlInput.hidden = true
                }
                document.removeEventListener(MouseType.MouseDown, this.onHtmlInputMouseDownFun);

            } 
  
        }
        protected initView(): void {

            this.setInputTxtPos()
            this.addEvets()
        }
        public destory(): void {
            if (this.chatHtmlInput) {
                document.body.removeChild(this.chatHtmlInput);
                this.chatHtmlInput = null;
            }
            super.destory()

        }
        private chatHtmlInput: HTMLInputElement;
        private setInputTxtPos(): void {
            if (!this.chatHtmlInput) {
                this.chatHtmlInput = <HTMLInputElement>document.createElement("input");
                this.chatHtmlInput.style.position = "absolute";
                this.chatHtmlInput.style["z-index"] = 100
                //this.chatHtmlInput.style.background = "transparent"
                this.chatHtmlInput.style.color = "#000000";
                document.body.appendChild(this.chatHtmlInput);
                this.chatHtmlInput.addEventListener("change", (cevt: any) => { this.changeInputTxt(cevt) });
    
            }

            this.chatHtmlInput.style.left = 0 + "px";
            this.chatHtmlInput.style.top = 0 + "px";
            var tw: number = 40
            var th: number = 20;
            this.chatHtmlInput.style.fontSize = String(12) + "px";
            this.chatHtmlInput.style.width = String(tw) + "px";
            this.chatHtmlInput.style.height = String(th) + "px";
            this.chatHtmlInput.value  = "99.99"
            this.chatHtmlInput.hidden = true
         
        }
        
        private changeInputTxt(evt: any): void {
            var $agalStr: string = this.chatHtmlInput.value
            var $reflectionEvet: ReflectionEvet = new ReflectionEvet(ReflectionEvet.CHANGE_DATA)
            $reflectionEvet.data = $agalStr;
            this.dispatchEvent($reflectionEvet);
            
        }

        public resize(): void {
            super.resize()
            this.chatHtmlInput.style.left = (this.textureContext.left + this.x-10) + "px";
            this.chatHtmlInput.style.top = (this.textureContext.top + this.y - 5) + "px";
    
      
        }

        public  set visible(value: boolean) {
            //this.chatHtmlInput.hidden = !value
            //this.chatHtmlInput.hidden = true
        }
        public set text(value: string) {
            LabelTextFont.writeSingleLabel(this.ui.uiRender.uiAtlas, this.ui.skinName, value, 26, TextAlign.LEFT, "#ffffff", "#27262e");

            this.chatHtmlInput.value = value
        }
        private onHtmlInputMouseDownFun: any
        protected butClik(evt: InteractiveEvent): void {

            if (this.chatHtmlInput.hidden) {
               // console.log("添加事件")
                this.chatHtmlInput.hidden = false
                setTimeout(() => { this.chatHtmlInput.focus(); }, 1)
                document.addEventListener(MouseType.MouseDown, this.onHtmlInputMouseDownFun);
            }

 
        }
        /*
        private mouseXY: Vector2D;
        private addStageMoveEvets($e: InteractiveEvent): void {
            this.mouseXY = new Vector2D($e.x, $e.y)
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);

        }
        private onMove($e: InteractiveEvent): void {

            var $reflectionEvet: ReflectionEvet = new ReflectionEvet(ReflectionEvet.CHANGE_DATA)
            $reflectionEvet.data = $e.x - this.mouseXY.x
            this.dispatchEvent($reflectionEvet);
            this.mouseXY = new Vector2D($e.x, $e.y)
        }
        private onUp($e: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
        }
   */

    }
}