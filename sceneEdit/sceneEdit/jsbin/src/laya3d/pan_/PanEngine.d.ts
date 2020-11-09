/**
* name
*/
declare module lou16.me {
    class PanEngine {
        static htmlScale: number;
        static update(): void;
        static init(canvas: HTMLCanvasElement, callback: Function): void;
        static overrideMethods(): void;
        static initSceneData(canvas: HTMLCanvasElement): void;
        static initUIConf(callback: Function): void;
        static resetSize(width?: number, height?: number, scale?: number): void;
    }
}
