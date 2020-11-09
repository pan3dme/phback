module prop {
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TimeUtil = Pan3d.TimeUtil
    import MouseType = Pan3d.MouseType;
 
    import GlReset = Pan3d.GlReset;
    import LineDisplayShader = Pan3d.LineDisplayShader;
    import GridLineSprite = Pan3d.GridLineSprite;
    import ProgrmaManager = Pan3d.ProgrmaManager;
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite;
    import Camera3D = Pan3d.Camera3D;
    import Rectangle = Pan3d.Rectangle;
    import UIRenderComponent = Pan3d.UIRenderComponent
    import FBO = Pan3d.FBO;

    //import MaterialRoleSprite = left.MaterialRoleSprite;
    //import ModelSprite = maineditor.ModelSprite;
    //import SkillSpriteDisplay = maineditor.SkillSpriteDisplay;
    //import LyfSpriteDisplay = maineditor.LyfSpriteDisplay;
    //import EdItorSceneManager = maineditor.EdItorSceneManager;

    export class MeshSceneView2DUI extends BaseReflComponent {

        protected textLabelUI: TextLabelUI;
        protected textureUrlText: TextLabelUI;
        protected texturePicUi: TexturePicUi
 
        protected initView(): void {
            this.textLabelUI = new TextLabelUI(64, 16)
            this.textureUrlText = new TextLabelUI(200, 16)
            this.texturePicUi = new TexturePicUi(128, 128)
            this.texturePicUi.haveDoubleCilk = false;
 

            this.propPanle.addBaseMeshUi(this.textLabelUI)
            this.propPanle.addBaseMeshUi(this.textureUrlText)
            this.propPanle.addBaseMeshUi(this.texturePicUi)

          //  this.texturePicUi.textureContext.ui.isU = true
            this.texturePicUi.textureContext.ui.isV = true
            this.texturePicUi.textureContext.ui.uiRender.applyObjData()

           // this.texturePicUi.url = "icon/base.jpg"
            this.texturePicUi.ui.addEventListener(InteractiveEvent.Down, this.butClik, this);

            this.wheelEventFun = ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) }
            document.addEventListener(MouseType.MouseWheel, this.wheelEventFun);
 
            this.height = 220;

            this.texturePicUi.ui.width = 200
            this.texturePicUi.ui.height = 200

            this.texturePicUi.addEventListener(ReflectionEvet.CHANGE_DATA, this.texturePicUiChange, this)

            this.initScene()
 
   
        }
        protected texturePicUiChange($evt: ReflectionEvet): void {
 
        }
        private _suffix: string
        public get suffix(): string {
            return this._suffix;
        }
        public set suffix(value: string) {
            this._suffix = value
            this.texturePicUi.suffix = value;

        }
        private wheelEventFun: any
        public onMouseWheel($evt: MouseWheelEvent): void {
      
            if (this.texturePicUi.ui.testPoint($evt.x, $evt.y)) {
                this.sceneManager.cam3D.distance += ($evt.wheelDelta * Scene_data.cam3D.distance) / 1000;
            }

    
        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.texturePicUi.ui:
 
                    this.lastRotationY = this.sceneManager.focus3D.rotationY
                    this.mouseDonwPos = new Vector2D(evt.x, evt.y)
                    this.addStagetMouseMove()

                    break;
                default:
                    break;
            }

        }
        private lastRotationY: number
        private mouseDonwPos: Vector2D
        private addStagetMouseMove(): void {
        
             Scene_data.uiBlankStage.addEventListener( InteractiveEvent.Up, this.onStageMouseUp, this);
             Scene_data.uiBlankStage.addEventListener( InteractiveEvent.Move, this.onStageMouseMove, this);
        }
        private removeStagetMouseMove(): void {
            Scene_data.uiBlankStage.removeEventListener(  InteractiveEvent.Up, this.onStageMouseUp, this);
            Scene_data.uiBlankStage.removeEventListener( InteractiveEvent.Move, this.onStageMouseMove, this);
        }
        private onStageMouseMove($evt:  InteractiveEvent): void {
            console.log("move")
            if (this.mouseDonwPos) {
                this.sceneManager.focus3D.rotationY = this.lastRotationY - ($evt.x - this.mouseDonwPos.x);
            }
        }
        private onStageMouseUp($evt:  InteractiveEvent): void {
            console.log("up")
            this.removeStagetMouseMove()
        }
        protected sceneManager: maineditor.EdItorSceneManager;
        protected initScene(): void {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            this.sceneManager = new maineditor.EdItorSceneManager()
            this.sceneManager.addDisplay(new GridLineSprite())
          //  this.sceneManager.addDisplay(new BaseDiplay3dSprite())
            this.sceneManager.ready = true;
            this.sceneManager.cam3D = new Camera3D();
            this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, 256, 256)
            this.sceneManager.cam3D.distance = 200;
            this.sceneManager.focus3D.rotationX = -45;
 
            this.upDataFun = () => { this.oneByFrame() }
            TimeUtil.addFrameTick(this.upDataFun);

          
        }
 
        private upDataFun: any
        protected oneByFrame(): void {
 
            if (this.texturePicUi && this.texturePicUi.textureContext && this.texturePicUi.textureContext.hasStage) {
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                this.sceneManager.renderToTexture()
                var $uiRender: UIRenderComponent = this.texturePicUi.textureContext.ui.uiRender;

                $uiRender.uiAtlas.textureRes.texture = this.sceneManager.fbo.texture

                var maxNum: number = Math.min(this.texturePicUi.textureContext.ui.width, this.texturePicUi.textureContext.ui.height)
                this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, maxNum, maxNum )

            }
        }
  
       
        public destory(): void {
            this.texturePicUi.ui.removeEventListener(InteractiveEvent.Down, this.butClik, this);
            document.removeEventListener(MouseType.MouseWheel, this.wheelEventFun);

            this.textLabelUI.destory();
            this.textureUrlText.destory();
            this.texturePicUi.destory();

            this.texturePicUi = null;
            this.sceneManager.clearScene()
            TimeUtil.removeTimeTick(this.upDataFun);
        }
        public set data(value: any) {
            this._data = value;

        }
        public get data(): any {
            return this._data
        }
        private modelKey: any = {}
        private addUrlToView(value: string): void {
          
            if (!this.modelKey[value]) {
                if (value.indexOf(".prefab")!=-1) {
                    let prefabSprite: maineditor.ModelSprite = new maineditor.ModelSprite();
                    prefabSprite.setPreFabUrl(value, () => {
                        prefabSprite.scale = 10 / prefabSprite.prefab.objData.getMaxSize();

                    });
                    this.sceneManager.addDisplay(prefabSprite);
                }
                if (value.indexOf(".zzw") != -1) {
                    let roleSprite = new left.MaterialRoleSprite();
                    roleSprite.setRoleZwwUrl(value)
                    this.sceneManager.addMovieDisplay(roleSprite);
                }

                if (value.indexOf(".skill") != -1) {
                    var skillsprite = new maineditor.SkillSpriteDisplay();
                    skillsprite.addSkillByUrl(value)
                    this.sceneManager.addDisplay(skillsprite);
                }

                if (value.indexOf(".lyf") != -1) {
                    var lyfSprite = new maineditor.LyfSpriteDisplay();
                    lyfSprite.addLyfByUrl(value);
                    this.sceneManager.addDisplay(lyfSprite);
                }
                if (value.indexOf(".objs") != -1) {
                    let objsSprite: maineditor.ModelSprite = new maineditor.ModelSprite();
                    this.sceneManager.addDisplay(objsSprite);
                    var tempPrefab: pack.PrefabStaticMesh = new pack.PrefabStaticMesh()
                    tempPrefab.url = value
                    tempPrefab.objsurl = value
                    tempPrefab.textureurl = "assets/base/base.material"
                    objsSprite.prefab = tempPrefab

                    pack.PackObjDataManager.getInstance().getObjDataByUrl(tempPrefab.objsurl, (value: ObjData) => {
                        objsSprite.scale = 10 / value.getMaxSize();
                    })
                }
                this.modelKey[value] = true
            }

       
        }
        public refreshViewValue(): void {

            var $url: string = String(this.target[this.FunKey]);
            this.texturePicUi.url = "icon/base.jpg"

            this.addUrlToView($url)


            var $arr: Array<string> = $url.split("/");
            this.textureUrlText.label = $arr[$arr.length - 1];

        }
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 0;
            this.texturePicUi.x = this._x + 50;
            this.textureUrlText.x = this._x + 60
  
        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.textLabelUI.y = this._y
            this.texturePicUi.y = this._y+0
            this.textureUrlText.y = this._y + 200
 
        }
        public get y(): number {
            return this._y
        }
        public get label(): string {
            return this._label;
        }
        public set label(value: string) {
            this._label = value
            this.textLabelUI.label = value;
        }
    

    }



}