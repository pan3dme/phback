declare module Pan3d {
    class DynamicConstItem extends DynamicBaseConstItem {
        curve: Curve;
        update(t?: number): void;
        type: number;
    }
}
