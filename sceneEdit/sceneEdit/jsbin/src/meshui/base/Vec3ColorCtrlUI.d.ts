declare module prop {
    import Vector3D = Pan3d.Vector3D;
    class Vec3dCtrlUI extends BaseReflComponent {
        protected textLabelUI: TextLabelUI;
        protected inputTextUiX: InputTextUi;
        protected inputTextUiY: InputTextUi;
        protected inputTextUiZ: InputTextUi;
        protected textX: TextLabelUI;
        protected textY: TextLabelUI;
        protected textZ: TextLabelUI;
        protected _v3d: Vector3D;
        protected initView(): void;
        destory(): void;
        visible: boolean;
        data: any;
        private inputTextUiXchange;
        private inputTextUiYchange;
        private inputTextUiZchange;
        private changeV3d;
        protected colorPickUIchange($evt: ReflectionEvet): void;
        refreshViewValue(): void;
        getNumStr(num: number): string;
        x: number;
        resize(): void;
        y: number;
        label: string;
    }
    class Vec3ColorCtrlUI extends Vec3dCtrlUI {
        private colorPickUI;
        x: number;
        y: number;
        refreshViewValue(): void;
        protected initView(): void;
        destory(): void;
    }
}
