declare module Pan3d {
    class CdRenderComponent extends UIRenderComponent {
        constructor();
        setVc(): void;
        protected dataTProLocation: WebGLUniformLocation;
        private initProgram;
        getComponent($uiName: string): UICompenent;
        creatBaseComponent($skinName: string): CdUICompenent;
    }
    class CdUICompenent extends UICompenent {
        constructor();
        cdTotalnum: number;
        lastTime: number;
        private _skipNum;
        isRound: boolean;
        visible: boolean;
        setCdNum(value: number): void;
        readonly isFinish: boolean;
        update(): void;
        clockwise: boolean;
        setVc(program: any, index: number): void;
    }
}
