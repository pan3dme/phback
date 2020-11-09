declare module Pan3d {
    class List extends UICompenent {
        protected _itemRenderAry: Array<ListItemRender>;
        private _contentX;
        private _contentY;
        protected _showHeight: number;
        protected _showWidth: number;
        protected _oHeight: number;
        protected _needScoller: boolean;
        protected _itemWidth: number;
        protected _itemHeight: number;
        constructor();
        applyAbsolutePoint(): void;
        contentX: number;
        contentY: number;
        testPoint($x: number, $y: number): boolean;
        setData($data: Array<ListItemData>, ItemRender: any, itemWidth: number, itemHeight: number, contentWidth: number, contentHeight: number, $width?: number, $height?: number): void;
        refresh(): void;
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
        private _ypos;
        protected onDown(event: InteractiveEvent): void;
        protected onListUp(event: InteractiveEvent): void;
        protected testItemClick($xPos: number, $ypos: number): void;
        private lastcontentY;
        protected onMove(event: InteractiveEvent): void;
        protected onUp(event: InteractiveEvent): void;
    }
    class ListAtlas extends UIAtlas {
        constructor();
        setData($width: number, $height: number, itemWidth: number, itemHeight: number, itemNum: number): void;
    }
    class ListItemData {
        id: number;
        data: any;
        clickFun: Function;
        clickRect: Rectangle;
        itemRender: ListItemRender;
    }
    class ListItemRender {
        height: number;
        widht: number;
        protected _listItemData: ListItemData;
        uvData: any;
        atlas: ListAtlas;
        _selected: boolean;
        setData($listItemData: ListItemData, $atlas: ListAtlas, $uvData: any): void;
        readonly listItemData: ListItemData;
        setNewData($data: any): void;
        selected: boolean;
        draw(): void;
        redraw(): void;
        click(xpos: number, ypos: number): void;
    }
}
