declare module Pan3d {
    class GameMouseManager {
        private static _instance;
        static getInstance(): GameMouseManager;
        constructor();
        private ready;
        setBtn($a: UICompenent, $b: UICompenent): void;
        private b_yaogan_bar;
        private b_yaogan_bg;
        uiConatiner: UIVirtualContainer;
        private resetPos;
        private bindPos;
        addMouseEvent(): void;
        onMouseWheel($evt: MouseWheelEvent): void;
        useMouseEvent: boolean;
        private isCanUseMouseEvent;
        private onMouse;
        private canTestClikGroundMove;
        lastMouseEvetTime: number;
        private makeMouseEvent;
        private mouseToEvent;
        private cantClikGround;
        onSceneMouseDown($evt: InteractiveEvent): void;
        private lastMousePos;
        private onTouchStart;
        private onTouchEnd;
        private setBasePostion;
        private onTouchMove;
        private nextSendTime;
        skipNum: number;
        private _speedDirect;
        private isFristTouchMove;
        private yaoganIdentifier;
        private updataFun;
        private _lastV2dNrm;
        updata(t: number): void;
        private getMouseDownPos;
    }
}
