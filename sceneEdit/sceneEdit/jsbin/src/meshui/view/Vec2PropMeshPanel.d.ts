declare module prop {
    import Vector2D = Pan3d.Vector2D;
    class Vec2PropMeshPanel extends MetaDataView {
        private constVec2NodeUI;
        getView(): Array<any>;
        vec2data: Vector2D;
        data: any;
        private changeData;
    }
}
