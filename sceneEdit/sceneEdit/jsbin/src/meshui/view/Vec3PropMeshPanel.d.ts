declare module prop {
    import Vector3D = Pan3d.Vector3D;
    class Vec3PropMeshPanel extends MetaDataView {
        private constVec3NodeUI;
        getView(): Array<any>;
        data: any;
        constValue: Vector3D;
        private changeData;
    }
}
