declare module xyz {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import UIConatiner = Pan3d.UIConatiner;
    class MoveScaleRotatioinEvent extends BaseEvent {
        static INIT_MOVE_SCALE_ROTATION: string;
        static INIT_UICONTAINER_TO_XYZ: string;
        static MAKE_DTAT_ITEM_TO_CHANGE: string;
        static CLEAR_XYZ_MOVE_DATA: string;
    }
    class MoveScaleRotatioinModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class MoveScaleRotatioinProcessor extends BaseProcessor {
        getName(): string;
        uiContainer: UIConatiner;
        private moveScaleRotationLevel;
        protected receivedModuleEvent($event: BaseEvent): void;
        private makeBaseData;
        private mouseInfo;
        private selectScene;
        private onMouseWheelFun;
        private onMouseDownFun;
        private onMouseMoveFun;
        private onMouseUpFun;
        private onKeyDownFun;
        private onKeyUpFun;
        private addEvents;
        private removeEvents;
        private selectVec;
        private getCamData;
        private readonly isCanToDo;
        private A;
        private B;
        private C;
        private baseCamData;
        private disMatrix3D;
        private onMouseMove;
        private mouseHitInWorld3D;
        private middleMovetType;
        private _middleMoveVe;
        private onMouseDown;
        private onMouseUp;
        private onKeyDown;
        private cancalAltKey;
        private onKeyUp;
        onMouseWheel($evt: MouseWheelEvent): void;
        private getCamForntPos;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}
