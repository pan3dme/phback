declare module prop {
    class TextField2DUI extends BaseReflComponent {
        private textLabelUI;
        private infoLabelUi;
        protected initView(): void;
        private clikMouseUp;
        private clikEventInfo;
        clikEvent: string;
        destory(): void;
        data: any;
        refreshViewValue(): void;
        getNumStr(num: number): string;
        x: number;
        y: number;
        label: string;
    }
}
