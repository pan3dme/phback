declare module materialui {
    class ResultNodeUI extends BaseMaterialNodeUI {
        private diffuseItem;
        private normalItem;
        private reflectItem;
        private alphaItem;
        private killItem;
        private _blenderMode;
        private _killNum;
        private _backCull;
        private _writeZbuffer;
        private _useDynamicIBL;
        private _normalScale;
        private _lightProbe;
        private _directLight;
        private _noLight;
        private _fogMode;
        private _scaleLightMap;
        private _hdr;
        constructor();
        private initItem;
        blenderMode: number;
        normalScale: number;
        lightProbe: boolean;
        directLight: boolean;
        noLight: boolean;
        fogMode: number;
        scaleLightMap: boolean;
        writeZbuffer: boolean;
        hdr: boolean;
        getData(): Object;
        setData(obj: any): void;
    }
}
