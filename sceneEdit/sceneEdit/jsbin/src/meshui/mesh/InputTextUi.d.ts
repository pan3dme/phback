declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class InputTextUi extends TextLabelUI {
        constructor(w?: number, h?: number);
        private onHtmlInputMouseDown;
        protected initView(): void;
        destory(): void;
        private chatHtmlInput;
        private setInputTxtPos;
        private changeInputTxt;
        resize(): void;
        visible: boolean;
        text: string;
        private onHtmlInputMouseDownFun;
        protected butClik(evt: InteractiveEvent): void;
    }
}
