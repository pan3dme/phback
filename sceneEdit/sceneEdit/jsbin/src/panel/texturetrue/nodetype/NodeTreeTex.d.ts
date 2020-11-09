declare module materialui {
    class NodeTreeTex extends NodeTree {
        url: string;
        isMain: boolean;
        wrap: number;
        mipmap: number;
        filter: number;
        permul: boolean;
        constructor();
        checkInput(): boolean;
    }
}
