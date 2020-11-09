import Browser = Laya.Browser;
import Loader = Laya.Loader;
import LEvent = Laya.Event;
import Stage = Laya.Stage;
import Sprite = Laya.Sprite;
import Pan3dByteArray = Pan3d.Pan3dByteArray;
import LayaScene2D = LayaPan3D.LayaScene2D;
import LayaScene3D = LayaPan3D.LayaScene3D;
import LayaGame2dDemo = LayaPan3D.LayaGame2dDemo;
declare class LayaLaunch {
    private _canvas;
    readonly canvas: HTMLCanvasElement;
    constructor();
    static inited: boolean;
    static overrideMethods(): void;
    private init;
    private lastTm;
    static initCanvas($caves: HTMLCanvasElement): void;
}
