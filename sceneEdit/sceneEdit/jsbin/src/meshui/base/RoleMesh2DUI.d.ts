declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class RoleMesh2DUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected comboBoxUi: ComboBoxUi;
        protected deleIcon: BaseMeshUi;
        protected md5meshUrlText: TextLabelUI;
        protected md5meshPicUi: TexturePicUi;
        protected md5searchIcon: BaseMeshUi;
        protected textureUrlText: TextLabelUI;
        protected texturePicUi: TexturePicUi;
        protected texturesearchIcon: BaseMeshUi;
        private _skinMesh;
        private textureTree;
        protected initView(): void;
        protected deleIconDown($evt: InteractiveEvent): void;
        private drawInTextureUrl;
        private drawInMeshUrl;
        destory(): void;
        x: number;
        y: number;
        protected comboBoxUiDown($evt: InteractiveEvent): void;
        protected selectFun(value: number): void;
        data: any;
        private selectMeshId;
        refreshViewValue(): void;
        private _materialTreeMc;
        paramChange(item: Array<any>): void;
        private showMaterialParamUi;
        getParamItem(value: string): any;
        private makeTempInfo;
    }
}
