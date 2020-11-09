declare module Pan3d {
    class Circle {
        _x: number;
        _y: number;
        radius: number;
        constructor($x?: number, $y?: number, $radius?: number);
        setData($x: number, $y: number, $radius: number): void;
        setPos($x: number, $y: number): void;
        x: number;
        y: number;
        setRadius($radius: number): void;
        testPoint($point: Vector2D): boolean;
    }
}
