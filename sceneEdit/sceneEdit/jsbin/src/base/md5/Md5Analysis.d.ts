declare module md5list {
    class Md5Analysis {
        constructor();
        addMesh(str: string): Md5MeshData;
        joinJoints(meshData: Md5MeshData): void;
        private joinUV;
        private joinPoint;
        joinTri(meshData: Md5MeshData): void;
        private genewStr;
    }
}
