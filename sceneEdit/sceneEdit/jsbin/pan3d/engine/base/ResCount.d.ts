declare module Pan3d {
    class ResCount extends GC {
        protected _useNum: number;
        idleTime: number;
        static GCTime: number;
        useNum: number;
        clearUseNum(): void;
    }
}
