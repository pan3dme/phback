declare module prop {
    class BaseReflComponent {
        propPanle: UiMeshSprite;
        Category: string;
        protected _width: number;
        protected _height: number;
        protected _x: number;
        protected _y: number;
        protected _data: any;
        target: any;
        FunKey: string;
        changFun: Function;
        KeyStep: number;
        constructor(value: UiMeshSprite);
        protected _label: string;
        label: string;
        visible: boolean;
        private _visible;
        data: any;
        x: number;
        y: number;
        width: number;
        height: number;
        setTarget(obj: any): void;
        refreshViewValue(): void;
        protected initView(): void;
        destory(): void;
        resize(): void;
        protected drawOutColor(ui: Pan3d.UICompenent, $vcolor: Vector3D): void;
        protected drawUrlImgToUi(ui: Pan3d.UICompenent, url: string): void;
        protected drawImgToUi(ui: Pan3d.UICompenent, $img: any): void;
    }
}
