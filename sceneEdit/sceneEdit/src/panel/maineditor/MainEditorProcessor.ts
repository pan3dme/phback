module maineditor {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import UIManager = Pan3d.UIManager;
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import UIConatiner = Pan3d.UIConatiner
    import Rectangle = Pan3d.Rectangle
    import MouseType = Pan3d.MouseType
    import UICompenent = Pan3d.UICompenent
    import MathClass = Pan3d.MathClass
    import KeyboardType = Pan3d.KeyboardType
    import MaterialModelSprite = left.MaterialModelSprite
    import Panel = win.Panel
    import EditSceneEvent = editscene.EditSceneEvent
    import EditLeftPanel = editscene.EditLeftPanel
    

    export class MainEditorEvent extends BaseEvent {
        public static LOAD_SCENE_MAP: string = "LOAD_SCENE_MAP";  
        public static INIT_MAIN_EDITOR_PANEL: string = "INIT_MAIN_EDITOR_PANEL";  
        public static SHOW_MAIN_EDITOR_PANEL: string = "SHOW_MAIN_EDITOR_PANEL";  
        public static INPUT_PREFAB_TO_SCENE: string = "INPUT_PREFAB_TO_SCENE";  
        public static INPUT_ZZW_TO_SCENE: string = "INPUT_ZZW_TO_SCENE";  
        public static INPUT_LYF_TO_SCENE: string = "INPUT_LYF_TO_SCENE"; 
        public static INPUT_SKILL_TO_SCENE: string = "INPUT_SKILL_TO_SCENE"; 
        public static SAVE_SCENE_MAP_TO_SEVER: string = "SAVE_SCENE_MAP_TO_SEVER";  
        public static CLEAR_SCENE_MAP_ALL: string = "CLEAR_SCENE_MAP_ALL";  
        public static SHOW_SCENE_POJECT_MESH_VIEW: string = "SHOW_SCENE_POJECT_MESH_VIEW";  
        public static SCENE_SELECT_SPRITE_DOWN: string = "SCENE_SELECT_SPRITE_DOWN";   //选取舞台物件
        public static CHANGE_LEFT_PANEL_SHOW: string = "CHANGE_LEFT_PANEL_SHOW";   //选取舞台物件
        
  
 
    }
    export class MainEditorModule extends Module {
        public getModuleName(): string {
            return "MainEditorModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MainEditorProcessor()];
        }
    }

    export class MainEditorProcessor extends BaseProcessor {
        public getName(): string {
            return "MainEditorProcessor";
        }
        private _mainEditorPanel: MainEditorPanel;
        public static edItorSceneManager: EdItorSceneManager

    
        private initPanelConfig(): void {
            if (!this._hierarchyListPanel) {
                this._hierarchyListPanel = new HierarchyListPanel();
            }

            if (!this._mainEditorPanel) {
                this._mainEditorPanel = new MainEditorPanel();
                AppData.centenPanel.addUIContainer(this._mainEditorPanel);
            }

        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof materialui.MaterialEvent) {
                var $materialEvent: materialui.MaterialEvent = <materialui.MaterialEvent>$event;
                if ($materialEvent.type == materialui.MaterialEvent.SHOW_MATERIA_PANEL) {
                    this._mainEditorPanel.showType = 2
                    this._mainEditorPanel.editorOpenList.pushPathUrl($materialEvent.data)

                    var pathname: Array<string> = window.location.pathname.split("/")
                    var newUrl = pathname[pathname.length - 1] + "?mapurl=" + $materialEvent.data
                    history.pushState(null, "", newUrl);
                }
            }
            if ($event instanceof MainEditorEvent) {
                var $mainEditorEvent: MainEditorEvent = <MainEditorEvent>$event;
                if ($mainEditorEvent.type == MainEditorEvent.INIT_MAIN_EDITOR_PANEL) {
                    this.maseSceneManager()
                    this.initPanelConfig();
                    this.addEvents()
                }
                if ($mainEditorEvent.type == MainEditorEvent.SHOW_MAIN_EDITOR_PANEL) {
 
                    this._mainEditorPanel.showType=1
             
                    EditLeftPanel.leftPanel.addUIContainer(this._hierarchyListPanel);
   
                    Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.INIT_UICONTAINER_TO_XYZ), this._mainEditorPanel)
 
                    editscene.EditTopMenuPanel.getInstance().makeSceneTopMenu()
 
 
                }
                if ($mainEditorEvent.type == MainEditorEvent.INPUT_PREFAB_TO_SCENE) {
                    this._hierarchyListPanel.inputPrefabToScene($mainEditorEvent.data)
                }
                if ($mainEditorEvent.type == MainEditorEvent.INPUT_LYF_TO_SCENE) {
                    this._hierarchyListPanel.inputLyfToScene($mainEditorEvent.data)

                }
                if ($mainEditorEvent.type == MainEditorEvent.INPUT_SKILL_TO_SCENE) {
                    this._hierarchyListPanel.inputSkillToScene($mainEditorEvent.data)

                }
                if ($mainEditorEvent.type == MainEditorEvent.INPUT_ZZW_TO_SCENE) {
                    this._hierarchyListPanel.inputZzwToScene($mainEditorEvent.data)

                }
           
                if ($mainEditorEvent.type == MainEditorEvent.SHOW_SCENE_POJECT_MESH_VIEW) {
                    this.showScnePojectView($mainEditorEvent.data);

                    this._mainEditorPanel.sceneProjectVo=$mainEditorEvent.data
                }
                if ($mainEditorEvent.type == MainEditorEvent.LOAD_SCENE_MAP) {

                    this._hierarchyListPanel.readMapFile($mainEditorEvent.data);

          
          
                    var pathname: Array<string> = window.location.pathname.split("/")
                    var newUrl = pathname[pathname.length - 1] + "?mapurl=" + $mainEditorEvent.data
                    history.pushState(null, "", newUrl);

                    this._mainEditorPanel.editorOpenList.pushPathUrl($mainEditorEvent.data)
 
              
                }
                if ($mainEditorEvent.type == MainEditorEvent.CHANGE_LEFT_PANEL_SHOW) {
                    if (this._hierarchyListPanel) {
                        if (this._hierarchyListPanel.hasStage) {
                            EditLeftPanel.leftPanel.removeUIContainer(this._hierarchyListPanel);
                        } else {
                            EditLeftPanel.leftPanel.addUIContainer(this._hierarchyListPanel);
                        }
                    }
                }
                

                if ($mainEditorEvent.type == MainEditorEvent.SAVE_SCENE_MAP_TO_SEVER) {

                    this._hierarchyListPanel.saveMap()
                }
            
                if ($mainEditorEvent.type == MainEditorEvent.CLEAR_SCENE_MAP_ALL) {


                    while (maineditor.EditorModel.getInstance().fileItem.length) {
                        maineditor.EditorModel.getInstance().selectItem =[ maineditor.EditorModel.getInstance().fileItem[0]]
                        maineditor.EditorModel.getInstance().deleSelectItem()
                    }
                
                }
                if ($mainEditorEvent.type == MainEditorEvent.SCENE_SELECT_SPRITE_DOWN) {

           
                    var tempItem: Array<FolderMeshVo> = EditorModel.getInstance().selectModel(new Vector2D($event.data.x - MainEditorProcessor.edItorSceneManager.cam3D.cavanRect.x, $event.data.y - MainEditorProcessor.edItorSceneManager.cam3D.cavanRect.y))
                    this._hierarchyListPanel.selectModelEvet(tempItem, $event.data.mouseEvent.shiftKey)
                }


                this.changePageRect()
  
            }
            if ($event instanceof EditSceneEvent) {
                if ($event.type = EditSceneEvent.EDITE_SCENE_RESIZE) {
                    this.changePageRect()
                }
            }
        }
        private sceneProjectVo: SceneProjectVo;
        private showScnePojectView(value: any): void {
            if (value) {
                this.sceneProjectVo = value
            }
       
        
            var _cenePojectMeshView: ScenePojectMeshView = new ScenePojectMeshView(prop.PropModel.getInstance().propPanle);
            _cenePojectMeshView.data = this.sceneProjectVo;
            prop.PropModel.getInstance().showOtherMeshView(_cenePojectMeshView);

        }
   
        private onMouseWheelFun: any;
        private onMouseDownFun: any;
        private onMouseMoveFun: any;
        private onMouseUpFun: any;
        private onKeyDownFun: any;
        private onKeyUpFun: any;
        private addEvents(): void {
            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) };
                this.onMouseDownFun = ($evt: MouseEvent) => { this.onMouseDown($evt) };
                this.onMouseMoveFun = ($evt: MouseEvent) => { this.onMouseMove($evt) };
                this.onMouseUpFun = ($evt: MouseEvent) => { this.onMouseUp($evt) };
                this.onKeyDownFun = ($evt: KeyboardEvent) => { this.onKeyDown($evt) };
                this.onKeyUpFun = ($evt: KeyboardEvent) => { this.onKeyUp($evt) };
            }
            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.addEventListener(MouseType.MouseDown, this.onMouseDownFun);
            document.addEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.addEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.addEventListener(MouseType.KeyDown, this.onKeyDownFun)
            document.addEventListener(MouseType.KeyUp, this.onKeyUpFun)

            document.addEventListener("contextmenu", (event: any) => {
                event.preventDefault();
            });


        }
        private removeEvents(): void {
            document.removeEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.removeEventListener(MouseType.MouseDown, this.onMouseDownFun);
            document.removeEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.removeEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.removeEventListener(MouseType.KeyDown, this.onKeyDownFun)
            document.removeEventListener(MouseType.KeyUp, this.onKeyUpFun)
        }
        private onMouseMove($e: MouseEvent): void {
           
       
        }
        private onMouseDown($e: MouseEvent): void {
            if (this.isCanToDo) {

            
            }
   
         
        }
        private onMouseUp($e: MouseEvent): void {
        }
        private get hasStage(): boolean { //false为可以操作
            if (this._hierarchyListPanel.hasStage) {
                return true;
            } else {
                return false;
            }


        }
        private onKeyDown($evt: KeyboardEvent): void {
            if (!this.hasStage) {
                return
            } else {
                switch ($evt.keyCode) {

                    case KeyboardType.Delete:
                        console.log("删除选取")

                        maineditor.EditorModel.getInstance().keyDeleSelectItem()
                  
                        break
                    case KeyboardType.S:
                        break
                }
            }
 

        }
        private onKeyUp($e: KeyboardEvent): void {
        }
        private get isCanToDo(): boolean { //不能操作
            if (AppData.sceneEidtType==1) {
                return true;
            } else {
                return false;
            }

        }
        public onMouseWheel($evt: MouseWheelEvent): void {
            if (!this.isCanToDo) {
                return
            }
       
        }
        private maseSceneManager(): void {
            MainEditorProcessor.edItorSceneManager = new EdItorSceneManager();
            Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
          
            MainEditorProcessor.edItorSceneManager.ready = true;

        
       

            MainEditorProcessor.edItorSceneManager.cam3D = new Pan3d.Camera3D();
            MainEditorProcessor.edItorSceneManager.cam3D.distance = 100;
            MainEditorProcessor.edItorSceneManager.focus3D.rotationY = 0;
            MainEditorProcessor.edItorSceneManager.focus3D.rotationX = -45;

            MathClass.getCamView(MainEditorProcessor.edItorSceneManager.cam3D, MainEditorProcessor.edItorSceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵

            ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.INIT_MOVE_SCALE_ROTATION), MainEditorProcessor.edItorSceneManager);
          
     
        }
     
        private changePageRect(): void {
            if (this._hierarchyListPanel && EditLeftPanel.leftPanel) {
           
                    var rect: Rectangle = new Rectangle(EditLeftPanel.leftPanel.rect.x, EditLeftPanel.leftPanel.rect.y, EditLeftPanel.leftPanel.rect.width, EditLeftPanel.leftPanel.rect.height);
                    this._hierarchyListPanel.setRect(rect)
                
    
            }
 
            if (this._mainEditorPanel && AppData.centenPanel) {
                var rect: Rectangle = new Rectangle(AppData.centenPanel.rect.x, AppData.centenPanel.rect.y, AppData.centenPanel.rect.width , AppData.centenPanel.rect.height);
                this._mainEditorPanel.panelEventChanger(rect)
            }
        }
    

        private _hierarchyListPanel: HierarchyListPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MainEditorEvent(MainEditorEvent.INIT_MAIN_EDITOR_PANEL),
                new MainEditorEvent(MainEditorEvent.SHOW_MAIN_EDITOR_PANEL),
                new MainEditorEvent(MainEditorEvent.INPUT_PREFAB_TO_SCENE),
                new MainEditorEvent(MainEditorEvent.INPUT_ZZW_TO_SCENE),
                new MainEditorEvent(MainEditorEvent.INPUT_LYF_TO_SCENE),
                new MainEditorEvent(MainEditorEvent.INPUT_SKILL_TO_SCENE),
                new MainEditorEvent(MainEditorEvent.SAVE_SCENE_MAP_TO_SEVER),
                new MainEditorEvent(MainEditorEvent.SCENE_SELECT_SPRITE_DOWN),
                new MainEditorEvent(MainEditorEvent.CLEAR_SCENE_MAP_ALL),
                new MainEditorEvent(MainEditorEvent.SHOW_SCENE_POJECT_MESH_VIEW),
                new MainEditorEvent(MainEditorEvent.LOAD_SCENE_MAP),
                new MainEditorEvent(MainEditorEvent.CHANGE_LEFT_PANEL_SHOW),
                new EditSceneEvent(EditSceneEvent.EDITE_SCENE_RESIZE),
                new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL),

          
                
            ];
        }
    }
}