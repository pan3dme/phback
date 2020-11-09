declare module Pan3d {
    class BuildShader extends Shader3D {
        static buildShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
