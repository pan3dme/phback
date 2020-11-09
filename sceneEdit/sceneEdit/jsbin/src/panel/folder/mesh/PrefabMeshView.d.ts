declare module filelist {
    import Material = Pan3d.Material;
    import MetaDataView = prop.MetaDataView;
    class PrefabMeshView extends MetaDataView {
        private prefabStaticMesh;
        getView(): Array<any>;
        eventKey(value: string): void;
        private textureChangeInfo;
        private chuangeData;
        getParamItem(value: string): any;
        prebaburl: string;
        texture: Material;
        objsurl: string;
        data: any;
        private isSaveNow;
        private lastTm;
        private saveTm;
        saveToSever(): void;
    }
}
