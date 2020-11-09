declare module prop {
    class AgalFunUI extends BaseReflComponent {
        private textLabelUI;
        private textFunNameUI;
        protected initView(): void;
        destory(): void;
        data: any;
        private onChangeInput;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}
