declare module win {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Vector2D = Pan3d.Vector2D;
    class LayUIManager {
        private _uiList;
        _containerList: Array<UIConatiner>;
        readonly uiList: Array<UIRenderComponent>;
        constructor();
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
        private lastTime;
    }
}
