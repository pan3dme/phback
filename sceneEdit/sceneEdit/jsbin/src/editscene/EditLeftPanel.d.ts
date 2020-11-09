declare module editscene {
    import Panel = win.Panel;
    import UIConatiner = Pan3d.UIConatiner;
    class EditLeftPanel extends Panel {
        static leftPanel: EditLeftPanel;
        addUIContainer($container: UIConatiner): void;
        private removeNeedRemove;
        removeUIContainer($container: UIConatiner): void;
        resize(): void;
    }
}
