declare module Pan3d {
    class ModelRes extends BaseRes {
        private _fun;
        objUrl: string;
        light: LightVo;
        materialUrl: string;
        load(url: string, $fun: Function): void;
        loadComplete($byte: ArrayBuffer): void;
        private readNexte;
    }
}
