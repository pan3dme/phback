declare module Pan3d {
    class Sprite2DShader extends Shader3D {
        static SPRITE2D_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
