declare module Pan3d {
    class UIBackImg extends UIRenderComponent {
        constructor();
        private _width;
        private _height;
        private _wScale;
        private _hScale;
        private _scaleData;
        private _isFBO;
        alpha: number;
        protected initData(): void;
        resize(): void;
        setImgInfo($url: string, $width: number, $height: number): void;
        appleyPos(): void;
        setFbo(): void;
        update(): void;
        interactiveEvent($e: InteractiveEvent): boolean;
    }
    class UIRenderOnlyPicComponent extends UIRenderComponent {
        constructor();
        makeRenderDataVc($vcId: number): void;
        update(): void;
        protected setTextureToGpu(): void;
        dispose(): void;
    }
}
