declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class TextureFunPanel extends win.BaseWindow {
        protected loadConfigCom(): void;
        private e_pop_panel;
        protected tittleMouseDown(evt: InteractiveEvent): void;
        protected mouseOnTittleMove(evt: InteractiveEvent): void;
        private chatHtmlInput;
        private setInputTxtPos;
        protected butClik(evt: InteractiveEvent): void;
        resize(): void;
        private changeInputResize;
        private changeFile;
        private changeData;
        private static _instance;
        static getInstance(): TextureFunPanel;
        private layaPanel;
        private mathFunNodeUI;
        constructor();
        showPanel(value: materialui.MathFunNodeUI): void;
        hidePanel(): void;
    }
}
