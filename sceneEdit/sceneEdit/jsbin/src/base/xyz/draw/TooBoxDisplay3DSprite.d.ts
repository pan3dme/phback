declare module xyz {
    import Shader3D = Pan3d.Shader3D;
    import Display3D = Pan3d.Display3D;
    class TooBoxDisplay3DShader extends Shader3D {
        static TooBoxDisplay3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class TooBoxDisplay3DSprite extends Display3D {
        constructor();
        protected initData(): void;
        private makeBoxTampData;
        upToGpu(): void;
        colorVect: Vector3D;
        update(): void;
    }
}
