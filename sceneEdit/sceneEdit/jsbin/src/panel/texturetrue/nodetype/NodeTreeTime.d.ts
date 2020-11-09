declare module materialui {
    class NodeTreeTime extends NodeTree {
        speed: number;
        timeValue: Vector2D;
        constructor();
        getComponentID($id: number): string;
    }
}
