declare module Pan3d {
    class BaseDiplay3dShader extends Shader3D {
        static BaseDiplay3dShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class BaseDiplay3dSprite extends Display3D {
        constructor();
        protected initData(): void;
        private loadTexture;
        _uvTextureRes: TextureRes;
        upToGpu(): void;
        update(): void;
    }
}
