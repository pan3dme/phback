module editscene {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import ModuleEventManager = Pan3d.ModuleEventManager
 


    export class EditSceneEvent extends BaseEvent {
        public static SHOW_EDITSCENE_PANEL: string = "SHOW_EDITSCENE_PANEL";
        public static EDITE_SCENE_RESIZE: string = "EDITE_SCENE_RESIZE";
        public static SHOW_HIDE_EDIT_TEMP_PANEL: string = "SHOW_HIDE_EDIT_TEMP_PANEL";
        public static EDITE_SCENE_UI_LOAD_COMPLETE: string = "EDITE_SCENE_UI_LOAD_COMPLETE";

    }
    export class EditSceneModule extends Module {
        public getModuleName(): string {
            return "EditSceneModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new EditSceneProcessor()];
        }
    }

    export class EditSceneProcessor extends BaseProcessor {
        public getName(): string {
            return "EditSceneProcessor";
        }
        private _editScenePanel: EditScenePanel
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof EditSceneEvent) {
                var $editSceneEvent: EditSceneEvent = <EditSceneEvent>$event;
                if ($editSceneEvent.type == EditSceneEvent.SHOW_EDITSCENE_PANEL) {
                    this._editScenePanel = new EditScenePanel
                    this._editScenePanel.x = 300
                    this._editScenePanel.y = 300
                    this._editScenePanel.width = 450
                    this._editScenePanel.height = 500
                    win.LayerManager.getInstance().addPanel(this._editScenePanel, 100)

                }
                if ($editSceneEvent.type == EditSceneEvent.EDITE_SCENE_UI_LOAD_COMPLETE) {
             
                    this.initSceneData()
                }
            }
        }
        private initSceneData(): void {
            var $nameKey = "scene.map"
            if (localStorage.getItem("mapurl")) {
                $nameKey = localStorage.getItem("mapurl");
            }

            if (getUrlParam("mapurl")) {
                $nameKey = getUrlParam("mapurl");
                console.log($nameKey)
            }


            maineditor.EditorModel.getInstance().openFileByUrl($nameKey)
            //if ($nameKey.indexOf(".material") != -1) {
            //    Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), $nameKey);//加载材质
            //}

            //if ($nameKey.indexOf(".map") != -1) {
            //    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.LOAD_SCENE_MAP), $nameKey); //加载场景
 
            //}

    
           
        }
     
 
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new EditSceneEvent(EditSceneEvent.SHOW_EDITSCENE_PANEL),
                new EditSceneEvent(EditSceneEvent.SHOW_HIDE_EDIT_TEMP_PANEL),
                new EditSceneEvent(EditSceneEvent.EDITE_SCENE_UI_LOAD_COMPLETE),
 
            ];
        }
    }

}