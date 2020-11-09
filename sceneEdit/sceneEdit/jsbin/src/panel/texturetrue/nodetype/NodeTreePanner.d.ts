declare module materialui {
    import Vector2D = Pan3d.Vector2D;
    class NodeTreePanner extends NodeTree {
        coordinateValue: Vector2D;
        speedValue: Vector2D;
        constructor();
        getComponentID($id: number): string;
        checkInput(): boolean;
    }
}
