declare module left {
    import Display3DSprite = Pan3d.Display3DSprite;
    import Material = Pan3d.Material;
    import MaterialBaseParam = Pan3d.MaterialBaseParam;
    class MaterialModelSprite extends Display3DSprite {
        constructor();
        setMaterialVc($material: Material, $mp?: MaterialBaseParam): void;
        setMaterialTexture($material: Material, $mp?: MaterialBaseParam): void;
        setMaterialVaIndependent(): void;
        protected setBaseMaterialVc($material: Material): void;
        readTxtToModel($str: string): void;
        private readonly isTextureLoadFinish;
        update(): void;
    }
}
