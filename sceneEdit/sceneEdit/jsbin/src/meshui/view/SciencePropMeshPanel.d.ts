declare module prop {
    import Vector3D = Pan3d.Vector3D;
    class SciencePropMeshPanel extends MetaDataView {
        getView(): Array<any>;
        data: any;
        sunDirect: Vector3D;
        sunColor: Vector3D;
        ambientColor: Vector3D;
    }
}
