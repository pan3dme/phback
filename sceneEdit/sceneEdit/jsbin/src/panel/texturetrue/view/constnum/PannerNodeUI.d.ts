declare module materialui {
    import Vector2D = Pan3d.Vector2D;
    class PannerNodeUI extends BaseMaterialNodeUI {
        private inItem;
        private inSpeedItem;
        private outItem;
        private _coordinate;
        private _speed;
        constructor();
        speed: Vector2D;
        coordinate: Vector2D;
        setData(obj: any): void;
    }
}
