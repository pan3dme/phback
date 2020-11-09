declare module Pan3d {
    class TextJumpType {
        static NORMALDAMAGE: number;
        static CRIT: number;
        static DODGE: number;
        static TREATMENT: number;
        static VERTIGO: number;
        static FREEZE: number;
        static ATTACKADD: number;
        static ATTACKREDUCE: number;
        static EXPERIENCE: number;
        static NORMALDAMAGEUP: number;
        static CRITUP: number;
        static MYNORMALDAMAGE: number;
        static MYNORMALDAMAGEUP: number;
        static MISS: number;
    }
    class TextJumpUiVo {
        pos: Vector3D;
        str: string;
        type: number;
        endtime: number;
        starttime: number;
    }
    class ExpTextJumpUiDrawAndRefreash extends Disp2DBaseText {
        private _width;
        makeData(): void;
        protected drawTxtBydigitalAndtext($vo: TextJumpUiVo): number;
        protected pos: Vector3D;
        update(): void;
        /** [posx,posy,Scalex,Scaley,alpha] */
        protected _lastchange: Array<number>;
        protected changerules(t: number): Array<number>;
    }
    class TextJumpUiDrawAndRefreash extends Disp2DBaseText {
        private _width;
        makeData(): void;
        private drawTxtBytext;
        protected drawTxtBydigitalAndtext($vo: TextJumpUiVo): number;
        private pos;
        update(): void;
        /** [posx,posy,Scalex,Scaley,alpha] */
        private _lastchange;
        private changerules;
    }
    class CharNameUiVo extends Disp2DBaseText {
        private charNameMeshVo;
        makeData(): void;
        private tempMatrix;
        update(): void;
    }
    class CharTitleUiVo extends Disp2DBaseText {
        private _charTitleMeshVo;
        makeData(): void;
        private tempMatrix;
        update(): void;
    }
    class baseMeshVo {
        private _visible;
        visibleChange: boolean;
        visible: boolean;
        pos: Vector3D;
        uiScale: number;
        clear: boolean;
        constructor();
    }
}
declare module Pan3d {
    class BloodUIShader extends Shader3D {
        static BloodUIShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class BloodUICompenent extends UICompenent {
        constructor();
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
        lifeNum: number;
        colortype: number;
    }
    class BloodDisp2DBaseText extends Disp2DBaseText {
        private bloodLineMeshVo;
        makeData(): void;
        private tempMatrix;
        update(): void;
    }
    class BloodUIRenderComponent extends UIRenderComponent {
        constructor();
        protected initData(): void;
        private nextTime;
        update(): void;
        creatBaseComponent($skinName: string): BloodUICompenent;
        makeRenderDataVc($vcId: number): void;
    }
    class BloodLineUIConatiner extends UIConatiner {
        private _baseRender;
        constructor();
        private loadBloodTexture;
        protected _uiItem: Array<BloodDisp2DBaseText>;
        update(t: number): void;
        removeChild($ui: UICompenent): void;
        clearOneTemp(): void;
        showTemp($data: any): void;
    }
}
declare module Pan3d {
    class CharTitleMeshVo extends Pan3d.baseMeshVo {
        private _num;
        needDraw: boolean;
        destory(): void;
        num: number;
    }
    class CharNameMeshVo extends Pan3d.baseMeshVo {
        private _name;
        needDraw: boolean;
        name: string;
        destory(): void;
    }
    class BloodLineMeshVo extends Pan3d.baseMeshVo {
        num: number;
        colortype: number;
        destory(): void;
    }
    class JumpTextMeshVo extends Pan3d.baseMeshVo {
        str: string;
        destory(): void;
    }
    class JumpTxtContianerPanel extends Dis2DUIContianerPanel {
        constructor($classVo: any, $rect: Rectangle, $num: number);
    }
    class BloodManager {
        static _instance: BloodManager;
        static getInstance(): BloodManager;
        private _charTitleContianerPanel;
        private _charNameContianerPanel;
        private _jumpTxtContianerPanel;
        private _expjumpTxtContianerPanel;
        private _bloodLineUIConatiner;
        uiContianerItem: Array<Dis2DUIContianerBase>;
        constructor();
        clearOneTemp(): void;
        getCharTitleMeshVo(value?: number): CharTitleMeshVo;
        getCharNameMeshVo(value?: string): CharNameMeshVo;
        getBloodLineMeshVo(): BloodLineMeshVo;
        setJumpNum($textJumpUiVo: Pan3d.TextJumpUiVo): void;
        setExpJumpNum($textJumpUiVo: Pan3d.TextJumpUiVo): void;
        update(): void;
        resize(): void;
    }
}
