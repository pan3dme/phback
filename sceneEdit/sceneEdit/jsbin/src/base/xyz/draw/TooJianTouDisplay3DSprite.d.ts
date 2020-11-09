declare module xyz {
    import Shader3D = Pan3d.Shader3D;
    import Display3D = Pan3d.Display3D;
    class TooJianTouDisplay3DShader extends Shader3D {
        static TooJianTouDisplay3DShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class TooJianTouDisplay3DSprite extends Display3D {
        constructor();
        protected initData(): void;
        private makeObjData;
        upToGpu(): void;
        colorVect: Vector3D;
        update(): void;
    }
}
