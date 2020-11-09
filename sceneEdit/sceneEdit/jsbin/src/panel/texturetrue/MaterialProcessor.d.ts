declare module materialui {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    class MaterialEvent extends BaseEvent {
        static INIT_MATERIA_PANEL: string;
        static SHOW_MATERIA_PANEL: string;
        static SAVE_MATERIA_PANEL: string;
        static SELECT_MATERIAL_NODE_UI: string;
        static COMPILE_MATERIAL: string;
        static INUPT_NEW_MATERIAL_FILE: string;
    }
    class MaterialModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class MaterialProcessor extends BaseProcessor {
        getName(): string;
        private baseWindow;
        private lastMaterialUrl;
        constructor();
        protected receivedModuleEvent($event: BaseEvent): void;
        private changeLeftMeshView;
        private onMouseWheelFun;
        private onMouseFun;
        private onMouseMoveFun;
        private onMouseUpFun;
        private onKeyDownFun;
        private onKeyUpFun;
        private onRightMenuFun;
        private readonly hasStage;
        private addEvents;
        onRightMenu($evt: MouseEvent): void;
        private removeEvents;
        private clearAllMaterialUi;
        private resetMaterialListUi;
        private _materialTree;
        private saveMateriaPanel;
        private getMakeProgemePrame;
        private selectNodeUi;
        setConnetLine($startItem: ItemMaterialUI, $endItem: ItemMaterialUI): void;
        removeLine($line: MaterialNodeLineUI): void;
        startDragLine($node: ItemMaterialUI): void;
        stopDragLine($node: ItemMaterialUI): void;
        private openMaterialPanel;
        private loadConfigCom;
        private baseMaterialTree;
        private readMaterialTree;
        onKeyDown($evt: KeyboardEvent): void;
        private delUI;
        private getCanUseParamName;
        private getSelUI;
        onKeyUp($evt: KeyboardEvent): void;
        private _isMidelMouse;
        private onMouse;
        private onMouseMove;
        private onMouseUp;
        private mouseXY;
        onMouseWheel($evt: MouseWheelEvent): void;
        private changeScalePanle;
        private stageMoveTx;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}
