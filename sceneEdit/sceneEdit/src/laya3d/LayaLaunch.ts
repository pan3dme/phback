import Browser = Laya.Browser;
import Loader = Laya.Loader;
import LEvent = Laya.Event;
import Stage = Laya.Stage;
import Sprite = Laya.Sprite


import Pan3dByteArray = Pan3d.Pan3dByteArray;

import LayaScene2D = LayaPan3D.LayaScene2D;
import LayaScene3D = LayaPan3D.LayaScene3D;
import LayaGame2dDemo = LayaPan3D.LayaGame2dDemo;

class LayaLaunch {
    private _canvas: HTMLCanvasElement;
    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    constructor() {
        this.init()
    }
    static inited: boolean
    static overrideMethods(): void {
        if (this.inited) {
            return;
        }
        this.inited = true;
        let compatibleLayaRender = function (pan3dFunc: Function, ...args): any {
            let v = pan3dFunc.apply(this, args);

            //   console.log("here")
            return v;
        }
        let funA = WebGLRenderingContext.prototype.blendFunc;
        WebGLRenderingContext.prototype.blendFunc = function (sfactor: GLenum, dfactor: GLenum): void {
            return compatibleLayaRender.call(this, funA, sfactor, dfactor);
        }
        /*
        let ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
        Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
            return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
        }
        */
    }


    private init(): void {
        // LayaLaunch.overrideMethods()

        this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
        Laya.stage.alignV = Stage.ALIGN_LEFT;
        Laya.stage.alignH = Stage.ALIGN_TOP;

        Laya.stage.scaleMode = "full"
        Laya.stage.bgColor = "#232628";



        Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
        Pan3d.Scene_data.fileuiRoot = "res/";
        Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";



        Pan3d.Engine.init(this._canvas);




        var midBox: Laya.Box = new Laya.Box()
        Laya.stage.addChild(midBox)

        var topBox: Laya.Box = new Laya.Box()
        Laya.stage.addChild(topBox)



        var spriteA: LayaScene3D = new LayaScene3D(512,512  )
        topBox.addChild(spriteA);

        var spriteB: LayaScene3D = new LayaScene3D( )

        topBox.addChild(spriteB);

        spriteB.pos(0, 250);

     
        var spriteC: LayaGame2dDemo = new LayaGame2dDemo(512,512)
        topBox.addChild(spriteC);
        spriteC.pos(350, 0);
   

        var spriteD: LayaScene2D = new LayaGame2dDemo(256, 256)
      //  spriteD.scale(2,2)
        topBox.addChild(spriteD);
        spriteD.pos(200, 250);


        var picA: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
        midBox.addChild(picA)
        picA.scale(0.5, 0.5)
        picA.pos(600, 170)

        var picB: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
        midBox.addChild(picB)
        picB.pos(0, 220)



        console.log(layapan_me.LayaSceneChar)

        this.lastTm = Pan3d.TimeUtil.getTimer()
        Laya.stage.frameLoop(1, this, () => {
            var t = Pan3d.TimeUtil.getTimer() - this.lastTm;
            //  Pan3d.TimeUtil.START_TIME += t * -1;
            this.lastTm = Pan3d.TimeUtil.getTimer()
            Pan3d.TimeUtil.update()
        })
    }


    private lastTm: number

    public static initCanvas($caves: HTMLCanvasElement): void {

        new LayaLaunch();


    }


}


