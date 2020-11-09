declare module Pan3d {
    class MeshData extends ObjData {
        boneIDAry: Array<number>;
        boneWeightAry: Array<number>;
        boneWeightBuffer: WebGLBuffer;
        boneIdBuffer: WebGLBuffer;
        boneNewIDAry: Array<number>;
        materialUrl: string;
        materialParamData: Array<any>;
        materialParam: MaterialBaseParam;
        material: Material;
        particleAry: Array<BindParticle>;
        uid: number;
        boneIDOffsets: number;
        boneWeightOffsets: number;
        bindPosAry: Array<any>;
        bindPosMatrixAry: Array<Matrix3D>;
        bindPosInvertMatrixAry: Array<Matrix3D>;
        getBindPosMatrix(): void;
        clone(): MeshData;
        destory(): void;
    }
    class BindParticle {
        url: string;
        socketName: string;
        constructor($url: string, $socketName: string);
    }
}
