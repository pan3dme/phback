declare module Pan3d {
    interface IBind {
        getSocket(socketName: String, resultMatrix: Matrix3D): void;
    }
    interface IMulBind {
        getMulSocket(ary: Array<Vector3D>): void;
    }
}
