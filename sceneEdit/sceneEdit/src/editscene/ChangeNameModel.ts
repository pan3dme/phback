module editscene {
    import TextRegExp = Pan3d.TextRegExp
    import UIManager = Pan3d.UIManager
    import MouseType = Pan3d.MouseType

    import Panel = win.Panel;

   
 
    export class ChangeNameModel  {
        private static _instance: ChangeNameModel;
        public static getInstance(): ChangeNameModel {
            if (!this._instance) {
                this._instance = new ChangeNameModel();
            }
            return this._instance;
        }
        public constructor() {
            this.onMouseDownFun = ($evt: MouseEvent) => { this.onMouseDown($evt) }
            this.changFun = (cevt: any) => { this.changeInputTxt(cevt) }
        }
   
        private get chatHtmlInput(): HTMLInputElement {
            return this._chatHtmlInput 
        }
        private _chatHtmlInput: HTMLInputElement;
        private set chatHtmlInput(value: HTMLInputElement) {
            console.log("value",value)
            this._chatHtmlInput = value
        }

        
        private setInputTxtPos(): void {
            if (!this.chatHtmlInput) {
                this.chatHtmlInput = <HTMLInputElement>document.createElement("input");
                this.chatHtmlInput.style.position = "absolute";
                this.chatHtmlInput.style["z-index"] = 100
         
                document.body.appendChild(this.chatHtmlInput);
            //    this.chatHtmlInput.addEventListener("change", this.changFun);
                document.addEventListener(MouseType.MouseDown, this.onMouseDownFun);
            }
 
    
        }
        private changFun: any
 
        private changeInputTxt(evt: Event): void {

            if (this.chatHtmlInput) {
                this.changeBfun(this.chatHtmlInput.value);
                win.LayerManager.isHideMouseEvent = false;
                document.removeEventListener(MouseType.MouseDown, this.onMouseDownFun);
                if (this.chatHtmlInput.parentElement) {
                    document.body.removeChild(this.chatHtmlInput);
                }
                this.chatHtmlInput = null
            }


        }
        private onMouseDownFun: any
        public getTextMetrics($str: string, fontsize: number=12): TextMetrics {
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(100, 100, false);
            $ctx.font = fontsize + "px serif";
  
            return $ctx.measureText($str)
   
              
        }
        private changeBfun: Function;
        public changeName(rect: Pan3d.Rectangle, str: string, bfun: Function): void {
            this.changeBfun = bfun;
            this.setInputTxtPos()
            win.LayerManager.isHideMouseEvent = true;
            this.chatHtmlInput.style.left = rect.x + "px";
            this.chatHtmlInput.style.top = rect.y + "px";
          
            this.chatHtmlInput.style.fontSize = String(12) + "px";
            this.chatHtmlInput.style.width = String(rect.width) + "px";
            this.chatHtmlInput.style.height = String(rect.height) + "px";

         
            this.chatHtmlInput.value = str
       
            setTimeout(() => { this.chatHtmlInput.focus();},1)

        
      
        }
        private onMouseDown($e: MouseEvent): void {
 
            if ($e.target != this.chatHtmlInput) {
                this.changeInputTxt(null)
            } else {
                console.log("还在")
            }
 
          
        }
        


    }
}