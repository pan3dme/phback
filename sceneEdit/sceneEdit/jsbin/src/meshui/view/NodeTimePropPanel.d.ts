declare module prop {
    class NodeTimePropPanel extends MetaDataView {
        private timeNodeUI;
        getView(): Array<any>;
        data: any;
        timeInterval: number;
        numScale: number;
        private changeData;
    }
}
