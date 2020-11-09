declare module materialui {
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIPanel = win.UIPanel;
    class PanelContainer {
        private uiRender;
        private labelRender;
        private panel;
        constructor($panel: UIPanel, $label: UIRenderComponent, $render: UIRenderComponent);
        removeChild($ui: ItemMaterialUI): void;
        addChild($ui: ItemMaterialUI): void;
        private static strItem;
        private drawTextToName;
    }
}
