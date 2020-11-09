declare module materialui {
    import UICompenent = Pan3d.UICompenent;
    import UIConatiner = Pan3d.UIConatiner;
    class TextureContext extends UIConatiner {
        private _bRender;
        private tempUiName;
        ui: UICompenent;
        uiViewScale: number;
        constructor(w: number, h: number);
    }
    class MaterialCavasPanel extends win.BaseWindow {
        private blakCavansRender;
        constructor();
        private linesSmailRender;
        private getTempLineUi;
        private lineBigRender;
        private lineItemBigA;
        private lineItemBigB;
        private getTempBigLineUi;
        private drawOutColor;
        private tempListBg;
        private lineItemA;
        private lineItemB;
        protected loadConfigCom(): void;
        resize(): void;
        private moveLineA;
        private moveLineB;
        private movelineItemBigA;
        private movelineItemBigB;
    }
}
