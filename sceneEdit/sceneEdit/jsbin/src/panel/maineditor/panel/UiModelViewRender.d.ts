declare module maineditor {
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    import Shader3D = Pan3d.Shader3D;
    import Material = Pan3d.Material;
    import MaterialBaseParam = Pan3d.MaterialBaseParam;
    class UiModelViewShder extends Shader3D {
        static UiModelViewShder: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class UiModelViewRender extends UIRenderOnlyPicComponent {
        constructor();
        protected uiProLocation: WebGLUniformLocation;
        protected ui2ProLocation: WebGLUniformLocation;
        protected initData(): void;
        makeRenderDataVc($vcId: number): void;
        private _sceneProjectVo;
        sceneProjectVo: SceneProjectVo;
        private sceneProjectUpData;
        private time;
        private materialTree;
        setMaterialVc($material: Material, $mp?: MaterialBaseParam): void;
        update(): void;
    }
}
