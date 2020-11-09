declare module prop {
    class CheckBox2DUI extends BaseReflComponent {
        private boxIcon;
        private textLabelUI;
        protected initView(): void;
        private clikMouseUp;
        destory(): void;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}
