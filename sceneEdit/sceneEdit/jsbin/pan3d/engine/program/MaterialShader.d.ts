declare module Pan3d {
    class MaterialShader extends Shader3D {
        static MATERIAL_SHADER: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        outstr(str: string): void;
        getFragmentShaderString(): string;
    }
}
