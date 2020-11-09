declare module Pan3d {
    class UIAtlas {
        textureRes: TextureRes;
        configData: any;
        layoutData: any;
        ctx: CanvasRenderingContext2D;
        protected _useImgUrl: string;
        useImg: any;
        constructor();
        readonly texture: WebGLTexture;
        setInfo(configUrl: string, imgUrl: string, $fun: Function, useImgUrl?: string): void;
        loadConfig(configUrl: string, $fun: Function): void;
        loadImgUrl(imgUrl: string, $fun: Function): void;
        loadUseImg($fun: Function): void;
        getRec($name: string): UIRectangle;
        getLayoutData($name: string): any;
        getGridRec($name: string): UIGridRentangle;
        readonly hasData: boolean;
        getObject($name: string, $x: number, $y: number, $width: number, $height: number, $maxWidth: number, $maxHeight: number, $cellx?: number, $celly?: number): any;
        updateCtx($ctx: any, xpos: number, ypos: number): void;
        upDataPicToTexture($url: string, $iconName: string): void;
        upDataWebPicToTexture($url: string, $iconName: string): void;
        clearCtxTextureBySkilname($iconName: string): void;
        copyPicToTexture($srcSkin: string, $desSkin: string): void;
        /**
         * 渲染文字
         */
        updateLable($key: string, $str: string, fontsize: number, fontColor: string, textBaseline?: CanvasTextBaseline, textAlign?: CanvasTextAlign, bolder?: boolean, maxWidth?: number): void;
        updateArtNum($targetName: string, $srcName: string, num: number): void;
        writeSingleLabel($key: string, $str: string, fontsize?: number, $align?: string, $baseColor?: string): void;
        writeSingleLabelToCxt($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number): void;
        /**
         * 未渲染文字。只是绘制到CanvasRenderingContext2D
         * 返回CanvasRenderingContext2D对象
         */
        updateLableCtx($ctx: CanvasRenderingContext2D, $str: string, $x: number, $y: number, $fontsize: number, $textAlign?: CanvasTextAlign, $textBaseline?: CanvasTextBaseline, $textcolor?: string, $textbolder?: string, $maxWidth?: number): void;
        getTextCtx($rec: UIRectangle, $fontsize: number, $fontColor: string, $bolder: boolean, $textBaseline: CanvasTextBaseline, $textAlign: CanvasTextAlign): CanvasRenderingContext2D;
        private getTextxpos;
        private getTextypos;
        private wrapText;
        _hasDispose: boolean;
        dispose(): void;
    }
}
