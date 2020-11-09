declare module prop {
    class Category2DUI extends BaseReflComponent {
        private categoryBgUi;
        private categoryIcon;
        private categoryOpen;
        private textLabelUI;
        protected initView(): void;
        private clikMouseUp;
        resize(): void;
        destory(): void;
        data: any;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}
