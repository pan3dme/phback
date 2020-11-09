declare module left {
    import Md5MoveSprite = md5list.Md5MoveSprite;
    class LocalMd5MoveSprite extends Md5MoveSprite {
        private meshItem;
        constructor();
        addLocalMeshByStr($str: string): void;
        addLocalAdimByStr($str: string): void;
        update(): void;
        protected loadBodyMesh(): void;
        protected loadAnimFrame(): void;
    }
}
