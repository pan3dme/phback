declare module Pan3d {
    class Disp2DBaseText {
        ui: UICompenent;
        textureStr: string;
        parent: UIRenderComponent;
        voRect: Rectangle;
        protected dtime: number;
        protected time: number;
        protected _data: any;
        protected lastKey: any;
        protected oldPos: Vector2D;
        constructor();
        protected needUpData($pos: Vector3D): boolean;
        rightTabInfoVo: any;
        makeData(): void;
        update(): void;
        Vector3DToVector2D($pos: any): Vector2D;
        isEqualLastKey(value: any): boolean;
    }
    class Dis2DUIContianerPanel extends Dis2DUIContianerBase {
        protected _baseRender: UIRenderComponent;
        constructor($classVo: any, $rect: Rectangle, $num: number);
        protected creatBaseRender(): void;
        private initData;
        private mathSize;
        private _textureRect;
        private _voNum;
        private _voRect;
        protected _uiItem: Array<Disp2DBaseText>;
        protected _lostItem: Array<Pan3d.baseMeshVo>;
        private makeBaseUi;
        showTemp($data: any): Disp2DBaseText;
        private clearLostItem;
        playLost(): void;
        clearOneTemp(): void;
        clearTemp($data: any): void;
        getVoByData(value: any): Disp2DBaseText;
        getVoByUi($ui: UICompenent): Disp2DBaseText;
        clearAll(): void;
        private updateFun;
        update(t: number): void;
        getUiItemLen(): number;
    }
}
