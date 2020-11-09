declare module materialui {
    class NodeTreeInputItem extends NodeTreeItem {
        private _parentNodeItem;
        hasCompiled: boolean;
        constructor();
        parentNodeItem: NodeTreeOutoutItem;
        getObj(): Object;
    }
}
