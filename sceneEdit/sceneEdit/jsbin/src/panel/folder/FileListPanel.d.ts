declare module filelist {
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import Rectangle = Pan3d.Rectangle;
    import FileVo = pack.FileVo;
    class SampleFileVo {
        id: number;
        perent: number;
        data: FileVo;
    }
    class FileListMeshVo extends Pan3d.baseMeshVo {
        private _name;
        fileXmlVo: SampleFileVo;
        ty: number;
        cellHeightNum: number;
        childItem: Array<FileListMeshVo>;
        needDraw: boolean;
        constructor();
        name: string;
        destory(): void;
    }
    class FileListName extends Disp2DBaseText {
        fileListMeshVo: FileListMeshVo;
        private lastSelect;
        private lastName;
        makeData(): void;
        private tempDown;
        private drawFileIconName;
        update(): void;
    }
    class PathurlRect extends Rectangle {
        pathurl: string;
    }
    class PathurlLabel extends prop.TextLabelUI {
        constructor();
        pathurlLabelMove($evt: InteractiveEvent): void;
        pathurlLabelDown($evt: InteractiveEvent): void;
        label: string;
        private areaRectItem;
        setPath(value: any): void;
    }
    class FileListPanel extends win.Dis2dBaseWindow {
        static imgBaseDic: any;
        constructor();
        private pathlistBg;
        private pathurlLabel;
        protected loadConfigCom(): void;
        onMouseWheel($evt: MouseWheelEvent): void;
        private readonly isCanToDo;
        resize(): void;
        private loadAssetImg;
        private loadTempOne;
        update(t: number): void;
        private _lastfileDonwInfo;
        protected fileMouseDown(evt: InteractiveEvent): void;
        private timeOutMakeDragFun;
        private lastDragEvent;
        private makeDragData;
        private fileDuboclik;
        private selectFileClik;
        protected fileMouseUp(evt: InteractiveEvent): void;
        private selectFileIcon;
        private clearListAll;
        refrishPath(filePath: string): void;
        addRender($uiRender: UIRenderComponent): void;
        private getItemVoByUi;
        private makeItemUiList;
        private onRightMenuFun;
        onRightMenu($evt: MouseEvent): void;
        private makeFileFloadMenu;
        private makeFileListMenu;
        private menuBfun;
        downFile(): void;
        changeFileName(): void;
        private creatTexture;
        private refrishIndexGroup;
        private creatPefab;
        deleFile(): void;
        private _inputHtmlSprite;
        protected upTempFileToOss(): void;
        private changeFile;
        private resetSampleFilePos;
        private getcontentHeight;
        private fileItem;
        getCharNameMeshVo(value: SampleFileVo): FileListMeshVo;
    }
}
