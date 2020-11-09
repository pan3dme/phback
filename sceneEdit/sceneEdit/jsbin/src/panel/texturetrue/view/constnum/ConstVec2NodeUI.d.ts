declare module materialui {
    import Vector2D = Pan3d.Vector2D;
    class ConstVec2NodeUI extends BaseMaterialNodeUI {
        private outItem;
        constValue: Vector2D;
        getData(): Object;
        setData(obj: any): void;
        showDynamic(): void;
        getNumStr(num: number): string;
        constructor();
    }
}
