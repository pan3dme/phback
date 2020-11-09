declare module maineditor {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    class MainEditorEvent extends BaseEvent {
        static LOAD_SCENE_MAP: string;
        static INIT_MAIN_EDITOR_PANEL: string;
        static SHOW_MAIN_EDITOR_PANEL: string;
        static INPUT_PREFAB_TO_SCENE: string;
        static INPUT_ZZW_TO_SCENE: string;
        static INPUT_LYF_TO_SCENE: string;
        static INPUT_SKILL_TO_SCENE: string;
        static SAVE_SCENE_MAP_TO_SEVER: string;
        static CLEAR_SCENE_MAP_ALL: string;
        static SHOW_SCENE_POJECT_MESH_VIEW: string;
        static SCENE_SELECT_SPRITE_DOWN: string;
        static CHANGE_LEFT_PANEL_SHOW: string;
    }
    class MainEditorModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class MainEditorProcessor extends BaseProcessor {
        getName(): string;
        private _mainEditorPanel;
        static edItorSceneManager: EdItorSceneManager;
        private initPanelConfig;
        protected receivedModuleEvent($event: BaseEvent): void;
        private sceneProjectVo;
        private showScnePojectView;
        private onMouseWheelFun;
        private onMouseDownFun;
        private onMouseMoveFun;
        private onMouseUpFun;
        private onKeyDownFun;
        private onKeyUpFun;
        private addEvents;
        private removeEvents;
        private onMouseMove;
        private onMouseDown;
        private onMouseUp;
        private readonly hasStage;
        private onKeyDown;
        private onKeyUp;
        private readonly isCanToDo;
        onMouseWheel($evt: MouseWheelEvent): void;
        private maseSceneManager;
        private changePageRect;
        private _hierarchyListPanel;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}
