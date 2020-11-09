declare module materialui {
    class TimeNodeUI extends BaseMaterialNodeUI {
        private outItem;
        private _speed;
        constructor();
        speed: number;
        timeValue: Vector2D;
        getData(): Object;
        setData(obj: any): void;
    }
}
