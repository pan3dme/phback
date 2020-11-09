declare module materialui {
    class MaterialCompile {
        private static _instance;
        static getInstance(): MaterialCompile;
        nodeList: Array<NodeTree>;
        priorityList: Array<Array<NodeTree>>;
        maxPriority: number;
        private _compileGlslServer;
        compile($list: Array<NodeTree>, $materialTree: MaterialTree): void;
        setPriority($node: NodeTree): void;
        getOpNode(): NodeTree;
        resetCompile($list: Array<NodeTree>): void;
        resetPriority(): void;
    }
}
