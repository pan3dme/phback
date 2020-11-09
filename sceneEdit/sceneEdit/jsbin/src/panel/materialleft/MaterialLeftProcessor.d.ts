declare module materialleft {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    class MaterialLeftEvent extends BaseEvent {
        static SHOW_MATERIAL_LEFT_PANEL: string;
        static HIDE_MATERIAL_LEFT_PANEL: string;
    }
    class MaterialLeftModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class MaterialLeftProcessor extends BaseProcessor {
        getName(): string;
        protected receivedModuleEvent($event: BaseEvent): void;
        private readBaseModel;
        private hideLeftPanel;
        private showLeftPanel;
        private materialLeftPanel;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}
