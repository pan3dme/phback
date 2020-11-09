declare module materialui {
    class NodeTreeOutoutItem extends NodeTreeItem {
        constructor();
        sunNodeItems: Array<NodeTreeInputItem>;
        pushSunNode(nodeitem: NodeTreeInputItem): void;
        removeSunNode(nodeitem: NodeTreeInputItem): void;
        getObj(): Object;
    }
}
