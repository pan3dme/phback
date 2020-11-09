declare module prop {
    class MaterialParamUi extends BaseReflComponent {
        private uiItem;
        protected initView(): void;
        setData(item: Array<any>): void;
        private changeDataEvtFun;
        refreshViewValue(): void;
        destory(): void;
        resize(): void;
        data: any;
        x: number;
        y: number;
        label: string;
    }
}
