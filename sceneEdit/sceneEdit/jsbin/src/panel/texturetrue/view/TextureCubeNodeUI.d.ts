declare module materialui {
    class TextureCubeNodeUI extends BaseMaterialNodeUI {
        private rgbItem;
        private _wrap;
        private _mipmap;
        private _filter;
        private _permul;
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
