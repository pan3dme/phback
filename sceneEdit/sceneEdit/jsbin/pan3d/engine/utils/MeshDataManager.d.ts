declare module Pan3d {
    class MeshDataManager extends ResGC {
        private _loadDic;
        constructor();
        private static _instance;
        static getInstance(): MeshDataManager;
        getMeshDataByLocalUrl($url: string): any;
        getMeshData($url: string, $fun: Function, $batchNum?: number): void;
        private roleResCom;
        gc(): void;
        readData(byte: any, $batchNum: any, $url: any, $version: any): SkinMesh;
        private readBindPosByte;
        readMesh2OneBuffer(byte: Pan3dByteArray, meshData: MeshData): void;
        private uploadMesh;
        uploadPbrMesh($mesh: MeshData, $useNormal: boolean): void;
        preLoad($url: string): void;
    }
}
