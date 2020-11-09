declare module left {
    import MaterialAnimShader = Pan3d.MaterialAnimShader;
    class RoleMaterialShader extends MaterialAnimShader {
        static RoleMaterialShader: string;
        constructor();
        buildParamAry($material: materialui.MaterialTree): void;
        binLocation($context: WebGLRenderingContext): void;
        static getMd5M44Str(): string;
        static getMd5M44NrmStr(): string;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
