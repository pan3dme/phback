declare module pack {
    import Material = Pan3d.Material;
    import ObjData = Pan3d.ObjData;
    import EventDispatcher = Pan3d.EventDispatcher;
    class Prefab extends EventDispatcher implements ITile {
        getName(): string;
        url: string;
        objsurl: string;
        objData: ObjData;
        textureurl: string;
        material: Material;
        version: number;
    }
}
