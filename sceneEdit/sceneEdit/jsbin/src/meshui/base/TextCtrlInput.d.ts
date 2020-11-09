declare module prop {
    class TextCtrlInput extends BaseReflComponent {
        private textLabelUI;
        private inputTextUi;
        protected initView(): void;
        destory(): void;
        visible: boolean;
        data: any;
        private onChangeInput;
        refreshViewValue(): void;
        getNumStr(num: number): string;
        x: number;
        y: number;
        label: string;
    }
}
