declare module editscene {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    class EditSceneEvent extends BaseEvent {
        static SHOW_EDITSCENE_PANEL: string;
        static EDITE_SCENE_RESIZE: string;
        static SHOW_HIDE_EDIT_TEMP_PANEL: string;
        static EDITE_SCENE_UI_LOAD_COMPLETE: string;
    }
    class EditSceneModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class EditSceneProcessor extends BaseProcessor {
        getName(): string;
        private _editScenePanel;
        protected receivedModuleEvent($event: BaseEvent): void;
        private initSceneData;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}
