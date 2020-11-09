declare module maineditor {
    class EditorModel {
        static _instance: EditorModel;
        static getInstance(): EditorModel;
        constructor();
        loadHideMixImg($url: string, $fun: Function): void;
        private convertCanvasToImage;
        private makeMixPicByUrl;
        private dataURLtoFile;
        openFileByUrl(fileUrl: string): void;
        hierarchyListPanel: HierarchyListPanel;
        selectItem: Array<FolderMeshVo>;
        addSelctItem(value: Array<FolderMeshVo>, isShift: boolean): void;
        keyDeleSelectItem(): void;
        deleSelectItem(): void;
        fileItem: Array<FolderMeshVo>;
        private mouseHitSprite;
        selectModel(mouseVect2d: Vector2D): Array<FolderMeshVo>;
    }
}
