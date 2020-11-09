declare module scene2d_me {
    class CanvasPostionModel {
        private static _instance;
        static getInstance(): CanvasPostionModel;
        constructor();
        initSceneFocueEvent(): void;
        private lastPostionV2d;
        private _lastMousePos;
        private _isMouseDown;
        private onMouseMove;
        private onMouseDown;
        private onMouseUp;
        tureMoveV2d: Pan3d.Vector2D;
        resetSize(): void;
    }
}
