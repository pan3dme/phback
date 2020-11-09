declare module Pan3d {
    class Display2dMovie extends Display3D {
        batchPos: Array<Movie3D>;
        movieTexture: WebGLTexture;
        watchCaramMatrix: Matrix3D;
        private _time;
        private _allFrame;
        private _uvData;
        private _uWidth;
        private _vWidth;
        private _state;
        frameRate: number;
        constructor();
        update(): void;
        updateFrame(t: number): void;
        play(action: string, state?: number): void;
        addSun($obj: Movie3D): void;
        setUrl($url: string): void;
        initData(num: number, scale: number, uscale: number, vscale: number, allFrame: number, random?: boolean): void;
        addStage(): void;
        removeStage(): void;
    }
}
