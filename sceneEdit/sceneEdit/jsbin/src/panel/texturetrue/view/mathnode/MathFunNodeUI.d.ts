declare module materialui {
    import BaseEvent = Pan3d.BaseEvent;
    class MathFunNodeUI extends BaseMaterialNodeUI {
        private intAItem;
        private outItem;
        constructor();
        inPutFunStr($baseStr?: string): void;
        private clearNode;
        protected resetBgSize(): void;
        addEvents($nodeUI: ItemMaterialUI): void;
        addDisEvent($nodeUI: ItemMaterialUI): void;
        removeEvents($nodeUI: ItemMaterialUI): void;
        removeDisEvent($nodeUI: ItemMaterialUI): void;
        disConnect(event: BaseEvent): void;
        protected onConnect(event: BaseEvent): void;
        checkItem(): void;
        setData(obj: any): void;
        getData(): Object;
        setInItemByData(ary: Array<any>): void;
        setOutItemByData(ary: Array<any>): void;
    }
}
