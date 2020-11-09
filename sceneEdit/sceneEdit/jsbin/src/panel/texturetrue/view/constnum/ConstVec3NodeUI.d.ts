declare module materialui {
    import Vector3D = Pan3d.Vector3D;
    class ConstVec3NodeUI extends BaseMaterialNodeUI {
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
        showDynamic(): void;
        getNumStr(num: number): string;
    }
}
