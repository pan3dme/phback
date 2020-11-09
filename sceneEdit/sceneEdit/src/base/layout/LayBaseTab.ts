module win {
    import UICompenent = Pan3d.UICompenent
    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign
    import Rectangle = Pan3d.Rectangle
    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import UIConatiner = Pan3d.UIConatiner;
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import UIRectangle = Pan3d.UIRectangle
    import baseMeshVo = Pan3d.baseMeshVo
    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data


    export class LayBaseTab extends UIConatiner {

        public static imgBaseDic: any;
        public constructor() {
            super();

            this.left = 0;
            this._pageRect = new Rectangle(0, 0, 300, 300)

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._bottomRender.uiAtlas = new UIAtlas();
            this._bottomRender.uiAtlas.setInfo("ui/basewin/basewin.txt", "ui/basewin/basewin.png", () => { this.loadConfigCom() });

        }

        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
 

        protected mouseDown(evt: InteractiveEvent): void {
            this.mouseIsDown = true
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        }
        private mouseIsDown: boolean
        protected stageMouseMove(evt: InteractiveEvent): void {
            this.mouseIsDown = false

        }
        protected mouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        }
        private loadFinish: boolean
        protected loadConfigCom(): void {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas
          

            this.a_win_tittle = this.addEvntBut("a_win_tittle", this._topRender)
            this.a_bg = this.addEvntBut("a_bg", this._bottomRender);
  
            this.a_left_line = this.addChild(<UICompenent>this._topRender.getComponent("a_rigth_line"));
            this.a_rigth_line = this.addChild(<UICompenent>this._topRender.getComponent("a_rigth_line"));
            this.a_bottom_line = this.addChild(<UICompenent>this._topRender.getComponent("a_bottom_line"));
            this.a_right_bottom = this.addChild(<UICompenent>this._topRender.getComponent("a_right_bottom"));
 

            this.loadFinish = true
    
            this.refrishSize()
      
 

        }
        protected butClik(evt: InteractiveEvent): void {
            console.log(evt.target)
        }
        public set pageRect(value: Rectangle) {
            this._pageRect = value;
            if (this.loadFinish) {
                this.refrishSize();
            }
        }
        public get pageRect() {
            return this._pageRect;

        }
        private _pageRect: Rectangle;
        private a_bg: UICompenent;
        private a_win_tittle: UICompenent;
        private a_bottom_line: UICompenent
        private a_right_bottom: UICompenent;
        private a_rigth_line: UICompenent;
        private a_left_line: UICompenent
        private refrishSize(): void {

            this.left = this._pageRect.x;
            this.top = this._pageRect.y;
            this._pageRect.width = Math.max(100, this._pageRect.width)
            this._pageRect.height = Math.max(100, this._pageRect.height)

            this.a_win_tittle.x = 0;
            this.a_win_tittle.y = 0;
            this.a_win_tittle.width = this._pageRect.width;


 
            this.a_bg.x = 0;
            this.a_bg.y = 0
            this.a_bg.width = this._pageRect.width
            this.a_bg.height = this._pageRect.height

            this.a_left_line.x = 0
            this.a_left_line.y = this.a_win_tittle.height;
            this.a_left_line.height = this._pageRect.height - this.a_win_tittle.height - this.a_right_bottom.height;

            this.a_rigth_line.x = this._pageRect.width - this.a_rigth_line.width
            this.a_rigth_line.y = this.a_win_tittle.height;
            this.a_rigth_line.height = this._pageRect.height - this.a_win_tittle.height - this.a_right_bottom.height;

            this.a_bottom_line.x = 0
            this.a_bottom_line.y = this._pageRect.height - this.a_bottom_line.height
            this.a_bottom_line.width = this._pageRect.width - this.a_right_bottom.width;


            this.a_right_bottom.x = this._pageRect.width - this.a_right_bottom.width
            this.a_right_bottom.y = this._pageRect.height - this.a_right_bottom.height
 
            this.resize();
 

        }
 

    }
}