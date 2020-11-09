module lou16.me{
    import CharTitleUiVo = Pan3d.CharTitleUiVo;
    import Scene_data = Pan3d.Scene_data;
    import LoadManager = Pan3d.LoadManager;
    import UIManager = Pan3d.UIManager;
    import TextureManager = Pan3d.TextureManager;
    import UIRectangle = Pan3d.UIRectangle;
    import Vector3D = Pan3d.Vector3D;
    import Matrix3D = Pan3d.Matrix3D;
    import UIData = Pan3d.UIData;
    import UiDraw = Pan3d.UiDraw;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    import Rectangle = Pan3d.Rectangle
    import baseMeshVo = Pan3d.baseMeshVo
 
    export class BuffTitleUiVo extends CharTitleUiVo {
        private _buffTitleMesh: BuffTitleMesh
        public makeData(): void {
            if (this._data) {
                this._buffTitleMesh = <BuffTitleMesh>this._data
                var rec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
                var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                var base:number = 32;
                for (var i: number = 0; i < this._buffTitleMesh.buffarr.length; i++) {
                    var picId: number = this._buffTitleMesh.buffarr[i]
                    UiDraw.cxtDrawImg(ctx, "BUFF" + picId, new Rectangle(20*(i%4), base-20*Math.floor(i/4), 20, 20), UIData.publicUi);  //逐个绘制BUFF图片，取公共图片。对应可自行设置参数
                }
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            }
        }
        public update(): void {
            if (this._buffTitleMesh) {
                if (this._buffTitleMesh.needDraw) {
                    this.makeData();
                    this._buffTitleMesh.needDraw = false
                }
                if (this._buffTitleMesh.pos) {
                    if (this._buffTitleMesh.visible) {
                        if (this.needUpData(this._buffTitleMesh.pos)) {
                            var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone();
                            m.append(Scene_data.viewMatrx3D);
                            var p: Vector3D = m.transformVector(this._buffTitleMesh.pos);
                            this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                            this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2;
                            this.oldPos.x = this._buffTitleMesh.pos.x;
                            this.oldPos.y = this._buffTitleMesh.pos.y;
                        }
                    } else {
                        this.ui.x = 10000
                    }
                }
                if (this._buffTitleMesh.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        }
    }
    export class BuffTitleMesh extends baseMeshVo {
        private _num: Array<number>;

        public needDraw: boolean;
        public destory(): void {
            this.pos = null;
            this._num = null;
            this.clear = true
        }
        public set buffarr(value: Array<number>) {
            this._num = value;
            this.needDraw = true;
        }
        public get buffarr(): Array<number> {
            return this._num;
        }
    }
    export class PanBuffManager {
		public static TYPE_TRAP			:number = 1;	//陷阱
		public static TYPE_BREAK		:number = 2;	//破甲
		public static TYPE_ARMOR		:number = 3;	//护甲
		public static TYPE_MOCKERY		:number = 4;	//嘲讽
		public static TYPE_MOCKERY_HP	:number = 5;	//嘲讽回血

        private _scene:maineditor. EdItorSceneManager
        private _buffDis2DUI: Dis2DUIContianerPanel
        constructor($scene: maineditor. EdItorSceneManager) {
            this._scene = $scene
            this._buffDis2DUI = new Dis2DUIContianerPanel(BuffTitleUiVo, new Rectangle(0, 0, 256, 64), 12);
        
        }
        public getCharTitleMeshVo(value: Array<number>): BuffTitleMesh {
            var $vo: BuffTitleMesh = new BuffTitleMesh;
            $vo.buffarr = value
            $vo.pos = new Vector3D(0, 50, 0);
            this._buffDis2DUI.showTemp($vo);
            return $vo;
        }
    }
}