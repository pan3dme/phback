module LayaPan3D {
    import Vector3D = Pan3d.Vector3D
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data;

    import CombineParticle = Pan3d.CombineParticle
    export class LayaGame2dDemo extends LayaScene2D {
        public constructor( w: number = 128, h: number = 128) { 
            super(w,h)
        }
        protected initScene(): void {
            super.initScene();
            this.addEvents();
            this.addSceneModel();
            this.bgColor = new Vector3D(0.1,0.1,0.1,1)
        }
    
        private mainChar: LayaScene2dSceneChar
        private addSceneModel(): void {
            this.sceneManager.cam3D.scene2dScale = 4
            var $baseChar: LayaScene2dSceneChar = new LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(100, 100);
            $baseChar.rotationY=180
            this.mainChar = $baseChar;
            var rect100: Pan3d.Rectangle = new Pan3d.Rectangle(0, 0, 200, 200);
            for (var i: number = 0; i < 6; i++) {
                for (var j: number = 0; j < 4; j++) {
                    if (i == j) {
                        this.addGrouandPic("map/5/maps/" + j + "_" + i + ".jpg", new Pan3d.Rectangle(i * rect100.width, j * rect100.height, rect100.width, rect100.height));
                    }
                }
            }
        }
      
        private addFramePartice(v2d: Vector2D ): void {

            var pathname: string = "pan/atlas";
            var effictname: string = "10101_1";
            var info: any = {};
            info.timeLen = 1000
            info.frameScale =0.1
            info.loop = false
            info.isShow = true //是否在最上层
            var combineParticle: CombineParticle = layapan_me.Frame3DAtlasParticle.getFrameParticle(Scene_data.fileRoot + pathname + "/", effictname, info)
            this.sceneManager.particleManager.addParticle(combineParticle);

            var v3d: Vector3D = this.getPos3dBy2D(v2d.x, v2d.y)
            combineParticle.x = v3d.x;
            combineParticle.y = 0;
            combineParticle.z = v3d.z;


        }
        public addGrouandPic(value: string, rect: Pan3d.Rectangle): LayaScene2dPicSprit {
            var tempPic: LayaScene2dPicSprit = new LayaScene2dPicSprit(value);
            tempPic.set2dPos(rect.x, rect.y);
            tempPic.width = rect.width;
            tempPic.height = rect.height;
            this.sceneManager.addDisplay(tempPic);
            return tempPic
        }
        protected addEvents(): void {
            this.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
            this.rootpos = new Vector2D(-100,-100)
        }
        public upData(): void {
            super.upData()
          
        }
        private onMouseWheel(e: any): void {
            if (!this.rootpos) {
                this.rootpos = new Vector2D()
            }
            this.rootpos.x += e.delta;
            this.rootpos.y += e.delta;

            console.log(this.rootpos)
        }
        private dragRegion: Laya.Rectangle;
        private onStartDrag(e: Event): void {
 
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            } else {
                var v2d: Vector2D = this.getMousePos(this.mouseX, this.mouseY);
                this.addFramePartice(v2d)
                console.log("mouseX----", this.mouseX, "mouseY", this.mouseY, "mouseDown", v2d)
                this.mainChar.set2dPos(v2d.x, v2d.y);
                this.mainChar.scale=0.5
    
            }
        }

    }
}