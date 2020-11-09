declare module Pan3d {
    class TerrainDisplay3DShader extends Shader3D {
        static TerrainDisplay3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
