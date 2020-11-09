module materialui {

    import Rectangle = Pan3d.Rectangle
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data

    import UICompenent = Pan3d.UICompenent
    import Sprite = win.Sprite


    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign

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
    import Panel = win.Panel
    //ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));

    import Vector3D = Pan3d.Vector3D

    import Matrix3D = Pan3d.Matrix3D;
    import EventDispatcher = Pan3d.EventDispatcher;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;

    import TimeUtil = Pan3d.TimeUtil;
    import TextureManager = Pan3d.TextureManager



    export class TextureContext extends UIConatiner {
        private _bRender: UIRenderComponent;

        private tempUiName: string = "tempui";
        public ui: UICompenent;

        public uiViewScale: number = 0.5;

        public constructor(w: number, h: number) {
            super();
            w /= this.uiViewScale;
            h /= this.uiViewScale;

            this._bRender = new UIRenderComponent();
            this.addRender(this._bRender);
            this._bRender.uiAtlas = new UIAtlas();
            var $uiAtlas: UIAtlas = this._bRender.uiAtlas
            $uiAtlas.configData = [];


            var kkwA: number = Math.pow(2, Math.ceil(Math.log(w) / Math.log(2)))
            var kkhB: number = Math.pow(2, Math.ceil(Math.log(h) / Math.log(2)))



            this._bRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(kkwA, kkhB, false);
            this._bRender.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(this._bRender.uiAtlas.ctx);

            $uiAtlas.configData.push($uiAtlas.getObject(this.tempUiName, 0, 0, w, h, kkwA, kkhB));

            this.ui = <UICompenent>this._bRender.creatBaseComponent(this.tempUiName);
            this.ui.width = w * this.uiViewScale;
            this.ui.height = h * this.uiViewScale;
            this.addChild(this.ui);




            //  this.ui.uiRender.uiAtlas.upDataPicToTexture("b.jpg", this.ui.skinName);

        }


    }
    export class MaterialCavasPanel extends win.BaseWindow {


        private blakCavansRender: UIRenderComponent


        public constructor() {
            super();

            this.setRect(new Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight))


            this.blakCavansRender = new UIRenderComponent();
            this.addRender(this.blakCavansRender);
            this.blakCavansRender.uiAtlas = this.makeBaseUiatlas(64, 64);



  

            for (var i: number = 0; i < 200; i++) {
                this.lineItemA.push(this.getTempLineUi());
                this.lineItemB.push(this.getTempLineUi());
            }
            for (var j: number = 0; j < 30; j++) {
                this.lineItemBigA.push(this.getTempBigLineUi());
                this.lineItemBigB.push(this.getTempBigLineUi());
            }
        }
        private linesSmailRender: UIRenderComponent
        private getTempLineUi(): UICompenent {
            if (!this.linesSmailRender) {
                this.linesSmailRender = new UIRenderComponent();
                this.addRender(this.linesSmailRender);
                this.linesSmailRender.uiAtlas = this.makeBaseUiatlas(64, 64);
                var tempLine: UICompenent = <UICompenent>this.linesSmailRender.creatBaseComponent("temp_ui");
                this.drawOutColor(tempLine, new Vector3D(53, 53, 53))
            }
            if (this.linesSmailRender.uiListLen >= 50) {
                let temp = new UIRenderComponent();
                this.addRender(temp);
                temp.uiAtlas = this.linesSmailRender.uiAtlas
                this.linesSmailRender = temp;
            }
            var ui: UICompenent = this.addChild(<UICompenent>this.linesSmailRender.creatBaseComponent("temp_ui"))
            return ui;
        }
        private lineBigRender: UIRenderComponent

        private lineItemBigA: Array<UICompenent> = [];
        private lineItemBigB: Array<UICompenent> = [];
        private getTempBigLineUi(): UICompenent {
            if (!this.lineBigRender) {
                this.lineBigRender = new UIRenderComponent();
                this.addRender(this.lineBigRender);
                this.lineBigRender.uiAtlas = this.makeBaseUiatlas(64, 64);
                var tempLine: UICompenent = <UICompenent>this.lineBigRender.creatBaseComponent("temp_ui");
                this.drawOutColor(tempLine, new Vector3D(35, 35, 35))
            }
            if (this.lineBigRender.uiListLen >= 50) {
                let temp = new UIRenderComponent();
                this.addRender(temp);
                temp.uiAtlas = this.lineBigRender.uiAtlas
                this.lineBigRender = temp;
            }
            var ui: UICompenent = this.addChild(<UICompenent>this.lineBigRender.creatBaseComponent("temp_ui"))
            return ui;
        }

        private drawOutColor(ui: UICompenent, $vcolor): void {
            // var $vcolor: Vector3D = new Vector3D(1 * 255, 0,0);
            var $UIAtlas: UIAtlas = ui.uiRender.uiAtlas
            var $textureStr: string = ui.skinName
            var rec: UIRectangle = $UIAtlas.getRec($textureStr);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $imgData: ImageData = ctx.getImageData(0, 0, rec.pixelWitdh, rec.pixelHeight);
            for (var i: number = 0; i < $imgData.data.length / 4; i++) {
                $imgData.data[i * 4 + 0] = $vcolor.x;
                $imgData.data[i * 4 + 1] = $vcolor.y;
                $imgData.data[i * 4 + 2] = $vcolor.z;
                $imgData.data[i * 4 + 3] = 255;
            }
            ctx.putImageData($imgData, 0, 0)
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        }

        private tempListBg: UICompenent;
        private lineItemA: Array<UICompenent> = [];
        private lineItemB: Array<UICompenent> = [];
        protected loadConfigCom(): void {
            super.loadConfigCom();
 
            this.tempListBg = <UICompenent>this.blakCavansRender.creatBaseComponent("temp_ui");
            this.addChild(this.tempListBg);
            this.drawOutColor(this.tempListBg, new Vector3D(42, 42, 42))


            this.resize();

        }

  

        public resize(): void {
            super.resize();
            if (this.tempListBg) {
                this.moveLineA();
                this.moveLineB();

                this.movelineItemBigA();
                this.movelineItemBigB();

                this.tempListBg.x = 0;
                this.tempListBg.y = 0;
                this.tempListBg.width = Scene_data.stageWidth;
                this.tempListBg.height = Scene_data.stageHeight;
            }
 
        }
        private moveLineA(): void {
            var speedNum: number = MtlUiData.Scale * 20
            for (var i: number = 0; i < this.lineItemA.length; i++) {
                var $tempA: UICompenent = this.lineItemA[i];
                $tempA.x = 0;
                $tempA.y = i * speedNum + (AppData.stagePos.y * MtlUiData.Scale) % (speedNum);
                $tempA.width = Scene_data.stageWidth
                $tempA.height = 1;

            }
 
        }
        private moveLineB(): void {
            var speedNum: number = MtlUiData.Scale * 20
            for (var i: number = 0; i < this.lineItemB.length; i++) {
                var $tempB: UICompenent = this.lineItemB[i];
                $tempB.x = i * speedNum + (AppData.stagePos.x * MtlUiData.Scale) % (speedNum);
                $tempB.y = 0
                $tempB.width = 1;
                $tempB.height = Scene_data.stageHeight

            }
        }

        private movelineItemBigA(): void {
            var speedNum: number = MtlUiData.Scale * 20*8
            for (var i: number = 0; i < this.lineItemBigA.length; i++) {
                var $tempA: UICompenent = this.lineItemBigA[i];
                $tempA.x = 0;
                $tempA.y = i * speedNum + (AppData.stagePos.y * MtlUiData.Scale) % (speedNum);
                $tempA.width = Scene_data.stageWidth
                $tempA.height = 2;

            }

        }

        private movelineItemBigB(): void {
            var speedNum: number = MtlUiData.Scale * 20 * 8
            for (var i: number = 0; i < this.lineItemBigB.length; i++) {
                var $tempB: UICompenent = this.lineItemBigB[i];
                $tempB.x = i * speedNum + (AppData.stagePos.x * MtlUiData.Scale) % (speedNum);
                $tempB.y = 0
                $tempB.width = 1;
                $tempB.height = Scene_data.stageHeight

            }
        }
 

    }

}

