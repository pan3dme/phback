declare module Pan3d {
    class FpsMc {
        drawNum: number;
        fpsStr: string;
        static addFps: number;
        static fpsNowNum: number;
        static tipStr: string;
        constructor();
        static update(): void;
        getStr(): string;
    }
    class FpsStage {
        private static _instance;
        static getInstance(): FpsStage;
        constructor();
        canvas2D: any;
        loadCav: any;
        loadCtx: CanvasRenderingContext2D;
        init($cadves: any, $loadCav: any): void;
        showLoadInfo(str: string): void;
        removeShowLoad(): void;
        private fps;
        private canvasUi;
        static showFps: boolean;
        private lastTime;
        upData(): void;
        private makeXyzLine;
        private cPos;
        private drawLine;
        resetSize(): void;
    }
}
