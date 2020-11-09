declare module lou16.me {
    class PanSceneSprite extends LayaPan3D.LayaScene2D {
        private _stat;
        constructor();
        protected initScene(): void;
        readonly scene: PanScene;
        showStat(): void;
        hideStat(): void;
        destroy(destroyChild?: boolean): void;
    }
}
