declare module materialui {
    class NodeTreeItem {
        static IN: string;
        static OUT: string;
        node: NodeTree;
        inoutType: string;
        id: number;
        type: string;
        name: string;
        constructor();
        getObj(): Object;
        otherNeedObj(): Object;
    }
}
