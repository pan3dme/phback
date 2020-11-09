module basemove {
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
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data


    export class BaseMoveWindos extends UIConatiner {


        private useMoseMove: boolean

        public constructor($rect: Rectangle = null, $move: boolean = true) {
            super();

            if ($rect) {
                this.pageRect = $rect;
            } else {
                this.pageRect = new Rectangle(100, 100, 500, 500);
            }
            this.contentHeight = 0
            this.useMoseMove = $move

            this._bRender = new UIRenderComponent;
            this.addRender(this._bRender);

            this._mRender = new UIRenderComponent;
            this.addRender(this._mRender);

            this._tRender = new UIRenderComponent;
            this.addRender(this._tRender);

            this._closeRender = new UIRenderComponent;
            this.addRender(this._closeRender);

            this._bRender.uiAtlas = new UIAtlas();
            this._bRender.uiAtlas.setInfo("ui/window/window.txt", "ui/window/window.png", () => { this.loadConfigCom() });

        }

        protected _bRender: UIRenderComponent;
        protected _mRender: UIRenderComponent;
        protected _tRender: UIRenderComponent;
        protected _closeRender: UIRenderComponent;
        protected _uiMask: UIMask

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
        protected b_bottom_left: UICompenent
        protected b_bottom_mid: UICompenent
        protected b_bottom_right: UICompenent
        protected b_bottom_line_left: UICompenent
        protected b_bottom_line_right: UICompenent
        protected b_win_close: UICompenent
        private static maskLevel: number = 10
        protected loadConfigCom(): void {
            this._tRender.uiAtlas = this._bRender.uiAtlas
            this._mRender.uiAtlas = this._bRender.uiAtlas
            this._closeRender.uiAtlas = this._bRender.uiAtlas


            this._uiMask = new UIMask();
            this._uiMask.level = win. BaseWindow.maskLevel++;
            this.addMask(this._uiMask);


            this.a_bg = this.addEvntBut("b_win_bg", this._bRender);


            this.a_tittle_bg = this.addChild(<UICompenent>this._tRender.getComponent("b_tittle_bg"));
            this.a_left_line = this.addChild(<UICompenent>this._tRender.getComponent("a_left_line"));
            this.a_rigth_line = this.addChild(<UICompenent>this._tRender.getComponent("a_rigth_line"));
            this.a_bottom_line = this.addChild(<UICompenent>this._tRender.getComponent("a_bottom_line"));
            this.a_scroll_bar_bg = this.addChild(<UICompenent>this._mRender.getComponent("a_scroll_bar_bg"));
            this.a_scroll_bar = this.addChild(<UICompenent>this._tRender.getComponent("a_scroll_bar"));


            this.b_bottom_left = this.addChild(<UICompenent>this._tRender.getComponent("b_bottom_left"));
            this.b_bottom_mid = this.addChild(<UICompenent>this._tRender.getComponent("b_bottom_mid"));
            this.b_bottom_right = this.addChild(<UICompenent>this._tRender.getComponent("b_bottom_right"));
            this.b_bottom_line_left = this.addChild(<UICompenent>this._tRender.getComponent("b_bottom_line"));
            this.b_bottom_line_right = this.addChild(<UICompenent>this._tRender.getComponent("b_bottom_line"));


            this.b_win_close = this.addEvntBut("b_win_close", this._closeRender)



            this.setUiListVisibleByItem([this.a_left_line], false)
            this.setUiListVisibleByItem([this.a_rigth_line], false)
            this.setUiListVisibleByItem([this.a_bottom_line], false)

            this.setUiListVisibleByItem([this.b_win_close], false)



            if (this.useMoseMove) {
                this.a_rigth_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
                this.a_bottom_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
                this.a_scroll_bar.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
                this.a_tittle_bg.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            }
            this.a_scroll_bar.y = this.a_tittle_bg.height + 2


            this.uiLoadComplete = true
            this.setHideUi()
            this.resize()


        }

        public removeMoveEvent(): void {
            if (this.uiLoadComplete) {
                this.a_tittle_bg.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
                this.a_rigth_line.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
                this.a_bottom_line.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            }

        }
        protected a_bg: UICompenent;
        protected a_tittle_bg: UICompenent;
        protected a_rigth_line: UICompenent;
        protected a_left_line: UICompenent
        protected a_bottom_line: UICompenent
        protected a_scroll_bar: UICompenent
        protected a_scroll_bar_bg: UICompenent
        protected contentHeight: number



        public setRect(value: Rectangle): void {
            this.pageRect = value
            this.resize()

        }
        private hideUiItem: Array<string>
        public setHideUi(value: Array<string> = null): void {

            if (value) {
                this.hideUiItem = value;
            }
            if (this.uiLoadComplete) {
                for (var i: number = 0; this.hideUiItem && i < this.hideUiItem.length; i++) {
                    var uiName: string = this.hideUiItem[i];
                    this.setUiListVisibleByItem([this[uiName]], false);
                }
            }

        }

        public resize(): void {
            if (this.uiLoadComplete) {

                this.left = this.pageRect.x;
                this.top = this.pageRect.y;
                this.pageRect.width = Math.max(100, this.pageRect.width)
                this.pageRect.height = Math.max(100, this.pageRect.height)

                this.a_tittle_bg.x = 2;
                this.a_tittle_bg.y = 2;
                this.a_tittle_bg.width = this.pageRect.width - 4;

                this.b_win_close.y = 2
                this.b_win_close.x = this.pageRect.width - this.b_win_close.width - 5

                this._uiMask.y = this.a_tittle_bg.height + 2;
                this._uiMask.x = 0
                this._uiMask.width = this.pageRect.width - this.a_rigth_line.width
                this._uiMask.height = this.pageRect.height - this.a_tittle_bg.height - this.a_bottom_line.height

                this.a_bg.x = 0;
                this.a_bg.y = 0
                this.a_bg.width = this.pageRect.width
                this.a_bg.height = this.pageRect.height

                this.a_rigth_line.x = this.pageRect.width - this.a_rigth_line.width
                this.a_rigth_line.y = this.a_tittle_bg.height - 1;
                this.a_rigth_line.height = this.pageRect.height - this.a_tittle_bg.height

                this.a_left_line.x = 0;
                this.a_left_line.y = this.a_rigth_line.y;
                this.a_left_line.height = this.a_rigth_line.height;

                this.a_bottom_line.x = 0
                this.a_bottom_line.y = this.pageRect.height - this.a_bottom_line.height
                this.a_bottom_line.width = this.a_bg.width

                this.a_scroll_bar.x = this._uiMask.x + this._uiMask.width - this.a_scroll_bar.width;


                this.a_scroll_bar_bg.x = this.pageRect.width - this.a_rigth_line.width - this.a_scroll_bar_bg.width + 2
                this.a_scroll_bar_bg.y = this.a_tittle_bg.height
                this.a_scroll_bar_bg.height = this.a_left_line.height



                this.setUiListVisibleByItem([this.a_scroll_bar], this.contentHeight > this._uiMask.height)

                if (this.contentHeight > this._uiMask.height) {
                    this.a_scroll_bar.height = this._uiMask.height * (this._uiMask.height / this.contentHeight)
                    this.a_scroll_bar.y = Math.min((this._uiMask.y + this._uiMask.height) - this.a_scroll_bar.height, this.a_scroll_bar.y)
                } else {
                    //  this.a_scroll_bar.y = this.a_tittle_bg.height;
                }

                this.b_bottom_left.x = 0;
                this.b_bottom_left.y = this.pageRect.height - this.b_bottom_left.height;

                this.b_bottom_mid.y = this.b_bottom_left.y;
                this.b_bottom_mid.x = this.pageRect.width / 2 - this.b_bottom_mid.width / 2;

                this.b_bottom_right.y = this.b_bottom_left.y
                this.b_bottom_right.x = this.pageRect.width - this.b_bottom_right.width;

                this.b_bottom_line_left.y = this.b_bottom_left.y
                this.b_bottom_line_left.x = this.b_bottom_left.x + this.b_bottom_left.width;
                this.b_bottom_line_left.width = this.b_bottom_mid.x - this.b_bottom_left.width;

                this.b_bottom_line_right.y = this.b_bottom_left.y

                this.b_bottom_line_right.x = this.b_bottom_mid.x + this.b_bottom_mid.width;
                this.b_bottom_line_right.width = this.b_bottom_right.x - this.b_bottom_mid.width - this.b_bottom_mid.x;

                this._bRender.applyObjData();
                this._mRender.applyObjData();
                this._tRender.applyObjData();

            }
            super.resize()
        }


        protected lastPagePos: Vector2D;
        protected lastMousePos: Vector2D;
        protected mouseMoveTaget: UICompenent
        protected pageRect: Rectangle
        protected tittleMouseDown(evt: InteractiveEvent): void {

            this.mouseMoveTaget = evt.target

            this.lastMousePos = new Vector2D(evt.x, evt.y)

            switch (this.mouseMoveTaget) {
                case this.a_tittle_bg:
                    this.lastPagePos = new Vector2D(this.left, this.top)
                    break

                case this.a_rigth_line:
                case this.a_bottom_line:
                    this.lastPagePos = new Vector2D(this.pageRect.width, this.pageRect.height)
                    break
                case this.a_scroll_bar:
                    this.lastPagePos = new Vector2D(0, this.a_scroll_bar.y)
                    break

                default:
                    console.log("nonono")
                    break

            }




            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        protected tittleMouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
            switch (this.mouseMoveTaget) {
                case this.a_tittle_bg:
                    this.left = this.lastPagePos.x + (evt.x - this.lastMousePos.x)
                    this.top = this.lastPagePos.y + (evt.y - this.lastMousePos.y)
                    this.pageRect.x = this.left;
                    this.pageRect.y = this.top;
                    break
                case this.a_rigth_line:
                    this.pageRect.width = this.lastPagePos.x + (evt.x - this.lastMousePos.x)

                    break
                case this.a_bottom_line:
                    this.pageRect.height = this.lastPagePos.y + (evt.y - this.lastMousePos.y)

                    break



                case this.a_scroll_bar:

                    this.a_scroll_bar.y = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    this.a_scroll_bar.y = Math.max(this.a_scroll_bar.y, this._uiMask.y)
                    this.a_scroll_bar.y = Math.min(this.a_scroll_bar.y, this._uiMask.y + this._uiMask.height - this.a_scroll_bar.height)

                    //  console.log(this.a_scroll_bar.y)
                    this.changeScrollBar()

                    break
                default:
                    console.log("nonono")
                    break

            }
            this.resize()

        }
        protected changeScrollBar(): void {
        }


    }

    export class Dis2dBaseWindow extends win.BaseWindow {
        protected _baseRender: UIRenderComponent;
        public constructor($classVo: any, $rect: Rectangle, $num: number) {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.creatBaseRender()
            this.addRender(this._baseRender);
            this.mathSize($rect, $num)
            this.initData($classVo, $rect, $num)
        }
        protected creatBaseRender(): void {
            this._baseRender = new UIRenderComponent;

        }
        //显示单元类, 尺寸，数量
        private initData($classVo: any, $rect: Rectangle, $num: number): void {
            this._voNum = Math.floor($num)
            this._voRect = $rect;


            var kkwA: number = Math.pow(2, Math.ceil(Math.log($rect.x * $rect.width) / Math.log(2)))
            var kkhB: number = Math.pow(2, Math.ceil(Math.log($rect.x * $rect.width) / Math.log(2)))



            this._textureRect = new Rectangle(0, 0, kkwA, kkhB);

            this._baseRender.uiAtlas = new UIAtlas();
            var $uiAtlas: UIAtlas = this._baseRender.uiAtlas;
            $uiAtlas.configData = new Array();
            $uiAtlas.ctx = UIManager.getInstance().getContext2D(this._textureRect.width, this._textureRect.height, false);
            $uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture($uiAtlas.ctx);
            this.makeBaseUi($classVo);
            ;
        }
        private mathSize($rect: Rectangle, $num: number): void {
            $rect.x = 0
            $rect.y = 0

            while ($rect.x * $rect.y < $num) {
                if ($rect.x * $rect.width > $rect.y * $rect.height) {
                    $rect.y++
                } else {
                    $rect.x++
                }

            }


        }

        private _textureRect: Rectangle;//纹理尺寸
        private _voNum: number;//最大同屏数量
        private _voRect: Rectangle;//单元尺寸
        protected _uiItem: Array<Disp2DBaseText>;
        protected _lostItem: Array<Pan3d.baseMeshVo>;//没有上传成功的

        //根据数量创建单元格UICompenent 并存在数组中，待需要时应用
        private makeBaseUi($classVo: any): void {
            var $uiAtlas: UIAtlas = this._baseRender.uiAtlas;
            this._uiItem = new Array();
            this._lostItem = new Array();

            for (var i: number = 0; i < this._voRect.x; i++) {
                for (var j: number = 0; j < this._voRect.y; j++) {

                    var $disp2DBaseText: Disp2DBaseText = new $classVo()
                    this._uiItem.push($disp2DBaseText);
                    $disp2DBaseText.parent = this._baseRender;
                    $disp2DBaseText.voRect = this._voRect;
                    $disp2DBaseText.textureStr = "id_" + i + "_" + j;
                    $uiAtlas.configData.push($uiAtlas.getObject($disp2DBaseText.textureStr, i * this._voRect.width, j * this._voRect.height, this._voRect.width, this._voRect.height, this._textureRect.width, this._textureRect.height));
                    $disp2DBaseText.ui = <UICompenent>this._baseRender.creatBaseComponent($disp2DBaseText.textureStr);
                }


            }
        }
        //找到可用的单元 找到后赋值并添加ui到显示队列
        public showTemp($data: any): Disp2DBaseText {
            this.clearLostItem();
            var empty: Disp2DBaseText;
            //找到上一个数据和现在是一样的对象.避免重复更新纹理
            for (var j: number = 0; j < this._uiItem.length; j++) {
                if (this._uiItem[j].rightTabInfoVo == null && this._uiItem[j].isEqualLastKey($data)) {
                    empty = this._uiItem[j];
                    break
                }
            }
            if (!empty) {
                for (var i: number = 0; i < this._uiItem.length; i++) {
                    if (this._uiItem[i].rightTabInfoVo == null) {
                        empty = this._uiItem[i];
                        break
                    }
                }
            }
            if (empty) {
                empty.rightTabInfoVo = $data;
                this.addChild(empty.ui);
            } else {
                this._lostItem.push($data)
            }
            return empty
        }
        private clearLostItem(): void {
            for (var i: number = (this._lostItem.length - 1); i > 0; i--) {
                if (this._lostItem[i].clear) {
                    this._lostItem.splice(i, 1);
                }
            }
        }
        public playLost(): void {
            if (this._lostItem.length) {
                this.showTemp(this._lostItem.pop())
            }

        }
        public clearOneTemp(): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (!this._uiItem[i].rightTabInfoVo) {
                    return;
                }
            }
            this._lostItem.length = 0;
            this.clearTemp(this._uiItem[0].rightTabInfoVo);


        }
        //清理单元内的内容并需要将对象移出显示队例
        public clearTemp($data: any): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo == $data) {
                    this._uiItem[i].rightTabInfoVo = null
                    this.removeChild(this._uiItem[i].ui);
                    break
                }
            }
            this.playLost()
        }
        public getVoByData(value: any): Disp2DBaseText {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo == value) {
                    return this._uiItem[i]
                }
            }
        }
        public getVoByUi($ui: UICompenent): Disp2DBaseText {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo) {
                    if (this._uiItem[i].ui == $ui) {
                        return this._uiItem[i]
                    }
                }
            }
        }
        public clearAll(): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo) {
                    this.clearTemp(this._uiItem[i].rightTabInfoVo)
                }
            }
        }
        private updateFun: Function;
        public update(t: number): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo) {
                    this._uiItem[i].update();
                }
            }
            /*
            if (this.getUiItemLen() <( this._uiItem.length-1)) {
                this.playLost()
            }
            */

        }
        public getUiItemLen(): number {
            var $num: number = 0;
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo) {
                    $num++;
                }
            }
            return $num;
        }

    }


}