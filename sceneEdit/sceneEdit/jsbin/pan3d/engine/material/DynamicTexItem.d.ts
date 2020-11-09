declare module Pan3d {
    class DynamicTexItem extends DynamicBaseTexItem {
        url: string;
        private _textureDynamic;
        isParticleColor: boolean;
        curve: Curve;
        private _life;
        constructor();
        destory(): void;
        initCurve($type: number): void;
        readonly texture: WebGLTexture;
        creatTextureByCurve(): void;
        life: number;
    }
}
