module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent
    import Scene_data = Pan3d.Scene_data
    import Grid9Compenent = Pan3d.Grid9Compenent
    export class TextureFunPanel extends win.BaseWindow {
 
        protected loadConfigCom(): void {

            super.loadConfigCom();

            this.e_pop_panel = <Grid9Compenent>this.addChild(this._closeRender.getComponent("e_pop_panel"));
 
            this.c_tittle_bg.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

            this.resize();
 
        }
        private e_pop_panel: Grid9Compenent
        protected tittleMouseDown(evt: InteractiveEvent): void {

            this.mouseMoveTaget = evt.target

            this.lastMousePos = new Vector2D(evt.x, evt.y)

            switch (this.mouseMoveTaget) {
                case this.c_tittle_bg:
                    this.lastPagePos = new Vector2D(this.left, this.top)
                    break
 
                default:
                    console.log("nonono")
                    break

            }




            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
            switch (this.mouseMoveTaget) {
                case this.c_tittle_bg:
                    this.left = this.lastPagePos.x + (evt.x - this.lastMousePos.x)
                    this.top = this.lastPagePos.y + (evt.y - this.lastMousePos.y)
                    this.pageRect.x = this.left;
                    this.pageRect.y = this.top;
                    break;
                default:
                    
                    break

            }
            this.resize()

        }
        private chatHtmlInput: HTMLTextAreaElement;
        private setInputTxtPos(): void {
            if (!this.chatHtmlInput) {
                this.chatHtmlInput = document.createElement("textarea")
                this.chatHtmlInput.style.position = "absolute";
                this.chatHtmlInput.style["z-index"] = 100
                this.chatHtmlInput.style.background = "transparent"
                this.chatHtmlInput.style.color = "#ffffff";
                document.body.appendChild(this.chatHtmlInput);
                this.chatHtmlInput.addEventListener("change", (cevt: any) => { this.changeFile(cevt) });
                //this.chatHtmlInput.style.resize = (cevt: any) => { this.changeInputResize(cevt) };
                this.chatHtmlInput.style.resize = "none"
               
              
            }

            this.chatHtmlInput.style.left = 0 + "px";
            this.chatHtmlInput.style.top = 0 + "px";


            var tw: number = 350
            var th: number = 40;

          
            this.chatHtmlInput.style.fontSize = String(12) + "px";
            this.chatHtmlInput.style.width = String(tw) + "px";
            this.chatHtmlInput.style.height = String(th) + "px";
            this.chatHtmlInput.value = (<materialui.NodeTreeFun>this.mathFunNodeUI.nodeTree).funStr

            this.resize();

          
        }
        protected butClik(evt: InteractiveEvent): void {

            if (evt.target == this.b_win_close) {
                this.hidePanel();
            }
        }
        public resize(): void {
            super.resize()
      
            if (this.e_pop_panel&&this.chatHtmlInput ) {
                this.chatHtmlInput.style.left = this.left+5 + "px";
                this.chatHtmlInput.style.top = this.top + 25 + "px";

                this.chatHtmlInput.style.width = this.pageRect.width-8 + "px";
                this.chatHtmlInput.style.height = this.pageRect.height - 30 + "px";

                this.e_pop_panel.x = 0
                this.e_pop_panel.y = 0
                this.e_pop_panel.width = this.pageRect.width
                this.e_pop_panel.height = this.pageRect.height

                this._closeRender.applyObjData()
            }
        }
        private changeInputResize(evt: any): void {
            console.log(evt)
        }
        
        private changeFile(evt: any): void {
            
            var $agalStr: string = this.chatHtmlInput.value
            if (materialui.NodeTreeFun.isNeedChangePanel($agalStr, (<materialui.NodeTreeFun>this.mathFunNodeUI.nodeTree).funStr)) {
                this.mathFunNodeUI.inPutFunStr($agalStr)
            } else {
                (<materialui.NodeTreeFun>this.mathFunNodeUI.nodeTree).funStr = $agalStr
                this.changeData();
            }
 
        }
        private changeData(): void {
            Pan3d.  ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        }
        private static _instance: TextureFunPanel;
        public static getInstance(): TextureFunPanel {
            if (!this._instance) {
                this._instance = new TextureFunPanel();
            }
            return this._instance;
        }
        private layaPanel: win.Panel
        private mathFunNodeUI: materialui.MathFunNodeUI;
        public constructor() {
            super();
            this.layaPanel = new win.Panel()
            win.LayerManager.getInstance().addPanel(this.layaPanel, 501);

            this.setRect(new Pan3d.Rectangle(100, 100, 500, 400))
    ;
        }
        public showPanel(value: materialui.MathFunNodeUI): void {
            this.mathFunNodeUI = value
            this.layaPanel.addUIContainer(this)
            this.setInputTxtPos()

            
        }
        public hidePanel(): void {
            if (this.chatHtmlInput) {
                this.chatHtmlInput.removeEventListener("change", (cevt: any) => { this.changeFile(cevt) });
                document.body.removeChild(this.chatHtmlInput);
                this.chatHtmlInput = null
            }
            this.layaPanel.removeUIContainer(this)
        }
        
    }
}