module menutwo {
    import UICompenent = Pan3d.UICompenent
    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign
 
    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import UIRectangle = Pan3d.UIRectangle
    import TextureManager = Pan3d.TextureManager
    import Rectangle = Pan3d.Rectangle
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel
 
    export class MenuListData {
        public label: string
        public level: number;
        public subMenu: Array<MenuListData>;
        public select: boolean;
        public key: string

        constructor($label: string, $key: string = null) {
            this.select = false
            this.label = $label;
            this.key = $key;
          

        }

    }
    export class LabelTxtVo extends Disp2DBaseText {
  
        public makeData(): void {
            if (this.rightTabInfoVo) {
                var $menuListData: MenuListData = this.rightTabInfoVo
                var $uiRec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);

           
        

                var colorBg: string = $menuListData.select ? "#6c6c6c" : "#555555" ;
                var colorFont: string = $menuListData.select ? "[ffffff]" : "[9c9c9c]";

                this.parent.uiAtlas.ctx.fillStyle = colorBg; // text color
                this.parent.uiAtlas.ctx.fillRect(0, 0, $uiRec.pixelWitdh, $uiRec.pixelHeight);
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, colorFont + $menuListData.label, 12, 5, 5, TextAlign.LEFT)

                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);
            }
     
              

             
        }
    }

    export class MenuTwoPanel extends Dis2DUIContianerPanel {

   
        public constructor() {
            super(LabelTxtVo, new Rectangle(0, 0, 70, 20), 50);
 
        }
        private menuXmlItem: Array<MenuListData>
  
        public initMenuData(value: any): void {

            for (var $key in value.info) {
                this[$key] = value.info[$key]
            }

            this.menuXmlItem = value.menuXmlItem;
            meshFunSon(this.menuXmlItem, 0)
            function meshFunSon(subMenu: Array<MenuListData>, level: number): void {
                for (var i: number = 0; subMenu&& i < subMenu.length; i++) {
                    subMenu[i].level = level;
                    meshFunSon(subMenu[i].subMenu, level + 1);

                }
            }
        }
        private skipNum: number=0
        public showMainUi(): void {
            this.clearAll();
            Pan3d.Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);
            this.showSon(this.menuXmlItem,0);
        }
        private onStageMouseUp(evt: InteractiveEvent): void {
            this.clearAll();
        }
        public showTempMenu($data: MenuListData, i: number, ty: number): LabelTxtVo {
            let temp: LabelTxtVo = super.showTemp($data) as LabelTxtVo;
            temp.ui.x = $data.level * 70;
            temp.ui.y = i * 20 + ty;
            temp.ui.addEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.addEventListener(InteractiveEvent.Down, this.onMouseUp, this);
            return temp
        }
        //清理单元内的内容并需要将对象移出显示队例
        public clearTemp($data: any): void {
            var temp: LabelTxtVo = this.getVoByData($data);
            temp.ui.removeEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.removeEventListener(InteractiveEvent.Down, this.onMouseUp, this);
            super.clearTemp($data);
        }
        private setColorByLevel(value: number): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                var menuListData: MenuListData = this._uiItem[i].rightTabInfoVo as MenuListData
                if (menuListData && menuListData.level == value) {
                    menuListData.select = false
                    this._uiItem[i].makeData()
                }
            }
        }
        private removeOtherSonMenu(level: number): void {

            for (var i: number = this._uiItem.length-1; i>=0; i--) {
                var $menuListData: MenuListData = this._uiItem[i].rightTabInfoVo as MenuListData
                if ($menuListData && $menuListData.level > level) {
                    this.clearTemp($menuListData)
                }
            }
        }
        protected butMove(evt: InteractiveEvent): void {
            var temp: LabelTxtVo = this.getVoByUi(evt.target) as LabelTxtVo;
            if (temp && temp.rightTabInfoVo) {
                var menuListData: MenuListData = temp.rightTabInfoVo
                this.setColorByLevel(menuListData.level);
                this.removeOtherSonMenu(menuListData.level);

                menuListData.select = true;
                temp.makeData();

                this.showSon(menuListData.subMenu, temp.ui.y)

                
            }
        }
        private bfun: Function
        protected onMouseUp(evt: InteractiveEvent): void {
            var temp: LabelTxtVo = this.getVoByUi(evt.target) as LabelTxtVo;
            if (temp && temp.rightTabInfoVo) {
                this.bfun(temp.rightTabInfoVo, evt)
                this.clearAll();
            }
        }
        private showSon(subMenu: Array<MenuListData>, ty: number): void {

            for (var i: number = 0; subMenu&&i < subMenu.length; i++) {
                var labelTxtVo: LabelTxtVo = this.getVoByData(subMenu[i]) as LabelTxtVo;
                if (!labelTxtVo) {
                    this.showTempMenu(subMenu[i], i,   ty);
                }
           
            }
        }

    }
}