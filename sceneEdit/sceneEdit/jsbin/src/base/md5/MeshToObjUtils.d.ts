declare module md5list {
    import MeshData = Pan3d.MeshData;
    import ObjectBone = Pan3d.ObjectBone;
    class MeshToObjUtils {
        getObj(mesh: Md5MeshData): MeshData;
        private getW;
        processBoneNew(targetAry: Array<ObjectBone>): Array<ObjectBone>;
        static getStorNewTargerArr(targetAry: Array<ObjectBone>): Array<ObjectBone>;
    }
}
