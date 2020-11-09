declare module Pan3d {
    class LightVo {
        sunDirect: Array<number>;
        sunColor: Array<number>;
        ambientColor: Array<number>;
        setData(sd: any, sc: any, ac: any): void;
    }
}
