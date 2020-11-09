declare module Pan3d {
    class MaterialBatchAnimShader extends Shader3D {
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
