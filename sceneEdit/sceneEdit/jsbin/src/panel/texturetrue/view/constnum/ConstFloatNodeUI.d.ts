declare module materialui {
    class ConstFloatNodeUI extends BaseMaterialNodeUI {
        private outItem;
        private _constValue;
        constructor();
        setData(obj: any): void;
        getData(): Object;
        constValue: number;
        showDynamic(): void;
        getNumStr(num: number): string;
    }
}
