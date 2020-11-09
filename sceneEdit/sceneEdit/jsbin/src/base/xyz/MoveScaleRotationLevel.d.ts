declare module xyz {
    import Display3D = Pan3d.Display3D;
    class MoveScaleRotationLevel extends Display3D {
        private _tooMoveLevel;
        private _tooRotationLevel;
        private _tooScaleLevel;
        _statceType: number;
        constructor();
        lookLenToFocu: number;
        update(): void;
        addStage(): void;
        dataUpDate(): void;
        private _xyzMoveData;
        xyzMoveData: TooXyzPosData;
        onMouseMove($e: MouseEvent): void;
        private upChange;
        onMouseUp($e: MouseEvent): void;
        onMouseDown($e: MouseEvent): void;
    }
}
