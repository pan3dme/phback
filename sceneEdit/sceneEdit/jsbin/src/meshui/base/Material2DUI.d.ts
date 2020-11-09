declare module prop {
    class Material2DUI extends Texturue2DUI {
        private textureTree;
        protected initView(): void;
        destory(): void;
        data: any;
        refreshViewValue(): void;
        private _materialTreeMc;
        paramChange(item: Array<any>): void;
        private showMaterialParamUi;
        resize(): void;
        protected searchClik(evt: Pan3d.InteractiveEvent): void;
        private makeTempInfo;
    }
}
