module basefolderwin {
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


    export class BaseFolderWindow extends win.BaseWindow {

        public constructor( ) {
            super();
        }
 
        public setRect(value: Rectangle): void {
            this.pageRect = value;
            this.setLinePos();
            this.resize();
            this.refrishWinSize()
        }
        public resize(): void {
            super.resize();
            if (this.uiLoadComplete && this.pathUrlBg) {
                this.pathUrlBg.x = this.pageRect.width * this.percentNum + 3;
                this.pathUrlBg.y = 11;
                this.pathUrlBg.height=28
                this.pathUrlBg.width = this.pageRect.width - this.pathUrlBg.x;
                this._baseMidRender.applyObjData();
            }
        }
        public getPageRect(): Rectangle {
            return this.pageRect
        }
        public percentNum: number = 0.2;
        private setLinePos(): void {
            if (this.moveLine) {
                this.moveLine.x = this.pageRect.width * this.percentNum
                this.moveLine.y = 13
                this.moveLine.width = 5
                this.moveLine.height = this.pageRect.height
               // console.log("设置位置")
            }
      
        }
        private pathUrlBg: UICompenent
        protected loadConfigCom(): void {
            super.loadConfigCom();
            this.setUiListVisibleByItem([this.c_tittle_bg, this.c_win_bg], false)
            this.setUiListVisibleByItem([this.e_panel_1], true)
            
            this.pathUrlBg = this.addChild(this._baseMidRender.getComponent("e_file_list_path_bg"));


            this.moveLine = this.addChild(this._baseMidRender.getComponent("e_line_vertical"));
            this.moveLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
 
            this.setLinePos();

            this.resize();
        }
        protected tittleMouseDown(evt: InteractiveEvent): void {
            this.mouseMoveTaget = evt.target
            this.lastMousePos = new Vector2D(evt.x, evt.y)
            switch (this.mouseMoveTaget) {
                case this.moveLine:
                    this.lastPagePos = new Vector2D(this.moveLine.x, this.moveLine.y)
                    break
                default:
                    console.log("nonono")
                    break

            }
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        private refrishWinSize(): void {
            Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.RESET_FOLDE_WIN_SIZE));
        }
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
            switch (this.mouseMoveTaget) {
                case this.moveLine:
                    this.moveLine.x = this.lastPagePos.x + (evt.x - this.lastMousePos.x)

                    this.moveLine.x = Math.min(this.moveLine.x, this.pageRect.width * 0.6)
                    this.moveLine.x = Math.max(this.moveLine.x, this.pageRect.width * 0.2)

                    this.percentNum = this.moveLine.x / this.pageRect.width;

                    this.refrishWinSize();

                default:
                    console.log("nonono")
                    break

            }
            this.resize()

        }
   
    
        private moveLine: UICompenent
 

     
  
    }
}