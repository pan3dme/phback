declare module Pan3d {
    class Display3dBg extends Display3D {
        protected texture: WebGLTexture;
        constructor();
        private _width;
        private _height;
        private _wScale;
        private _hScale;
        private _scaleData;
        protected initData(): void;
        resize(): void;
        setImgInfo($url: string, $width: number, $height: number): void;
        setImgUrl($url: string): void;
        appleyPos(): void;
        update(): void;
    }
}
