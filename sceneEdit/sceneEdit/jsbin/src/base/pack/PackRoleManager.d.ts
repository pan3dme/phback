declare module pack {
    import Dictionary = Pan3d.Dictionary;
    class PackRoleManager {
        private static _instance;
        static getInstance(): PackRoleManager;
        constructor();
        private dic;
        private loadDic;
        private playBfun;
        private makeBufToRole;
        private pushToBuff;
        private getFloat32ArrayByArr;
        protected getmeshBoneQPAryDic($arr: any): Dictionary;
        getRoleZzwByUrl($url: string, bfun: Function): void;
        private loadMeshArrBy;
    }
}
