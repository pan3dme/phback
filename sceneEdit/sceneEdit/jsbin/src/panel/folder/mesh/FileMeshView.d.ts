declare module filelist {
    import MetaDataView = prop.MetaDataView;
    class FileMeshView extends MetaDataView {
        getView(): Array<any>;
        eventKey(value: string): void;
        fileUrl: string;
        data: any;
    }
}
