declare module LayaPan3D {
    import Shader3D = Pan3d.Shader3D;
    import TextureRes = Pan3d.TextureRes;
    class LayaScene2dPicShader extends Shader3D {
        static LayaScene2dPicShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class LayaScene2dPicSprit extends Pan3d.Display3D {
        constructor(value?: string);
        private static objdata2D;
        protected initData(): void;
        width: number;
        height: number;
        updateMatrix(): void;
        set2dPos($x: number, $y: number): void;
        private loadTextureByUrl;
        _uvTextureRes: TextureRes;
        upToGpu(): void;
        imgRectInfo: Array<number>;
        update(): void;
    }
    class LayaScene2dSceneChar extends layapan_me.LayaSceneChar {
        private posv2;
        set2dPos($x: number, $y: number): void;
        addStage(): void;
    }
    class LayaScene2D extends Laya3dSprite {
        rootpos: Vector2D;
        readonly scene2dScale: number;
        protected initScene(): void;
        upData(): void;
        protected getMousePos(tx: number, ty: number): Vector2D;
        getPos3dBy2D($x: number, $y: number): Vector3D;
        protected renderToTexture(): void;
    }
}
