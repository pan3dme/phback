declare module Pan3d {
    class FrameCompenent extends UICompenent {
        constructor();
        setFrameData($rect: UIRectangle): void;
        applyRenderSize(): void;
        getSkinCtxRect(): Rectangle;
        drawToCtx($uiAtlas: UIAtlas, $ctx: CanvasRenderingContext2D): void;
        private _frameData;
        private isTrue;
        current: number;
        totalcurrent: number;
        speed: number;
        endFlag: boolean;
        update(): void;
        goToAndPlay($num: number): void;
        goToAndStop($num: number): void;
        Invisible(): void;
        play(): void;
        stopEnd(): void;
        stopStatic: number;
        speedNum: number;
    }
}
