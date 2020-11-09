declare module editscene {
    class ChangeNameModel {
        private static _instance;
        static getInstance(): ChangeNameModel;
        constructor();
        private chatHtmlInput;
        private _chatHtmlInput;
        private setInputTxtPos;
        private changFun;
        private changeInputTxt;
        private onMouseDownFun;
        getTextMetrics($str: string, fontsize?: number): TextMetrics;
        private changeBfun;
        changeName(rect: Pan3d.Rectangle, str: string, bfun: Function): void;
        private onMouseDown;
    }
}
