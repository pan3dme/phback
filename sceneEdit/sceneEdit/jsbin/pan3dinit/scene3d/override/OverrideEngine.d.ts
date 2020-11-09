declare module scene3d_me {
    class OverrideEngine extends Pan3d.Engine {
        constructor();
        static initConfig(): void;
        static update(): void;
        static resetSize(width?: number, height?: number): void;
        static init($caves: HTMLCanvasElement): void;
    }
}
