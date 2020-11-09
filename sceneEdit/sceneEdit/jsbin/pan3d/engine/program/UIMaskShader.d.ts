declare module Pan3d {
    class UIMaskShader extends Shader3D {
        static UI_MASK_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
