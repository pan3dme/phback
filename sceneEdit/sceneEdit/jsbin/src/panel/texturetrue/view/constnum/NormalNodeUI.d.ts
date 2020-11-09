declare module materialui {
    import Vector3D = Pan3d.Vector3D;
    class NormalNodeUI extends BaseMaterialNodeUI {
        private outItem;
        private outAItem;
        private outRGBAItem;
        private _constValue;
        protected _bastTitleStr: String;
        constructor();
        getData(): Object;
        initNodeTree(): void;
        setData(obj: any): void;
        constValue: Vector3D;
    }
}
