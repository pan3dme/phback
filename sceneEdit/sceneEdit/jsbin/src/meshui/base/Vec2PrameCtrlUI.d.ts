declare module prop {
    class Vec2PrameCtrlUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected inputTextUiX: InputTextUi;
        protected inputTextUiY: InputTextUi;
        protected textX: TextLabelUI;
        protected textY: TextLabelUI;
        protected _v2d: Vector2D;
        protected initView(): void;
        destory(): void;
        visible: boolean;
        data: any;
        private inputTextUiXchange;
        private inputTextUiYchange;
        private changeV3d;
        protected colorPickUIchange($evt: ReflectionEvet): void;
        refreshViewValue(): void;
        getNumStr(num: number): string;
        x: number;
        resize(): void;
        y: number;
        label: string;
    }
}
