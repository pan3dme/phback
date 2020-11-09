declare module materialui {
    class MaterialTreeManager {
        private static _instance;
        static getInstance(): MaterialTreeManager;
        getMaterial($url: String, $fun: Function): void;
    }
}
