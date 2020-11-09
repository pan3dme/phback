declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class ComBoBoxCtrl2D extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected comboBoxUi: ComboBoxUi;
        protected initView(): void;
        destory(): void;
        data: any;
        private comboxListTxt;
        protected comboBoxUiDown($evt: InteractiveEvent): void;
        protected selectFun(value: number): void;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}
