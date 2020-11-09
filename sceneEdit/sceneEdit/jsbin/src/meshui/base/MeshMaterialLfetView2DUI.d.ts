declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import MaterialBaseParam = Pan3d.MaterialBaseParam;
    import Material = Pan3d.Material;
    class LaterOtherDiplay3dSprite extends left.MaterialModelSprite {
        outTexture: WebGLTexture;
        setMaterialTexture($material: Material, $mp?: MaterialBaseParam): void;
        maketRectMaterial(temp: materialui.MaterialTree): void;
        makeRectObjData(): void;
    }
    class MeshMaterialLfetView2DUI extends MeshSceneView2DUI {
        private iconItem;
        protected initView(): void;
        protected butClik(evt: InteractiveEvent): void;
        x: number;
        resize(): void;
        destory(): void;
        protected texturePicUiChange($evt: ReflectionEvet): void;
        private defFileUrl;
        private refrishShowMaterialModel;
        private latersceneManager;
        protected initScene(): void;
        private ktvSprite;
        private setZzwUrlToRole;
        protected oneByFrame(): void;
        width: number;
        constructor(value: UiMeshSprite);
        private lastObjUrl;
        private setObjUrlToSprite;
        private modelSprite;
        private roleSprite;
        refreshViewValue(): void;
    }
}
