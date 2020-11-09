declare module LayaPan3D {
    import EdItorSceneManager = maineditor.EdItorSceneManager;
    class Laya3dSprite extends Laya.Image {
        constructor(w?: number, h?: number);
        scale(scaleX: number, scaleY: number, speedMode?: boolean): Sprite;
        private resizeRect;
        protected initScene(): void;
        bgColor: Vector3D;
        protected addDisplay(): void;
        protected addRole(): void;
        protected addSkillRole(): void;
        private addLyfSprite;
        upData(): void;
        protected renderToTexture(): void;
        protected sceneManager: EdItorSceneManager;
    }
}
