
module LayaPan3D {

    import Vector2D = Pan3d.Vector2D
    import Object3D = Pan3d.Object3D
    import MathClass = Pan3d.MathClass
    import Scene_data = Pan3d.Scene_data

    import MaterialRoleSprite = left.MaterialRoleSprite;
    import ModelSprite = maineditor.ModelSprite;
    import SkillSpriteDisplay = maineditor.SkillSpriteDisplay;
    import LyfSpriteDisplay = maineditor.LyfSpriteDisplay;

    import EdItorSceneManager = maineditor.EdItorSceneManager;


    export class LayaScene3D extends Laya3dSprite  {
        public constructor( w: number = 128, h: number = 128) {
            super( w, h)
            this.addEvents()
            this.addSceneModel()
            this.bgColor = new Vector3D(0.2, 0.2, 0.2, 1)
        }
        protected addEvents(): void {
            this.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
            Laya.stage.on(Pan3d.MouseType.MouseUp, this, this.onMouseUp);
            Laya.stage.on(Pan3d.MouseType.MouseMove, this, this.onMouseMove);
        }
        protected addSceneModel(): void {
             this.addDisplay();
             // this.addRole();
              this.addSkillRole();
            //  this.addLyfSprite();
        }
        private onMouseWheel(e: any): void {
            this.sceneManager.cam3D.distance += e.delta
        }
        private lastMouseVec2d: Vector2D;
        private lastfocus3D: Object3D;
        private dragRegion: Laya.Rectangle;
        private onStartDrag(e: Event): void {
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            } else {
                this.lastMouseVec2d = new Vector2D(this.mouseX, this.mouseY)
                this.lastfocus3D = new Object3D()
                this.lastfocus3D.rotationY = this.sceneManager.focus3D.rotationY
                this.lastfocus3D.rotationX = this.sceneManager.focus3D.rotationX
            }

        }
        private onMouseUp(e: Event): void {
            this.lastMouseVec2d = null

        }
        private onMouseMove(e: Event): void {
            if (this.lastMouseVec2d) {
                this.sceneManager.focus3D.rotationY = this.lastfocus3D.rotationY - (this.mouseX - this.lastMouseVec2d.x)
                this.sceneManager.focus3D.rotationX = this.lastfocus3D.rotationX - (this.mouseY - this.lastMouseVec2d.y) / 10
            }
        }

        public upData(): void {
            if (this.sceneManager) {
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                super.upData()
            }


        }

    }
}