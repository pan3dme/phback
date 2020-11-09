declare module Pan3d {
    class Engine {
        static init($caves: HTMLCanvasElement): void;
        static resReady(): void;
        static testBlob(): void;
        static initPbr(): void;
        static initShadow(): void;
        static needVertical: Boolean;
        static needInputTxt: boolean;
        static resetSize(a?: number, b?: number): void;
        static sceneCamScale: number;
        static resetViewMatrx3D(): void;
        static update(): void;
        static unload(): void;
    }
}
