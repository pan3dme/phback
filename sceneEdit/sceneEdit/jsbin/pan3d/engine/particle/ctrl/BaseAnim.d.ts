declare module Pan3d {
    class BaseAnim {
        baseNum: number;
        num: number;
        time: number;
        speed: number;
        aSpeed: number;
        beginTime: number;
        lastTime: number;
        baseTime: number;
        protected _isActiva: boolean;
        protected _isDeath: boolean;
        BaseAnim(): void;
        update(t: number): void;
        coreCalculate(): void;
        reset(): void;
        depthReset(): void;
        data: Array<any>;
        isDeath: boolean;
        getAllNum(allTime: number): void;
    }
}
