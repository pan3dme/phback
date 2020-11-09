module materialleft {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import UIManager = Pan3d.UIManager;
    import LoadManager = Pan3d.LoadManager;
    import Scene_data = Pan3d.Scene_data
    import ModuleEventManager = Pan3d.ModuleEventManager;

    import MaterialEvent = materialui.MaterialEvent

    export class MaterialLeftEvent extends BaseEvent {
        public static SHOW_MATERIAL_LEFT_PANEL: string = "SHOW_MATERIAL_LEFT_PANEL";  
        public static HIDE_MATERIAL_LEFT_PANEL: string = "HIDE_MATERIAL_LEFT_PANEL";  
   
    }
    export class MaterialLeftModule extends Module {
        public getModuleName(): string {
            return "MaterialLeftModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MaterialLeftProcessor()];
        }
    }

    export class MaterialLeftProcessor extends BaseProcessor {
        public getName(): string {
            return "MaterialLeftProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MaterialLeftEvent) {
                var $leftEvent: MaterialLeftEvent = <MaterialLeftEvent>$event;
                if ($leftEvent.type == MaterialLeftEvent.SHOW_MATERIAL_LEFT_PANEL) {
                    this.showLeftPanel();
                    this.readBaseModel();
                }
                if ($leftEvent.type == MaterialLeftEvent.HIDE_MATERIAL_LEFT_PANEL) {
                    this.hideLeftPanel();
                }
           
            }
 
            if ($event instanceof MaterialEvent) {
                var $materialEvent: MaterialEvent = <MaterialEvent>$event;
                if ($materialEvent.type == MaterialEvent.INUPT_NEW_MATERIAL_FILE) {
                    this.materialLeftPanel.materialTree = $materialEvent.data
                }
            }
         
        }
        private readBaseModel(): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + "objs/model_2.objs", LoadManager.XML_TYPE,
                ($modelxml: string) => {
                    left.ModelShowModel.getInstance().readTxtToModelBy($modelxml)
  
                });
        }
        private hideLeftPanel(): void {
            editscene.EditLeftPanel.leftPanel.removeUIContainer(this.materialLeftPanel);
        }
        private showLeftPanel(): void {
            if (!this.materialLeftPanel) {
                this.materialLeftPanel = new MaterialLeftPanel
            }
            if (!this.materialLeftPanel.hasStage) {
                editscene.EditLeftPanel.leftPanel.addUIContainer(this.materialLeftPanel)
            } 
        }
  
        private materialLeftPanel: MaterialLeftPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MaterialLeftEvent(MaterialLeftEvent.SHOW_MATERIAL_LEFT_PANEL),
                new MaterialLeftEvent(MaterialLeftEvent.HIDE_MATERIAL_LEFT_PANEL),
 

                new MaterialEvent(MaterialEvent.INUPT_NEW_MATERIAL_FILE),


            ];
        }
    }
}