declare module left {
    import Shader3D = Pan3d.Shader3D;
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    import Material = Pan3d.Material;
    import Display3D = Pan3d.Display3D;
    class ModelShowModel {
        private static _instance;
        static getInstance(): ModelShowModel;
        modelSprite: MaterialModelSprite;
        roleSprite: MaterialRoleSprite;
        addBaseModel(): void;
        changeWebModel(): void;
        webmd5Sprite: LocalMd5MoveSprite;
        private makeMd5MoveSprite;
        private _time;
        _bigPic: UIRenderOnlyPicComponent;
        update(t: any): void;
        selectShowDisp: Display3D;
        readTxtToModelBy(value: string): void;
        changeRoleUrl(value: string): void;
        private makeRoleShader;
        private makeBuldShader;
        outShaderStr($treeMater: materialui.MaterialTree): void;
        getMaterialProgram(key: String, shaderCls: any, $material: Material, paramAry?: any, parmaByFragmet?: boolean): Shader3D;
    }
}
