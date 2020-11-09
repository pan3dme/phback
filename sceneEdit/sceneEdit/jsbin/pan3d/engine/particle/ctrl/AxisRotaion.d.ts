declare module Pan3d {
    class AxisRotaion extends BaseAnim {
        axis: Vector3D;
        axisPos: Vector3D;
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
    }
}
