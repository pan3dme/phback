declare module materialleft {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class MaterialLeftPanel extends win.BaseWindow {
        only: boolean;
        constructor();
        propPanle: prop.UiMeshSprite;
        private materiaMeshView;
        private addPojectView;
        private _materialTree;
        materialTree: materialui.MaterialTree;
        protected loadConfigCom(): void;
        protected butClik(evt: InteractiveEvent): void;
        private initView;
        resize(): void;
        private _inputHtmlSprite;
        protected selectInputDae(evt: InteractiveEvent): void;
        private changeFile;
        private isRoleFile;
    }
}
