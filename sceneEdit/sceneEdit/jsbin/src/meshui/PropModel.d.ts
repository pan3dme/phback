declare module prop {
    class PropModel {
        private static _instance;
        static getInstance(): PropModel;
        resize(): void;
        constructor();
        propPanle: UiMeshSprite;
        private metaDataView;
        private lastNodel;
        hidePanel(): void;
        showTextureUiPanel($ui: materialui.BaseMaterialNodeUI): void;
        private clearOladMeshView;
        showOtherMeshView(value: MetaDataView): void;
    }
}
