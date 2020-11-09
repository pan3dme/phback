declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class Texturue2DUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected textureUrlText: TextLabelUI;
        protected texturePicUi: TexturePicUi;
        protected searchIcon: BaseMeshUi;
        protected initView(): void;
        protected searchClik(evt: InteractiveEvent): void;
        protected searchFileByPath(value: string): void;
        private getPerentPath;
        private onChangePicurl;
        private makeNewTextureByFile;
        destory(): void;
        data: any;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
        private _suffix;
        suffix: string;
    }
}
