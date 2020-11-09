declare module Pan3d {
    class ScaleNoise extends BaseAnim {
        amplitude: number;
        coreCalculate(): void;
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
        getAllNum(allTime: number): void;
    }
}
