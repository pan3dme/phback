declare module md5list {
    import Vector3D = Pan3d.Vector3D;
    import MeshData = Pan3d.MeshData;
    import Dictionary = Pan3d.Dictionary;
    import ObjectBone = Pan3d.ObjectBone;
    class ObjectTri {
        id: number;
        t0: number;
        t1: number;
        t2: number;
        constructor();
    }
    class ObjectWeight {
        x: number;
        y: number;
        z: number;
        w: number;
        weight: number;
        boneId: number;
        id: number;
        constructor();
        clone(): ObjectWeight;
    }
    class ObjectUv {
        x: number;
        y: number;
        z: number;
        a: number;
        b: number;
        w: number;
        id: number;
        constructor();
    }
    class MeshItem {
        verts: Vector3D;
        normal: Vector3D;
        uvInfo: ObjectUv;
        num: number;
    }
    class Md5MeshData extends MeshData {
        mesh: Dictionary;
        triItem: Array<ObjectTri>;
        weightItem: Array<ObjectWeight>;
        uvItem: Array<ObjectUv>;
        boneItem: Array<ObjectBone>;
        faceNum: number;
        dataAry: Array<number>;
        uvArray: Array<number>;
        boneWeightAry: Array<number>;
        bonetIDAry: Array<number>;
        indexAry: Array<number>;
    }
    class MeshImportSort {
        processMesh(meshData: Md5MeshData): void;
        beginKey: number;
        bindWidth: number;
        private processForAgal;
        uplodToGpu(meshData: MeshData, uvArray: Array<number>, ary3: Array<Array<number>>, boneWeightAry: Array<number>, bonetIDAry: Array<number>, indexAry: Array<number>): void;
        private getboneNum;
        /**
     * 返回映射关系列表
     * @param targetAry
     * @return
     *
     */
        private getMapValue;
    }
}
