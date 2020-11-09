module maineditor {

    import Rectangle = Pan3d.Rectangle
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data

    import UICompenent = Pan3d.UICompenent


    import TextureManager = Pan3d.TextureManager
    import FrameCompenent = Pan3d.FrameCompenent
    import Grid9Compenent = Pan3d.Grid9Compenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign

    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import UIConatiner = Pan3d.UIConatiner;
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import UIRectangle = Pan3d.UIRectangle
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent
    import baseMeshVo = Pan3d.baseMeshVo
    import ProgrmaManager = Pan3d.ProgrmaManager
    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import Shader3D = Pan3d.Shader3D
    import TextureRes = Pan3d.TextureRes
    import MouseType = Pan3d.MouseType
    import MathUtil = Pan3d.MathUtil
    import TextRegExp = Pan3d.TextRegExp
 

    import PanDragEvent = drag.PanDragEvent

    import Sprite = win.Sprite
    import Panel = win.Panel


    export class SelectFileListText extends Disp2DBaseText {

        public bgUi: UICompenent;
        public textMetrics: TextMetrics;
        public tittlestr: string;
 

        public set select(value: boolean) {
            this._select = value
            this.makeData()
        }
        private _select: boolean
        public get select(): boolean {
            return this._select 
        }
 
        public makeData(): void {
            if (this.tittlestr) {
                var $uiRec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
             
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);

                var nameStr: string = this.tittlestr;
                if (this._select) {
                    nameStr = "[ffffff]" + nameStr;
                } else {
                    nameStr = "[9c9c9c]" + nameStr;
                }
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, nameStr, 24, 1, 1, TextAlign.LEFT);
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);


            }
        }
    

    }
   
    export class EditorOpenList {
        private perent: MainEditorPanel
        private topRender: UIRenderComponent
        public constructor(value: MainEditorPanel, render: UIRenderComponent) {
            this.perent = value
            this.topRender = render;

            this.tabItemArr = [];
 
    
            //this.pushPathUrl("角色/新场景.scene")
            //this.pushPathUrl("完美的开始.map")
        
        }
 
 
        private tabItemArr: Array<SelectFileListText>;
        private tabBgClik(evt: InteractiveEvent): void {
            var tabVo: SelectFileListText = evt.target.data
            var ui: Grid9Compenent = evt.target;
            if ((evt.x - ui.absoluteX) < (ui.absoluteWidth - 20)) {
                this.selectTabStr = tabVo.rightTabInfoVo

                //if (this.selectTabStr.indexOf(".map") != -1) {
                //    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.LOAD_SCENE_MAP), this.selectTabStr); //加载场景
                //    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL));
                //}
                //if (this.selectTabStr.indexOf(".material") != -1) {

                //    Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), this.selectTabStr);
                //}

                maineditor.EditorModel.getInstance().openFileByUrl(this.selectTabStr)


            } else {
                console.log("关", tabVo)
                this.removePathUrl(tabVo.rightTabInfoVo)


            }
       
            this.refrishTabUiSelect()
 
        }
        public removePathUrl(value: string): void {
            for (var i: number = 0; i < this.tabItemArr.length; i++) {
                if (this.tabItemArr[i].rightTabInfoVo == value) {
                    var tabVo: SelectFileListText = this.tabItemArr[i]
                    this.perent.removeChild(tabVo.bgUi);
                    tabVo.bgUi.removeEventListener(InteractiveEvent.Down, this.tabBgClik, this);
                    this.perent.clearTemp(tabVo.rightTabInfoVo);
                    this.tabItemArr.splice(i, 1)
                }
            }
        }
        public changeVoBg(vo: SelectFileListText, value: boolean): void {
            var skinName: string = "e_edit_select_bg_1"
            if (value ) {
                skinName = "e_edit_select_bg_2";
            } else {
                skinName = "e_edit_select_bg_1";
            }
            var tempui = this.perent.addChild(<UICompenent>this.topRender.getComponent(skinName));
            if (vo.bgUi) {
                tempui.x = vo.bgUi.x;
                tempui.y = vo.bgUi.y;
                tempui.width = vo.bgUi.width;
                tempui.height = vo.bgUi.height;
                vo.bgUi.removeEventListener(InteractiveEvent.Down, this.tabBgClik, this);
                this.perent.removeChild(vo.bgUi);
            }
            vo.bgUi = tempui;//换上最新的
            vo.bgUi.addEventListener(InteractiveEvent.Down, this.tabBgClik, this);
            vo.bgUi.data = vo;
            vo.select = value;

        }
        private refrishTabUiSelect(): void {
            var tx: number = 2;
            for (var i: number = 0; i < this.tabItemArr.length; i++) {

                var tabVo = this.tabItemArr[i];
                if (this.tabItemArr[i].rightTabInfoVo == this.selectTabStr) {
                    this.tabItemArr[i].select = true
                    this.changeVoBg(this.tabItemArr[i], true)
                } else {
                    this.tabItemArr[i].select = false
                    this.changeVoBg(this.tabItemArr[i], false)
                }

                tabVo.bgUi.x = tx-1;
                tabVo.bgUi.y = 1;
                tabVo.bgUi.width = Math.floor(tabVo.textMetrics.width) + 20 + 25;
                tabVo.bgUi.height = 22;
                tabVo.bgUi.data = tabVo;
                tx += tabVo.bgUi.width;
                tabVo.ui.x = tabVo.bgUi.x + 10;
                tabVo.ui.y = tabVo.bgUi.y + 5;
                tabVo.ui.width = 256;
                tabVo.ui.height = 20;
            }
            this.topRender.applyObjData();
        }
        public pushPathUrl(value: string): void {
            this.selectTabStr = value
            var needAdd: boolean = true;
            var tx: number = 1;
            for (var i: number = 0; i < this.tabItemArr.length; i++) {
                if (this.tabItemArr[i].rightTabInfoVo == value) {
                    needAdd = false
                }
                tx = this.tabItemArr[i].bgUi.x+ this.tabItemArr[i].bgUi.width-1;
            }
            if (needAdd) {
       
                var $tittlestr: string = value.split("/")[value.split("/").length - 1];
                var $pathurl: string = value;
           
                var $ctx = UIManager.getInstance().getContext2D(100, 100, false);
                $ctx.font = "13px " + UIData.font;
                var tabVo: SelectFileListText = <SelectFileListText>this.perent.showTemp($pathurl);
                tabVo.textMetrics = TextRegExp.getTextMetrics($ctx, $tittlestr);
                tabVo.tittlestr = $tittlestr;
                this.changeVoBg(tabVo, false);
     

                tabVo.select = true
                this.tabItemArr.push(tabVo);

            }
            this.refrishTabUiSelect()
        }
        private selectTabStr: string;
   
 
    }


    export class MainEditorPanel extends win.Dis2dBaseWindow{

        public constructor() {
            super(SelectFileListText, new Rectangle(0, 0, 512, 40), 10);
            this.pageRect = new Rectangle(0, 0, 500, 500)
            this._sceneViewRender = new UiModelViewRender();
            this.addRender(this._sceneViewRender)

        }
        public set sceneProjectVo(value: SceneProjectVo) {
            this._sceneViewRender.sceneProjectVo = value
        }

    
        
        private _sceneViewRender: UiModelViewRender;
        private e_line_left: UICompenent
        private e_line_right: UICompenent
        private e_centen_panel: Grid9Compenent
        public editorOpenList: EditorOpenList;
        protected loadConfigCom(): void {
            super.loadConfigCom();


            this.e_centen_panel = <Grid9Compenent>this.addChild(<UICompenent>this._baseMidRender.getComponent("e_centen_panel")); 
 
            this.editorOpenList=    new EditorOpenList(this, this._baseTopRender)


            this.e_line_left = this.addChild(<UICompenent>this._baseTopRender.getComponent("e_line_vertical"));
            this.e_line_right = this.addChild(<UICompenent>this._baseTopRender.getComponent("e_line_vertical"));

      
 
            this.initView()

            this.uiLoadComplete = true
            this.refrishSize()

            this.showType = AppData.sceneEidtType
 
 
        }
 
 
        public set showType(value: number) {
            AppData.sceneEidtType = value
 
            if (this.uiLoadComplete) {

                switch (AppData.sceneEidtType) {
                    case 1:
                        this.setUiListVisibleByItem([this.a_scene_view], true)
                      //  this.setUiListVisibleByItem([this.e_centen_panel], true)
                        break
                    case 2:
                        this.setUiListVisibleByItem([this.a_scene_view], false)
                       // this.setUiListVisibleByItem([this.e_centen_panel], false)
                        break
                    default:
                        break
                }

            }

        }
 
        private a_scene_view: UICompenent
        private initView(): void {
            this._sceneViewRender.uiAtlas = this._tRender.uiAtlas
            this.a_scene_view = this.addChild(this._sceneViewRender.getComponent("a_scene_view"));
            TextureManager.getInstance().getTexture("res/white.jpg", ($texture: TextureRes) => {
                this._sceneViewRender.textureRes = $texture;
                Pan3d.TimeUtil.addFrameTick((t: number) => { this.upFrame(t) });
            });

            this.a_scene_view.addEventListener(PanDragEvent.DRAG_DROP, this.dragDrop, this);
            this.a_scene_view.addEventListener(PanDragEvent.DRAG_ENTER, this.dragEnter, this);
            this.a_scene_view.addEventListener(InteractiveEvent.Down, this.butClik, this);
 
            document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onPanellMouseWheel($evt) });
        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_scene_view:
                    if (evt.mouseEvent.ctrlKey || evt.mouseEvent.shiftKey) {

                        ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.SCENE_SELECT_SPRITE_DOWN), evt)
                    }
                    break
                default:
                    break
            }

        }
        public onPanellMouseWheel($evt: MouseWheelEvent): void {
            var $slectUi: UICompenent = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
            if ($slectUi && $slectUi.parent == this) {

                var q: Pan3d.Quaternion = new Pan3d.Quaternion();
                q.fromMatrix(MainEditorProcessor.edItorSceneManager.cam3D.cameraMatrix);
                var m: Pan3d.Matrix3D = q.toMatrix3D()
                m.invert()
                var $add: Vector3D = m.transformVector(new Vector3D(0, 0, $evt.wheelDelta / 100 ))
                MainEditorProcessor.edItorSceneManager.cam3D.x += $add.x
                MainEditorProcessor.edItorSceneManager.cam3D.y += $add.y
                MainEditorProcessor.edItorSceneManager.cam3D.z += $add.z

                MathUtil.MathCam(MainEditorProcessor.edItorSceneManager.cam3D)
 
            }
        }
        private dragDrop(evt: PanDragEvent): void {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                console.log("可以拖动")
            } else {
                console.log("不可以")
            }

        }
        public suffix: string ="prefab|lyf|zzw|skill"
        private testSuffix(value: string): boolean {
            if (!this.suffix) {
                return;
            }
            var tempItem: Array<string> = this.suffix.split("|")
            for (var i: number = 0; i < tempItem.length; i++) {
                if (value.indexOf(tempItem[i]) != -1) {
                    return true
                }
            }
            return false
        }
        private dragEnter(evt: PanDragEvent): void {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                var obj: any = {}
                obj.url = drag.DragManager.dragSource.url
                obj.name = "新对象";
                obj.pos = MainEditorProcessor.edItorSceneManager.getGroundPos(new Vector2D(evt.data.x, evt.data.y))

                if (drag.DragManager.dragSource.url.indexOf(".lyf") != -1) {
                    ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.INPUT_LYF_TO_SCENE), obj)
                } 
                if (drag.DragManager.dragSource.url.indexOf(".skill") != -1) {
                    ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.INPUT_SKILL_TO_SCENE), obj)
                } 
                if (drag.DragManager.dragSource.url.indexOf(".prefab") != -1) {
                    ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.INPUT_PREFAB_TO_SCENE), obj)
                }
                if (drag.DragManager.dragSource.url.indexOf(".zzw") != -1) {
                    ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.INPUT_ZZW_TO_SCENE), obj)
                }

              
            }
        }
  
        private upFrame(t: number): void {
       
            if (this.hasStage) {
                MainEditorProcessor.edItorSceneManager.textureRes = this._sceneViewRender.textureRes;
                var cam3D: Pan3d.Camera3D = MainEditorProcessor.edItorSceneManager.cam3D
                cam3D.cavanRect.x = this.a_scene_view.x + this.left;
                cam3D.cavanRect.y = this.a_scene_view.y + this.top;
                cam3D.cavanRect.width = this.a_scene_view.width;
                cam3D.cavanRect.height = this.a_scene_view.height;

                MainEditorProcessor.edItorSceneManager.renderToTexture()
            }
        }
       
     
        public resize(): void {
            super.resize();
        }
     
        public panelEventChanger(value: Rectangle): void {
          

            this.setRect(value)
            this.refrishSize()

        }
        public refrishSize(): void {
  
   

            if (this.uiLoadComplete) {
                var roundNum: number = 1;
                this.a_scene_view.x = roundNum;
                this.a_scene_view.y = roundNum+22;
                this.a_scene_view.width = this.pageRect.width - roundNum * 2;
                this.a_scene_view.height = this.pageRect.height - roundNum * 2-20;

                if (this.e_centen_panel) {
                    this.e_centen_panel.x = 0
                    this.e_centen_panel.y = 0
                    this.e_centen_panel.width = this.pageRect.width;
                    this._baseMidRender.applyObjData();
              
                }

                this.e_line_left.x = 1;
                this.e_line_left.y = 0;
                this.e_line_left.height = this.pageRect.height;

                this.e_line_right.x = this.pageRect.width-3;
                this.e_line_right.y = 0;
                this.e_line_right.height = this.pageRect.height;

            }
            this.resize()
        }

  


    }

}

