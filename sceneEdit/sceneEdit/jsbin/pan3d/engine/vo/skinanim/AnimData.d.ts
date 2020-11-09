declare module Pan3d {
    class DualQuatFloat32Array {
        quat: Float32Array;
        pos: Float32Array;
    }
    class AnimData {
        inLoop: number;
        inter: Array<number>;
        bounds: Array<Vector3D>;
        nameHeight: number;
        posAry: Array<Vector3D>;
        matrixAry: Array<Array<Matrix3D>>;
        boneQPAry: Array<Array<DualQuatFloat32Array>>;
        hasProcess: boolean;
        processMesh($skinMesh: SkinMesh): void;
        meshBoneQPAryDic: Dictionary;
        private makeArrBoneQPAry;
        getBoneQPAryByMesh($mesh: MeshData): Array<Array<DualQuatFloat32Array>>;
        private conleMatrixArr;
        private makeFrameDualQuatFloatArray;
    }
}
