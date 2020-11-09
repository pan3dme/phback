module menutwo {
    import UIRenderComponent = Pan3d.UIRenderComponent
    import FrameCompenent = Pan3d.FrameCompenent
    import InteractiveEvent = Pan3d.InteractiveEvent
    import Scene_data = Pan3d.Scene_data
    import UICompenent = Pan3d.UICompenent
    import Rectangle = Pan3d.Rectangle
    import TextAlign = Pan3d.TextAlign
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import ColorType = Pan3d.ColorType
    import UIPanel = win.UIPanel
    import UIAtlas = Pan3d.UIAtlas
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel


 

    export class ComboTwoBoxMenu extends Dis2DUIContianerPanel {

        public constructor() {
            super(LabelTxtVo, new Rectangle(0, 0, 70, 20), 20);

        }
    
        private _comboxData: Array<any>;
        private _comBoxFun: Function
        public showComboBoxList($comboxData: Array<any>, $comBoxFun: Function): void {
            this._comboxData = $comboxData
            this._comBoxFun = $comBoxFun

            this.clearAll();
            for (var i: number = 0; i < this._comboxData.length; i++) {
               // console.log(this._comboxData)
                var vo: MenuListData = new MenuListData(String(this._comboxData[i].name), String(this._comboxData[i].type))
                this.showTempMenu(vo,i)
        
            }

        }
        public showTempMenu($data: MenuListData, i: number): LabelTxtVo {
            let temp: LabelTxtVo = super.showTemp($data) as LabelTxtVo;
            temp.ui.x =0
            temp.ui.y = i*20
            temp.ui.addEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            return temp
        }
        protected butMove(evt: InteractiveEvent): void {
            var temp: LabelTxtVo = this.getVoByUi(evt.target) as LabelTxtVo;
            if (temp && temp.rightTabInfoVo) {
                var menuListData: MenuListData = temp.rightTabInfoVo
                this.setColorByLevel(menuListData.level);
     
                menuListData.select = true;
                temp.makeData();
 


            }
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
        public clearAll(): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo) {
                    this.clearTemp(this._uiItem[i].rightTabInfoVo)
                }
            }
        }
        //清理单元内的内容并需要将对象移出显示队例
        public clearTemp($data: any): void {
            var temp: LabelTxtVo = this.getVoByData($data);
            temp.ui.removeEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.removeEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            super.clearTemp($data);
        }
        protected onMouseUp(evt: InteractiveEvent): void {
            var temp: LabelTxtVo = this.getVoByUi(evt.target) as LabelTxtVo;
            if (temp && temp.rightTabInfoVo) {
                // console.log(temp.data, evt)
                this._comBoxFun(Number(temp.rightTabInfoVo.key))
                this.clearAll();
            }
        }
 
  
    }
}