declare module win {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Rectangle = Pan3d.Rectangle;
    import UIConatiner = Pan3d.UIConatiner;
    class LayBaseTab extends UIConatiner {
        static imgBaseDic: any;
        constructor();
        private _bottomRender;
        private _topRender;
        protected mouseDown(evt: InteractiveEvent): void;
        private mouseIsDown;
        protected stageMouseMove(evt: InteractiveEvent): void;
        protected mouseUp(evt: InteractiveEvent): void;
        private loadFinish;
        protected loadConfigCom(): void;
        protected butClik(evt: InteractiveEvent): void;
        pageRect: Rectangle;
        private _pageRect;
        private a_bg;
        private a_win_tittle;
        private a_bottom_line;
        private a_right_bottom;
        private a_rigth_line;
        private a_left_line;
        private refrishSize;
    }
}
