declare module prop {
    class Texture3DMeshPanel extends MetaDataView {
        getView(): Array<any>;
        private textureSampleNodeUI;
        data: any;
        picurl: string;
        constValue: number;
        wrapValue: number;
        mipmapValue: number;
        filterValue: number;
        permulValue: number;
        private changeData;
    }
}
