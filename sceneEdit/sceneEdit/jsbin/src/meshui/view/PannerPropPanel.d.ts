declare module prop {
    class PannerPropPanel extends MetaDataView {
        private pannerNodeUI;
        getView(): Array<any>;
        private _coordinate;
        data: any;
        coordinateX: number;
        coordinateY: number;
        speedX: number;
        speedY: number;
        private changeData;
    }
}
