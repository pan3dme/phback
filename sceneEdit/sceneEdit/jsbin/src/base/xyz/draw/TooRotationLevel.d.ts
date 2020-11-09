declare module xyz {
    class TooRotationLevel extends TooBaseModelLevel {
        private _roundA;
        private _roundB;
        private _roundC;
        constructor(value: MoveScaleRotationLevel);
        isHit(mouseVect2d: Vector2D): void;
        onMouseDown(mouseVect2d: Vector2D): void;
        private showYaix;
        private _linePosinA;
        private _linePosinB;
        onMouseUp(mouseVect2d: Vector2D): void;
        private lastDis;
        private testInfo;
        onMouseMove(mouseVect2d: Vector2D): boolean;
        update(): void;
    }
}
