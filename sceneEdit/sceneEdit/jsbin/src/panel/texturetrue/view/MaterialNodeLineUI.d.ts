declare module materialui {
    import Vector2D = Pan3d.Vector2D;
    class BezierClasszip {
        static drawbezier(_array: Array<Vector2D>, _time: number): Vector2D;
        private static mathmidpoint;
    }
    class MaterialNodeLineUI {
        lineRender: NodeLineLinkComponent;
        fromNode: ItemMaterialUI;
        endNode: ItemMaterialUI;
        dragMode: Boolean;
        startPoint: Vector2D;
        endPoint: Vector2D;
        needNodeType: boolean;
        currentHasNode: ItemMaterialUI;
        parent: MaterialLineContainer;
        constructor();
        setFromNode($node: ItemMaterialUI): void;
        private mousePos;
        private onMove;
        setEndNode($node: ItemMaterialUI): void;
        setNodeLine(): void;
        removeStage(): void;
        draw(): void;
        remove(): void;
    }
}
