declare module prop {
    import Vector3D = Pan3d.Vector3D;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class ColorPickUI extends TextLabelUI {
        constructor(w?: number, h?: number);
        protected initView(): void;
        private drawOutColor;
        private _vec3d;
        vec3d: Vector3D;
        protected butClik(evt: InteractiveEvent): void;
        private colorPickPanelFun;
    }
}
