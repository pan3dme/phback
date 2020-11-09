declare module materialui {
    import Shader3D = Pan3d.Shader3D;
    import Vector2D = Pan3d.Vector2D;
    import UICompenent = Pan3d.UICompenent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIPanel = win.UIPanel;
    class NodeLineLinkShader extends Shader3D {
        static NodeLineLinkShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class MapLineUi extends UICompenent {
        constructor();
        applyRenderSize(): void;
    }
    class NodeLineLinkComponent extends UIRenderComponent {
        constructor();
        makeLineUiItem($arr: Array<Vector2D>): void;
        private nextPostForTow;
        private mapLineUiList;
        private makeLineVetlineObjData;
        private getUiDataForItem;
        update(): void;
    }
    class MaterialLineContainer extends UIPanel {
        _midRender: NodeLineLinkComponent;
        constructor();
        private _currentLine;
        private _lineList;
        startLine($item: ItemMaterialUI): void;
        removeLine($line: MaterialNodeLineUI): void;
        globalToLocal($v: Vector2D): Vector2D;
        getMouse($v: InteractiveEvent): Vector2D;
        protected onMouseUp(event: MouseEvent): void;
        addConnentLine($startItem: ItemMaterialUI, $endItem: ItemMaterialUI): void;
        stopLine($item: ItemMaterialUI): void;
    }
}
