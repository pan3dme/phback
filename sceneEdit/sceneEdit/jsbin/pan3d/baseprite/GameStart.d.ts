declare module Pan3d {
    class GameStart {
        /**是否是外网 */
        static outNet: boolean;
        static GM: boolean;
        static ready: boolean;
        dataReady: boolean;
        uiReadyNum: number;
        uiAllNum: number;
        static appVersion: number;
        init(): void;
        private loadAll;
        private loadDataComplet;
    }
}
