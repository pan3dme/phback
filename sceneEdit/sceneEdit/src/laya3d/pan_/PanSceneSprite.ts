module lou16.me {
    import TextArea = Laya.TextArea
    import LineDisplayShader = Pan3d.LineDisplayShader
    import ProgrmaManager = Pan3d.ProgrmaManager
    import GridLineSprite = Pan3d.GridLineSprite
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite
    import Camera3D = Pan3d.Camera3D
    import Rectangle = Pan3d.Rectangle
    export class PanSceneSprite extends LayaPan3D.LayaScene2D {
        // 状态信息显示
        private _stat: Stat;

        constructor() {
            super();
        }
        protected initScene(): void {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            this.sceneManager = new PanScene()
            var temp: GridLineSprite = new GridLineSprite()
            this.sceneManager.addDisplay(temp)
            this.sceneManager.addDisplay(new BaseDiplay3dSprite())
            this.sceneManager.ready = true;
            this.sceneManager.cam3D = new Camera3D();
            this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, 512, 512)
            this.sceneManager.cam3D.distance = 200;
            this.sceneManager.focus3D.rotationY = random(360);
            this.sceneManager.focus3D.rotationX = -45;

        }
        public get scene(): PanScene {
            return <PanScene>this.sceneManager;
        }

        showStat(): void {
            if (!this._stat) {
                let scene:PanScene = this.scene as PanScene;
                this._stat = new Stat(scene);
                scene.addFocueEvent(true);
            }
        }

        hideStat(): void {
            if (this._stat) {
                let scene:PanScene = this.scene as PanScene;
                this._stat.destroy();
                this._stat = null;
                scene.removeFocueEvent();
            }
        }

        destroy(destroyChild?: boolean): void {
            this.hideStat();
            this.customRenderEnable = false;
            super.destroy(destroyChild);
        }
    }

    class Stat {
        private _scene: PanScene;
        private _statSprite:Sprite;
        private _bgSprite:Sprite;
        private _statText:TextArea;
        constructor(v: PanScene) {
            this._scene = v;
            this._statSprite = new Sprite();
            this._bgSprite = new Sprite();
            this._bgSprite.alpha = .3;
            this._bgSprite.mouseEnabled = false;
            this._statSprite.addChild(this._bgSprite);
            this._statText = new TextArea();
            this._statText.color = '#FFFFFF';
            this._statText.autoSize = true;
            this._statText.editable = false;
            this._statText.mouseEnabled = false;
            this._statText.width = 150;
            this._statText.x = 10;
            this._statText.y = 10;
            this._statSprite.addChild(this._statText);
            this._statSprite.mouseEnabled = true;
            this._statSprite.on(LEvent.MOUSE_DOWN, this, this.onMouseDown);
			Laya.stage.on(LEvent.MOUSE_UP, this, this.onMouseUp);
            this._statSprite.x = (Laya.stage.width-170) / 2;
            this._statSprite.y = 120;//Laya.stage.height / 2;
            Laya.stage.addChild(this._statSprite);
        }

		private onMouseDown(e: LEvent): void {
			this._statSprite.startDrag();
            e.stopPropagation();
		}
		private onMouseUp(e: LEvent): void {
			this._statSprite.stopDrag();
		}


        update(): void {
            let scene = this._scene;

            let text:string = 'cam3D.distance：' + scene.camDistance;
            text += '\r\nfocus3D.rotationX：' + scene.focus3D.rotationX;
            text += '\r\nfocus3D.rotationY：' + scene.focus3D.rotationY;
            text += '\r\nfocus3D.rotationZ：' + scene.focus3D.rotationZ;
            text += '\r\nfocus3D.x：' + scene.focus3D.x;
            text += '\r\nfocus3D.y：' + scene.focus3D.y;
            text += '\r\nfocus3D.z：' + scene.focus3D.z;
            this._statText.text = text;
            

            let w = this._statText.width + 20;
            let h = this._statText.height + 20;
            this._statSprite.width = w;
            this._statSprite.height = h;
            this._bgSprite.graphics.clear();
            this._bgSprite.graphics.drawRect(0, 0, w, h, '#000')
        }

        destroy(): void {
            Laya.stage.off(LEvent.MOUSE_UP, this, this.onMouseUp);
            this._statSprite.destroy(true);
        }
    }

}