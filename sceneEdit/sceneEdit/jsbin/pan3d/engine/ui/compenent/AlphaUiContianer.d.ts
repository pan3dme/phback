declare module Pan3d {
    class AlphaUIShader extends Shader3D {
        static AlphaUiShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class AlphaUIRenderComponent extends UIRenderComponent {
        constructor();
        update(): void;
        protected alphaLocation: WebGLUniformLocation;
        protected initData(): void;
        creatBaseComponent($skinName: string): AlphaUICompenent;
        creatGrid9Component($skinName: string, $width: number, $height: number): AlphaGrid9UICompenent;
        createFrame($upskin: string): AlphaFrameCompenent;
    }
    class AlphaFrameCompenent extends FrameCompenent {
        constructor();
        alpha: number;
        setVc(program: any, index: number): void;
    }
    class AlphaGrid9UICompenent extends Grid9Compenent {
        constructor();
        alpha: number;
        setVc(program: any, index: number): void;
    }
    class AlphaUICompenent extends UICompenent {
        constructor();
        alpha: number;
        setVc(program: any, index: number): void;
    }
    class AlphaUiContianer extends Dis2DUIContianerPanel {
        protected _baseRender: AlphaUIRenderComponent;
        constructor($classVo: any, $rect: Rectangle, $num: number);
        protected creatBaseRender(): void;
    }
}
