declare module Pan3d {
    class SList extends UIVirtualContainer {
        protected _baseX: number;
        protected _baseY: number;
        protected _contentX: number;
        protected _contentY: number;
        protected p_scrollY: number;
        protected p_scrollX: number;
        protected _itemList: Array<SListItem>;
        protected p_itemHeight: number;
        protected p_itemWidth: number;
        protected _showIndexList: Array<number>;
        protected _dataAry: Array<SListItemData>;
        protected _showItemNum: number;
        protected _allItemNum: number;
        protected _topSize: number;
        protected _bottomSize: number;
        protected _outSize: number;
        protected _showDataIndex: number;
        protected _bgRender: SListBgRender;
        protected _baseRender: SlistFrontRender;
        protected customRenderAry: Array<UIRenderComponent>;
        protected _sAtlas: SListAtlas;
        baseAtlas: UIAtlas;
        protected bgMask: UIMask;
        protected scrollLock: boolean;
        protected _minScrollY: number;
        protected _maskLevel: number;
        /**
         * $data 数据源
         *
         * UItemRender 渲染器
         *
         * $width 显示宽度
         *
         * $height 显示高度
         *
         * $itemWidth 每列宽度
         *
         * $itemHeight 每列高度
         *
         * $showItemNum 显示列数
         *
         * contentWidth 纹理宽
         *
         * contentHeight 纹理高
         *
         * contentX 纹理横向分割数
         *
         * contentY 纹理纵向分割数
         *
         */
        setData($data: Array<SListItemData>, UItemRender: any, $width: number, $height: number, $itemWidth: number, $itemHeight: number, $showItemNum: number, contentWidth: number, contentHeight: number, contentX: number, contentY: number, customRenderNum?: number): void;
        initComplte(): void;
        /**显示层级 */
        setShowLevel($num: number): void;
        private _currentSelIdx;
        setSelect($item: SListItem): void;
        setSelectIndex($index: number): void;
        getCurrentSelectIndex(): number;
        changeMinScrollY(): void;
        refreshData($data: Array<SListItemData>): void;
        setItemData($data: any, $idx: number): void;
        clearItemByPos($idx: number): void;
        getDataSize(): number;
        refreshDraw(): void;
        scroll(): void;
        interactiveEvent($e: InteractiveEvent): boolean;
        private _mouseY;
        onMove($e: InteractiveEvent): void;
        onUp($e: InteractiveEvent): void;
        backFun: Function;
        protected _topflag: boolean;
        protected _bottomflag: boolean;
        /**拖动刷新 */
        protected _dragFlag: boolean;
        protected _dragY: number;
        protected _dragMaxY: number;
        protected _dragUpFun: Function;
        protected _dragDownFun: Function;
        /**设置翻页拖动 */
        setDragFun(upFun: Function, downFun: Function): void;
        dragY: number;
        scrollIdx(idx: number): void;
        getIdxY(idx: number): number;
        getIdxX(idx: number): number;
        scrollY(val: number): void;
        refreshResultPos(): void;
        dispose(): void;
    }
    class SListItem {
        private _height;
        itdata: SListItemData;
        private _list;
        index: number;
        baseY: number;
        baseX: number;
        uiAtlas: SListAtlas;
        protected _selected: boolean;
        parentTarget: SList;
        _bgRender: UIRenderComponent;
        _baseRender: UIRenderComponent;
        _customRenderAry: Array<UIRenderComponent>;
        addUI($ui: UICompenent): void;
        create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry?: Array<UIRenderComponent>): void;
        render($data: SListItemData): void;
        refreshDraw(): void;
        setSelect(): void;
        unSetSelect(): void;
        selected: boolean;
        creatSUI(render: UIRenderComponent, baseAtlas: UIAtlas, $name: string, x: number, y: number, width: number, height: number): UICompenent;
        private creatGrid9Component;
        creatGrid9SUI(render: UIRenderComponent, baseAtlas: UIAtlas, $name: string, x: number, y: number, width: number, height: number, WW?: number, WH?: number): UICompenent;
        getHeight(): number;
        setItemUiX(ui: UICompenent, xpos: number): void;
        _sy: number;
        setY($sy: number): void;
        _sx: number;
        setX($sx: number): void;
    }
    class SListItemData {
        data: any;
        resdata: any;
        id: number;
        selected: boolean;
        click: Function;
    }
    class SListBgRender extends UIRenderComponent {
        slist: SList;
        interactiveEvent($e: InteractiveEvent): boolean;
    }
    class SlistFrontRender extends UIRenderComponent {
        interactiveEvent($e: InteractiveEvent): boolean;
    }
    class SListAtlas extends UIAtlas {
        constructor();
        xNum: number;
        yNum: number;
        width: number;
        height: number;
        itemHeight: number;
        itemWidth: number;
        setData($width: number, $height: number, $xnum: number, $ynum: number): void;
        addConfig($name: string, $index: number, $baseRec: any): void;
    }
    /**
     * 带特效的list
     */
    class EffectSlist extends SList {
        private _effRender;
        effList: Array<FrameTipCompenent>;
        setEffectUrl($name: string, $wnum: number, $hNum: number, num?: number): void;
        initComplte(): void;
        effectComplte(): void;
        refreshResultPos(): void;
        playEffect($id: number, $x: number, $y: number, $scaleW: number, $scaleH: number, $speed?: number): void;
        effplay($effui: FrameTipCompenent): void;
        showEffect($id: number, $x: number, $y: number, $scaleW: number, $scaleH: number, $speed?: number): void;
        hideEffect($id?: number): void;
        dispose(): void;
    }
    /**
     * 横向单行滑动的Slist
     */
    class TransverseSList extends EffectSlist {
        private _minScrollX;
        /**
         * $data 数据源
         *
         * UItemRender 渲染器
         *
         * $width 显示宽度
         *
         * $height 显示高度
         *
         * $itemWidth 每列宽度
         *
         * $itemHeight 每列高度
         *
         * $showItemNum 显示列数
         *
         * contentWidth 纹理宽
         *
         * contentHeight 纹理高
         *
         * contentX 纹理横向分割数
         *
         * contentY 纹理纵向分割数
         *
         */
        setData($data: Array<SListItemData>, UItemRender: any, $width: number, $height: number, $itemWidth: number, $itemHeight: number, $showItemNum: number, contentWidth: number, contentHeight: number, contentX: number, contentY: number, customRenderNum?: number): void;
        changeMinScrollX(): void;
        refreshData($data: Array<SListItemData>): void;
        interactiveEvent($e: InteractiveEvent): boolean;
        private _mouseX;
        onMove($e: InteractiveEvent): void;
        onUp($e: InteractiveEvent): void;
        scrollX(val: number): void;
        scrollIdx(idx: number): void;
        refreshResultPos(): void;
    }
}
