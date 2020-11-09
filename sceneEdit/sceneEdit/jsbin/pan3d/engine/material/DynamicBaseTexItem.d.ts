declare module Pan3d {
    class DynamicBaseTexItem {
        target: TexItem;
        paramName: string;
        textureRes: TextureRes;
        destory(): void;
        readonly texture: WebGLTexture;
    }
}
