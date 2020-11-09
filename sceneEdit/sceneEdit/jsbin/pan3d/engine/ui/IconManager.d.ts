declare module Pan3d {
    class IconManager {
        private static _instance;
        static getInstance(): IconManager;
        private _dic;
        private _loadDic;
        constructor();
    }
}
