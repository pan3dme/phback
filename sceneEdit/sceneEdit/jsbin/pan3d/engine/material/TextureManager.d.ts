declare module Pan3d {
    class TextureManager extends ResGC {
        private _loadDic;
        private _resDic;
        defaultLightMap: WebGLTexture;
        constructor();
        private static _instance;
        static getInstance(): TextureManager;
        hasTexture($url: string): boolean;
        getTexture($url: string, $fun: Function, $wrapType?: number, $info?: any, $filteType?: number, $mipmapType?: number): void;
        getImageData($url: string, $fun: Function): void;
        getImgResByurl($url: string): any;
        addRes($url: string, $img: any): void;
        addImgRes($url: string, $img: any): void;
        getCanvasTexture(ctx: CanvasRenderingContext2D, $wrap?: number, $filter?: number, $mipmap?: number): TextureRes;
        getImageDataTexture(imgdata: any): WebGLTexture;
        getTextureRes($img: any): TextureRes;
        updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, ctx: CanvasRenderingContext2D): void;
        loadCubeTexture($url: string, $fun: Function): void;
        loadTextureCom($img: any, _info: TextureLoad): void;
        initDefaultLightMapTexture(): void;
        gc(): void;
    }
    class TextureLoad {
        fun: Function;
        info: any;
        url: string;
        wrap: number;
        filter: number;
        mipmap: number;
        constructor($fun: Function, $info: any, $url: string, $wrap: number, $filter: number, $mipmap: number);
    }
    class CubemapLoad {
        private ary;
        private fun;
        private flagNum;
        loadCube($url: string, $fun: Function): void;
        static makeTempCubeTextture($img: HTMLImageElement): WebGLTexture;
        loadCom($img: HTMLImageElement, $info: any): void;
    }
}
