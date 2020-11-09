declare module pack {
    class PackObjDataManager {
        private static _instance;
        static getInstance(): PackObjDataManager;
        private dic;
        private loadDic;
        getObjDataByUrl($url: string, bfun: Function): void;
        readTxtToModel($str: string): ObjData;
    }
}
