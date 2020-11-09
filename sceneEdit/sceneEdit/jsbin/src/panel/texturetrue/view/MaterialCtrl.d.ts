declare module materialui {
    import Panel = win.Panel;
    class MaterialCtrl {
        private static _instance;
        static getInstance(): MaterialCtrl;
        constructor();
        initData(): void;
        lineContainer: MaterialLineContainer;
        linePanel: Panel;
        nodeUiPanel: Panel;
        bgwinPanel: Panel;
        private _materialTree;
        private uiList;
        nodeList: Array<NodeTree>;
        addNodeUI(ui: BaseMaterialNodeUI): void;
        private addUIContainer;
        removeUI(ui: BaseMaterialNodeUI): void;
        getObj(): Object;
    }
}
