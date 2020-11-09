declare module materialui {
    class TextureSampleNodeUI extends BaseMaterialNodeUI {
        private uvItem;
        private rgbItem;
        private rItem;
        private gItem;
        private bItem;
        private aItem;
        private rgbaItem;
        private _wrap;
        private _mipmap;
        private _filter;
        private a_texture_pic_frame;
        constructor();
        private drawTextureUrlToFrame;
        static texture_pic_frame_ID: number;
        private getTexturePicUi;
        private initItem;
        creatBase($url: string): void;
        drawPicBmp(): void;
        setData(obj: any): void;
        getData(): Object;
        wrap: number;
        mipmap: number;
        filter: number;
        permul: boolean;
        isMain: boolean;
        showDynamic(): void;
    }
}
