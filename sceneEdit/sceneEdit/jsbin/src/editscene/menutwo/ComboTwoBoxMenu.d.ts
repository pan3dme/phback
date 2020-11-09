declare module menutwo {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    class ComboTwoBoxMenu extends Dis2DUIContianerPanel {
        constructor();
        private _comboxData;
        private _comBoxFun;
        showComboBoxList($comboxData: Array<any>, $comBoxFun: Function): void;
        showTempMenu($data: MenuListData, i: number): LabelTxtVo;
        protected butMove(evt: InteractiveEvent): void;
        private setColorByLevel;
        clearAll(): void;
        clearTemp($data: any): void;
        protected onMouseUp(evt: InteractiveEvent): void;
    }
}
