declare module Pan3d {
    class UiTweenVo {
        private _ui;
        private _scale;
        private _baseRect;
        ui: UICompenent;
        scale: number;
        destory(): void;
        private static baseUIConatiner;
        static getPosByPanel($v2d: Vector2D, $layout?: any, $toUIConatiner?: UIConatiner): Vector2D;
    }
    class UiTweenScale {
        private static _instance;
        static getInstance(): UiTweenScale;
        constructor();
        private _uiTweenVo;
        changeButSize($ui: any): void;
        private changeButScale;
        private changeButEnd;
    }
    class UIManager {
        static cando: boolean;
        static popClikNameFun: Function;
        private static _instance;
        static getInstance(): UIManager;
        static uiClikName($name: string, $id: number): void;
        private _uiList;
        _containerList: Array<UIConatiner>;
        private _ctx;
        private _canvas;
        constructor();
        getContext2D($width: number, $height: number, alianDefault?: boolean): CanvasRenderingContext2D;
        getGrayImageDatabyImg($img: any): ImageData;
        makeCtxToGray($ctx: CanvasRenderingContext2D, $rect: Rectangle): void;
        showCanvas($x?: number, $y?: number): void;
        init(): void;
        addUI($ui: UIRenderComponent): void;
        removeUI($ui: UIRenderComponent): void;
        addUIContainer($container: UIConatiner): void;
        removeAll(): void;
        removeUIContainer($container: UIConatiner): void;
        hasWindowUI(): boolean;
        removeNoInterfaceUI(): void;
        resize(): void;
        upBgGroundZero(): void;
        update(): void;
        regEvent($touce: any): void;
        private onTouch;
        private onMouse;
        private lastSwipeDis;
        private lastSwipeRot;
        interactiveEvent($e: any): void;
        private lastMousePos;
        disMoveNnum(v2d: Vector2D, $num: number): boolean;
        mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean;
        private _eventItem;
        private setUseMouseEventCon;
        getObjectsUnderPoint(evt: Vector2D): UICompenent;
        private getcurrentList;
        private lastTime;
    }
}
