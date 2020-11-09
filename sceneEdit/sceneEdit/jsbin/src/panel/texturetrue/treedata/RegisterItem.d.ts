declare module materialui {
    class RegisterItem {
        id: number;
        inUse: boolean;
        url: string;
        xUse: boolean;
        yUse: boolean;
        zUse: boolean;
        wUse: boolean;
        hasInit: boolean;
        constructor($id: number);
        getUse($nodeTree: NodeTree): boolean;
    }
}
