declare module Pan3d {
    class UIImageShader extends Shader3D {
        static UI_IMG_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
