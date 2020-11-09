declare module LayaPan3D {
    class LayaGame2dDemo extends LayaScene2D {
        constructor(w?: number, h?: number);
        protected initScene(): void;
        private mainChar;
        private addSceneModel;
        private addFramePartice;
        addGrouandPic(value: string, rect: Pan3d.Rectangle): LayaScene2dPicSprit;
        protected addEvents(): void;
        upData(): void;
        private onMouseWheel;
        private dragRegion;
        private onStartDrag;
    }
}
