declare module prop {
    class MaterialFunContentUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected inputFunTextUi: InputFunTextUi;
        protected initView(): void;
        texturePicUiChange(evt: ReflectionEvet): void;
        destory(): void;
        resize(): void;
        data: any;
        private nodeUi;
        refreshViewValue(): void;
        x: number;
        y: number;
        label: string;
    }
}
