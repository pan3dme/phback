declare module maineditor {
    class FileNode {
        id: number;
        name: string;
        path: string;
        url: string;
        extension: string;
        children: Array<any>;
        rename: Boolean;
        parentNode: FileNode;
        data: any;
        static FILE_NODE: string;
        constructor();
    }
}
