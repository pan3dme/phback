declare module drag {
    import UICompenent = Pan3d.UICompenent;
    import UIConatiner = Pan3d.UIConatiner;
    class DragPanel extends UIConatiner {
        private _bRender;
        private tempUiName;
        ui: UICompenent;
        constructor(w: number, h: number);
        setData(value: DragSource): void;
    }
}
