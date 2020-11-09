module prop {
    import Vector3D = Pan3d.Vector3D
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import LabelTextFont = Pan3d.LabelTextFont;
    import Matrix3D = Pan3d.Matrix3D;
    import EventDispatcher = Pan3d.EventDispatcher;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    import UIManager = Pan3d.UIManager;
    import Rectangle = Pan3d.Rectangle;
    import TimeUtil = Pan3d.TimeUtil;
    import TextAlign = Pan3d.TextAlign;
    import UICompenent = Pan3d.UICompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import UIConatiner = Pan3d.UIConatiner
    import UIAtlas = Pan3d.UIAtlas
    import TextureManager = Pan3d.TextureManager

     

    export class TextureContext extends UIConatiner {
        private _bRender: UIRenderComponent;

        private tempUiName: string = "tempui";
        public ui: UICompenent;

        public uiViewScale: number = 0.5;
  
        public constructor(w: number , h: number ) {
            super();
           
            w /=this. uiViewScale;
            h /=this. uiViewScale;

            this._bRender = new UIRenderComponent();
            this.addRender(this._bRender);
            this._bRender.uiAtlas = new UIAtlas();
            var $uiAtlas: UIAtlas = this._bRender.uiAtlas
            $uiAtlas.configData = [];

            
            var kkwA: number = Math.pow(2, Math.ceil(Math.log(w) / Math.log(2)))
            var kkhB: number = Math.pow(2, Math.ceil(Math.log(h) / Math.log(2)))

      

            this._bRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(kkwA, kkhB, false);
            this._bRender.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(this._bRender.uiAtlas.ctx,0,1,0);
 
            $uiAtlas.configData.push($uiAtlas.getObject(this.tempUiName, 0, 0, w, h, kkwA, kkhB));

            this.ui = <UICompenent>this._bRender.creatBaseComponent(this.tempUiName);
            this.ui.width = w * this.uiViewScale;
            this.ui.height = h * this.uiViewScale;
            this.addChild(this.ui);



      
            //  this.ui.uiRender.uiAtlas.upDataPicToTexture("b.jpg", this.ui.skinName);

        }


    }
   
    export class BaseMeshUi extends EventDispatcher {
        public textureContext: TextureContext
        public ui: UICompenent
        public constructor(  w: number = 64, h: number = 64) {
            super();
            this.textureContext = new TextureContext(w,h)
            this.ui = this.textureContext.ui
       
        }
        public get visible() {
            return this._visible;
        }
        private _visible: boolean
        public set visible(value: boolean) {
            this._visible = value

        }
        public destory(): void {
 
            var layUIManager: win.LayUIManager = this.textureContext.perent
            if (layUIManager) {
                layUIManager.removeUIContainer(this.textureContext);
            }
           
        }
        protected addEvets(): void {
            var $ui: UICompenent = this.ui
            $ui.addEventListener(InteractiveEvent.Down, this.butClik, this);
        }
        protected butClik(evt: InteractiveEvent): void {

        }
        public resize(): void {
            this.ui.x = this._x
            this.ui.y = this._y
       
        }
        private _x: number = 0
        private _y: number = 0;
        public set x(value: number) {
            this._x = value;
            this.resize()
        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.resize()
        }
        public get y(): number {
            return this._y
        }
    }

    import InteractiveEvent = Pan3d.InteractiveEvent
    export class TextLabelUI extends BaseMeshUi{
        public constructor(w: number = 128, h: number = 30) {
            super(w, h);
            this.initView();
            this.resize();
        }
        protected initView(): void
        {
        }
        public get label(): string {
            return "";
        }
        public set label(value: string) {
            LabelTextFont.writeSingleLabelCopy(this.ui.uiRender.uiAtlas, this.ui.skinName, value, 24, TextAlign.LEFT, "#eeeeee", "#eeeeee", 5);


        }

    }
} 