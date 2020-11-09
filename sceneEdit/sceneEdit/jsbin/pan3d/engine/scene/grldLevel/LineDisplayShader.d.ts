declare module Pan3d {
    class LineDisplayShader extends Shader3D {
        static LineShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
