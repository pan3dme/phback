declare module Pan3d {
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor($x?: number, $y?: number, $width?: number, $height?: number);
        clone(): Rectangle;
        sets($x: number, $y: any, $width: number, $height: any): void;
        setRec($rec: Rectangle): void;
        isHitByPoint(tx: number, ty: number): boolean;
    }
}
