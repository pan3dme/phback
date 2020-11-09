declare module scenedis.me {
    class SceneMouseEventModel {
        private static _instance;
        static getInstance(): SceneMouseEventModel;
        constructor();
        initSceneFocueEvent(): void;
        onMouseWheel($evt: MouseWheelEvent): void;
        private lastRotationY;
        private lastRotationX;
        private _lastMousePos;
        private _isMouseDown;
        private onMouseMove;
        private onMouseDown;
        private onMouseUp;
    }
}
