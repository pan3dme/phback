declare module Pan3d {
    class ShadowManager {
        private static _instance;
        static getInstance(): ShadowManager;
        private _displayList;
        constructor();
        addShadow(): Shadow;
        removeShadow(sd: Shadow): void;
        update(): void;
        private getIdleShadow;
    }
}
