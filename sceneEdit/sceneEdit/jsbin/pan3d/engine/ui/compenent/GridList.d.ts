declare module Pan3d {
    class GridList extends List {
        private wNum;
        constructor();
        testPoint($x: number, $y: number): boolean;
        setGridData($data: Array<ListItemData>, ItemRender: any, $wNum: number, itemWidth: number, itemHeight: number, contentWidth: number, contentHeight: number, $width?: number, $height?: number): void;
        setGridItemData($data: any, $idx: number): boolean;
        setGridItemFun($fun: Function, $idx: number): void;
        clearItemByIndex($idx: number): void;
        clearItemByPos($pos: number): void;
        redraw(): void;
        protected testItemClick($xPos: number, $ypos: number): void;
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
    }
    class GridListAtlas extends ListAtlas {
        private getAlphaImg;
        setGridData($width: number, $height: number, itemWidth: number, itemHeight: number, wNum: number, itemNum: number): void;
    }
}
