declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class RoleAnimi2DUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected comboBoxUi: ComboBoxUi;
        protected deleIcon: BaseMeshUi;
        protected md5animUrlText: TextLabelUI;
        protected md5animPicUi: TexturePicUi;
        protected md5searchIcon: BaseMeshUi;
        private _animDic;
        protected initView(): void;
        protected md5searchIconClik(evt: InteractiveEvent): void;
        private drawInAnimUrl;
        protected deleIconDown($evt: InteractiveEvent): void;
        private getObjKeyLen;
        destory(): void;
        x: number;
        y: number;
        protected comboBoxUiDown($evt: InteractiveEvent): void;
        protected selectFun(value: number): void;
        refreshViewValue(): void;
    }
}
