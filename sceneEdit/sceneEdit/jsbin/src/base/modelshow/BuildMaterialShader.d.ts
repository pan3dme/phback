declare module left {
    import MaterialShader = Pan3d.MaterialShader;
    class BuildMaterialShader extends MaterialShader {
        static BuildMaterialShader: string;
        constructor();
        buildParamAry($material: materialui.MaterialTree): void;
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
    }
}
