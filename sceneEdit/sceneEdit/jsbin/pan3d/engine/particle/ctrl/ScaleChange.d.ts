declare module Pan3d {
    class ScaleChange extends BaseAnim {
        maxNum: number;
        minNum: number;
        constructor();
        coreCalculate(): void;
        /**
         *
         * @param value
         *
         */
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
        getAllNum(allTime: number): void;
        reset(): void;
        depthReset(): void;
    }
}
