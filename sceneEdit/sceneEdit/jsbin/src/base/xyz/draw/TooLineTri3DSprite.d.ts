declare module xyz {
    import Shader3D = Pan3d.Shader3D;
    import Display3D = Pan3d.Display3D;
    class TooLineTri3DShader extends Shader3D {
        static TooLineTri3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class TooLineTri3DSprite extends Display3D {
        constructor();
        protected initData(): void;
        private makeBoxObjdata;
        private makeBoxTampData;
        upToGpu(): void;
        update(): void;
    }
}
