declare module Pan3d {
    class MaterialBaseParam extends GC {
        material: Material;
        dynamicTexList: Array<any>;
        dynamicConstList: Array<any>;
        destory(): void;
        update(): void;
        setData($material: Material, $ary: Array<any>): void;
    }
}
