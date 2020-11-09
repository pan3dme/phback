module drag {

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
    import UIConatiner = Pan3d.UIConatiner
    import UIAtlas = Pan3d.UIAtlas
    import TextureManager = Pan3d.TextureManager

    import UIPanel = win.UIPanel

  
    export class DragPanel extends UIConatiner {
 
        private _bRender: UIRenderComponent;

        private tempUiName: string = "tempui";
        public ui: UICompenent
        public constructor(w: number, h: number) {
            super();
            this._bRender = new UIRenderComponent();
            this.addRender(this._bRender);
            this._bRender.uiAtlas = new UIAtlas();
            var $uiAtlas: UIAtlas = this._bRender.uiAtlas
            $uiAtlas.configData = [];
            $uiAtlas.configData.push($uiAtlas.getObject(this.tempUiName, 0, 0, w, h, w, h));

            this.ui = <UICompenent>this._bRender.creatBaseComponent(this.tempUiName);
            this.ui.width = w;
            this.ui.height = h;
            this.addChild(this.ui)

            this._bRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(w, h, false);
            this._bRender.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(this._bRender.uiAtlas.ctx);
       

        }
        public setData(value: DragSource): void{
            if (value.icon) {
                this.ui.uiRender.uiAtlas.upDataPicToTexture(value.icon, this.ui.skinName);
            }

        }
    }
}