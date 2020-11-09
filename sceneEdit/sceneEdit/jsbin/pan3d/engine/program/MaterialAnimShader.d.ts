declare module Pan3d {
    class MaterialAnimShader extends Shader3D {
        static MATERIAL_ANIM_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        static getMd5M44Str(): string;
        static getMd5M44NrmStr(): string;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
}
