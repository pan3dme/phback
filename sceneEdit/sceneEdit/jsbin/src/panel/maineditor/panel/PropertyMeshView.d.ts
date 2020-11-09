declare module maineditor {
    import Vector3D = Pan3d.Vector3D;
    import MetaDataView = prop.MetaDataView;
    class PropertyMeshView extends MetaDataView {
        private xyzPosData;
        getView(): Array<any>;
        resize(): void;
        data: any;
        pos: Vector3D;
        rotation: Vector3D;
        scale: Vector3D;
    }
}
