declare module maineditor {
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import Vector2D = Pan3d.Vector2D;
    import Shader3D = Pan3d.Shader3D;
    import Display3D = Pan3d.Display3D;
    import PrefabStaticMesh = pack.PrefabStaticMesh;
    class TestDiplay3dShader extends Shader3D {
        static TestDiplay3dShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class ModelSprite extends left.MaterialModelSprite {
        constructor();
        update(): void;
        private baseTextureres;
        private baseModeShader;
        private drawBaseModel;
        private _prefab;
        prefab: PrefabStaticMesh;
        private meshParamInfo;
        setPreFabUrl(url: string, bfun?: Function): void;
    }
    class OssListFile extends HierarchyFileNode {
    }
    class FolderMeshVo extends Pan3d.baseMeshVo {
        ossListFile: OssListFile;
        childItem: Array<FolderMeshVo>;
        needDraw: boolean;
        dis: Display3D;
        cellPos: Vector2D;
        constructor();
        name: string;
        destory(): void;
    }
    class FolderName extends Disp2DBaseText {
        folderMeshVo: FolderMeshVo;
        makeData(): void;
        update(): void;
    }
    class HierarchyListPanel extends win.Dis2dBaseWindow {
        only: boolean;
        static imgBaseDic: any;
        constructor();
        protected makeOtherRender(): UIRenderComponent;
        protected loadConfigCom(): void;
        private readonly isCanToDo;
        onMouseWheel($evt: MouseWheelEvent): void;
        private _cellBgRender;
        private loadAssetImg;
        private loadTempOne;
        update(t: number): void;
        changeFileName($vo: FolderName): void;
        private makeFileFloadMenu;
        private menuBfun;
        deleFile(item: Array<FolderMeshVo>, vo: FolderMeshVo): void;
        protected itemMouseUp(evt: InteractiveEvent): void;
        private showMeshView;
        private showXyzMove;
        private hidefileItemBg;
        private clearChildern;
        private isCompelet;
        protected makeItemUiList(): void;
        private onKeyDownFun;
        private onKeyDown;
        addRender($uiRender: UIRenderComponent): void;
        private loadBaseSceneUrl;
        private onRightMenuFun;
        onRightMenu($evt: MouseEvent): void;
        private selectFolderMeshVo;
        private getItemVoByUi;
        private wirteItem;
        inputZzwToScene(temp: any): void;
        inputLyfToScene(temp: any): void;
        inputSkillToScene(temp: any): void;
        inputPrefabToScene(temp: any): void;
        private makeModelSprite;
        clearSceneAll(): void;
        private _sceneProjectVo;
        readMapFile(mapUrl: string): void;
        private addBasrole;
        selectModelEvet(tempItem: Array<FolderMeshVo>, isshift?: boolean): void;
        saveMap(): void;
        private getWillSaveItem;
        protected changeScrollBar(): void;
        resize(): void;
        private refrishFolder;
        private cellBgItem;
        private showSelectBg;
        private moveAllTy;
        private getItemDisNum;
        private listTy;
        private disChiendren;
    }
}
