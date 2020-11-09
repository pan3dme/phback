declare module pack {
    class PackSkillManager {
        private static _instance;
        static getInstance(): PackSkillManager;
        private dic;
        private loadDic;
        private playBfun;
        getPrefabByUrl($url: string, bfun: Function): void;
    }
}
