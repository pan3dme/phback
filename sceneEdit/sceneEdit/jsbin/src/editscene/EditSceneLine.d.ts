declare module editscene {
    import Sprite = win.Sprite;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class TempSceneLine extends win.BaseWindow {
        private leftLine;
        private rightLine;
        private bottomLine;
        private leftLineMin;
        private rightLineMin;
        private bottomLineMin;
        private closeLeftBut;
        private closeRightBut;
        private closeBottomBut;
        protected loadConfigCom(): void;
        private hideItemDic;
        protected butClik(evt: InteractiveEvent): void;
        leftSpeed: number;
        private _leftSpeed;
        rightSpeed: number;
        private _rightSpeed;
        bottomSpeed: number;
        private _bottomSpeed;
        private leftWidthNum;
        private rightWidthNum;
        private bottomHeightNum;
        resize(): void;
        protected lastLaoutVec: Vector3D;
        protected tittleMouseDown(evt: InteractiveEvent): void;
        private menuHeight;
        protected mouseOnTittleMove(evt: InteractiveEvent): void;
    }
    class EditSceneLine extends Sprite {
        private winBg;
        constructor(has?: boolean);
    }
}
