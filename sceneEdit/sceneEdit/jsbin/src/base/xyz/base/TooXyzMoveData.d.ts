declare module xyz {
    import Matrix3D = Pan3d.Matrix3D;
    import Display3D = Pan3d.Display3D;
    class TooXyzPosData {
        id: number;
        type: number;
        oldx: number;
        oldy: number;
        oldz: number;
        oldangle_x: number;
        oldangle_y: number;
        oldangle_z: number;
        oldscale_x: number;
        oldscale_y: number;
        oldscale_z: number;
        x: number;
        y: number;
        z: number;
        scaleX: number;
        scaleY: number;
        scaleZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
        baseMatrix3D: Matrix3D;
        changeModelMatrix3d(): void;
        updateMatrix(): void;
        modeMatrx3D: Matrix3D;
        dataItem: Array<TooXyzPosData>;
        spriteItem: Array<Display3D>;
        dataChangeFun: Function;
        dataUpDate: Function;
        static getTemapXyzPosData(_id: number, _x: number, _y: number, _z: number): TooXyzPosData;
        getEulerAngles(quat: any): Array<number>;
        upRootMatrix3DToItem(): void;
        static getBase($arr: Array<Display3D>, isCenten?: boolean): TooXyzPosData;
    }
}
