declare module Pan3d {
    class LineDisplaySprite extends Display3D {
        constructor();
        lineVecPos: Array<number>;
        lineColor: Array<number>;
        lineIndex: Array<number>;
        baseColor: Vector3D;
        makeLineMode(a: Vector3D, b: Vector3D, $color?: Vector3D): void;
        clear(): void;
        upToGpu(): void;
        update(): void;
    }
    class MulLineSprite extends LineDisplaySprite {
        constructor();
        private itemSprite;
        makeLineMode(a: Vector3D, b: Vector3D, $color?: Vector3D): void;
        private getSprite;
        update(): void;
        upToGpu(): void;
        clear(): void;
    }
    class GridLineSprite extends LineDisplaySprite {
        constructor();
        private makeGridData;
    }
}
