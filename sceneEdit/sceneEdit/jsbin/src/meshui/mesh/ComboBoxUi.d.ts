declare module prop {
    import InteractiveEvent = Pan3d.InteractiveEvent;
    class ComboBoxUi extends TextLabelUI {
        constructor(w?: number, h?: number);
        protected initView(): void;
        destory(): void;
        text: string;
        protected butClik(evt: InteractiveEvent): void;
    }
}
