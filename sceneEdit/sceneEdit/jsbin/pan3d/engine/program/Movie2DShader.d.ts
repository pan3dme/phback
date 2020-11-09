declare module Pan3d {
    class Movie2DShader extends Shader3D {
        static MOVIE2D_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
