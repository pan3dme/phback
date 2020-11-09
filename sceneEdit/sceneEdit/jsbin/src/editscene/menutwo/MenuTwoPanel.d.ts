declare module menutwo {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    class MenuListData {
        label: string;
        level: number;
        subMenu: Array<MenuListData>;
        select: boolean;
        key: string;
        constructor($label: string, $key?: string);
    }
    class LabelTxtVo extends Disp2DBaseText {
        makeData(): void;
    }
    class MenuTwoPanel extends Dis2DUIContianerPanel {
        constructor();
        private menuXmlItem;
        initMenuData(value: any): void;
        private skipNum;
        showMainUi(): void;
        private onStageMouseUp;
        showTempMenu($data: MenuListData, i: number, ty: number): LabelTxtVo;
        clearTemp($data: any): void;
        private setColorByLevel;
        private removeOtherSonMenu;
        protected butMove(evt: InteractiveEvent): void;
        private bfun;
        protected onMouseUp(evt: InteractiveEvent): void;
        private showSon;
    }
}
