declare module Pan3d {
    class FrameUIRender extends UIRenderComponent {
        constructor();
        setImg(url: string, wNum: number, hNum: number, fun: Function, num?: number): void;
        update(): void;
        getFrameTipComponent(wNum: number, hNum: number): FrameTipCompenent;
    }
    class FrameTipCompenent extends FrameCompenent {
        constructor();
        playOne($container: UIConatiner): void;
        updateEnd(): void;
    }
}
