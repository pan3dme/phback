declare module pack {
    import RoleRes = Pan3d.RoleRes;
    import SkinMesh = Pan3d.SkinMesh;
    import Pan3dByteArray = Pan3d.Pan3dByteArray;
    import MeshData = Pan3d.MeshData;
    import MeshDataManager = Pan3d.MeshDataManager;
    class MeshDataChangeManager extends MeshDataManager {
        readData(byte: any, $batchNum: any, $url: any, $version: any): SkinMesh;
        readMesh2OneBuffer(byte: Pan3dByteArray, meshData: MeshData): void;
        private readChangeBuff;
        readBytes2ArrayBuffer($byte: Pan3dByteArray, $data: DataView, $dataWidth: number, $offset: number, $stride: number, $readType?: number): void;
    }
    class RoleChangeRes extends RoleRes {
        meshDataChangeManager: MeshDataChangeManager;
        constructor();
        protected readNext(): void;
        readMesh(): void;
    }
    class RoleChangeModel {
        private static _instance;
        static getInstance(): RoleChangeModel;
        private materialRoleSprite;
        private changeRoleModel;
        loadLocalFile(arrayBuffer: ArrayBuffer, roleDis: left.MaterialRoleSprite): void;
        makeBufToRole(meshData: MeshData): void;
        private pushToBuff;
        private makeMeshData;
        private meshAnimDic;
        getChangeRoleStr(): string;
        private getFloat32ArrayByArr;
        private getmeshBoneQPAryDic;
        private loatMaterialTree;
        private loadWebRole;
    }
}
