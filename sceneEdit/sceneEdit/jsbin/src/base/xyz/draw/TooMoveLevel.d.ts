declare module xyz {
    class TooMoveLevel extends TooBaseModelLevel {
        private _boxA;
        private _boxB;
        private _boxC;
        private _lineA;
        private _lineB;
        private _lineC;
        constructor(value: MoveScaleRotationLevel);
        isHit(mouseVect2d: Vector2D): void;
        onMouseDown(mouseVect2d: Vector2D): void;
        private lastMatrix3d;
        private pointItem;
        onMouseUp(mouseVect2d: Vector2D): void;
        private getMouseHitPanelPos;
        private lastMousePosV3d;
        onMouseMove(mouseVect2d: Vector2D): boolean;
        private getMouseHitPos;
        update(): void;
    }
}
