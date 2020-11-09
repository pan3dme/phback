declare module xyz {
    import Object3D = Pan3d.Object3D;
    import Vector3D = Pan3d.Vector3D;
    class TooObjectHitBox extends Object3D {
        beginx: number;
        beginy: number;
        beginz: number;
        endx: number;
        endy: number;
        endz: number;
        id: number;
        pointVec: Array<Vector3D>;
        constructor($x?: number, $y?: number, $z?: number);
    }
}
