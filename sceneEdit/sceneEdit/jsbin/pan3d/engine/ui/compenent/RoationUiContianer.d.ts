declare module Pan3d {
    class RoationUIShader extends Shader3D {
        static RoationUiShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
