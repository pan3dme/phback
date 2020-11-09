declare module materialui {
    import BaseEvent = Pan3d.BaseEvent;
    class MathDynamicNodeUI extends BaseMaterialNodeUI {
        private intAItem;
        private intBItem;
        private outItem;
        private outRItem;
        private outGItem;
        private outBItem;
        private outXYItem;
        private outRGBItem;
        private outAItem;
        constructor();
        protected initItem(): void;
        addEvents($nodeUI: ItemMaterialUI): void;
        addDisEvent($nodeUI: ItemMaterialUI): void;
        disConnect(event: BaseEvent): void;
        protected onConnect(event: BaseEvent): void;
        checkItem(): void;
        setInItemByData(ary: Array<any>): void;
        setOutItemByData(ary: Array<any>): void;
    }
}
