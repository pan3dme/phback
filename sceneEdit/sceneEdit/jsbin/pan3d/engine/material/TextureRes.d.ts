declare module Pan3d {
    class TextureRes extends ResCount {
        texture: WebGLTexture;
        width: number;
        height: number;
        destory(): void;
    }
}
