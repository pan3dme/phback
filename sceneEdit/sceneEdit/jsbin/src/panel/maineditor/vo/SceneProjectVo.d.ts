declare module maineditor {
    import EventDispatcher = Pan3d.EventDispatcher;
    import MaterialBaseParam = Pan3d.MaterialBaseParam;
    class SceneProjectVo extends EventDispatcher {
        paramInfo: Array<any>;
        materialParam: MaterialBaseParam;
        gildline: boolean;
        scenescale: number;
        material: materialui.MaterialTree;
        textureurl: string;
        constructor(value: any);
        meshObj(value: any): void;
        getSaveObj(): any;
    }
}
