declare module win {
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIConatiner = Pan3d.UIConatiner;
    class UIPanelEvent extends Pan3d.BaseEvent {
        static DISPOSE_PANEL_EVENT: string;
        panel: UIPanel;
    }
    class UIPanel extends UIConatiner {
        private _disposeEventFun;
        constructor();
        onAdd(): void;
        onRemove(): void;
        addRender($uiRender: UIRenderComponent): void;
        removeRender($uiRender: UIRenderComponent): void;
    }
}
