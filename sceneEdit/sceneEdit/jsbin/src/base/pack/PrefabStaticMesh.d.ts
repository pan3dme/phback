declare module pack {
    class PrefabStaticMesh extends Prefab {
        paramInfo: Array<any>;
        sunColor: Vector3D;
        constructor();
        getObject(): any;
    }
}
