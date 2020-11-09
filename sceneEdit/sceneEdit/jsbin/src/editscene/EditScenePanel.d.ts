declare module editscene {
    import Panel = win.Panel;
    import UIConatiner = Pan3d.UIConatiner;
    class CentenPanel extends Panel {
        addUIContainer($container: UIConatiner): void;
    }
    class EditScenePanel extends Panel {
        constructor();
        private _sceneLaoutLinePane;
        private addSceneLaoutLinePane;
        private addCenten;
        private addRight;
        private addTop;
        private addLeft;
    }
}
