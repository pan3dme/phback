declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class TexturePicUi extends BaseMeshUi {
        constructor(w?: number, h?: number);
        protected initView(): void;
        protected addEvets(): void;
        private dragDrop;
        private dragEnter;
        private $dulbelClikTm;
        private _inputHtmlSprite;
        suffix: string;
        haveDoubleCilk: boolean;
        protected butClik(evt: InteractiveEvent): void;
        protected doubleClick(): void;
        private testSuffix;
        private changeFile;
        url: string;
        protected _url: string;
    }
}
