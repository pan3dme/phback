declare module xyz {
    import Display3D = Pan3d.Display3D;
    class TooBaseModelLevel extends Display3D {
        parent: MoveScaleRotationLevel;
        constructor(value: MoveScaleRotationLevel);
        isHit(mouseVect2d: Vector2D): void;
        selectId: number;
        onMouseDown(mouseVect2d: Vector2D): void;
        onMouseUp(mouseVect2d: Vector2D): void;
        onMouseMove(mouseVect2d: Vector2D): void;
        testHitTemp(display3D: any, v2d: Vector2D, vec: Array<Vector3D>): void;
        update(): void;
    }
}
