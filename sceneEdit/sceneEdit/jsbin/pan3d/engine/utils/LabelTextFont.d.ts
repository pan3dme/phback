declare module Pan3d {
    class TextRegVo {
        begin: number;
        end: number;
        color: string;
    }
    class TextRegExp {
        static item: Array<TextRegVo>;
        static defaultColor: string;
        constructor();
        static pushStr($str: string): void;
        /**
         * 将字符串中所有颜色替换为#号 并返回新的字符串
         * @param
         */
        static pushStrCopy($str: string): string;
        static isColor($index: number, $ctx: CanvasRenderingContext2D): boolean;
        static getTextMetrics($ctx: CanvasRenderingContext2D, text: string): TextMetrics;
        static getTextOnlyTxt($ctx: CanvasRenderingContext2D, text: string): string;
        private static getNextWords;
        /**
         * 逐字符写入文本。兼容表情。返回行数
         * @param
         * @param text
         * @param baseColor
         * @param x
         * @param y
         * @param maxWidth
         * @param lineHeight
         * @param fontsize
         * @param
         * @param
         * @param
         */
        static wrapText($ctx: CanvasRenderingContext2D, text: string, baseColor: string, x?: number, y?: number, maxWidth?: number, lineHeight?: number, fontsize?: number, $filterColor?: string, $filterWidth?: number, $gapScale?: number): number;
        /**
         * 逐字符写入文本。兼容表情。返回行数 竖着写
         * @param
         * @param text
         * @param baseColor
         * @param x
         * @param y
         * @param maxWidth
         * @param lineHeight
         * @param fontsize
         * @param
         * @param
         * @param
         */
        static wrapTextVertical($ctx: CanvasRenderingContext2D, text: string, baseColor: string, x?: number, y?: number, maxWidth?: number, lineWidth?: number, fontsize?: number, $filterColor?: string, $filterWidth?: number, $gapScale?: number): number;
        /**
         * 按行写入字符。暂不兼容表情。返回数组行宽行高
         * @param
         * @param text
         * @param baseColor
         * @param
         * @param
         * @param
         * @param lineHeight
         * @param fontsize
         * @param
         * @param
         * @param
         */
        static drawText($ctx: CanvasRenderingContext2D, text: string, baseColor: string, $maxWidth?: number, lineHeight?: number, fontsize?: number): Array<number>;
        private static getStartPoint;
        private static drawFaceIcon;
    }
    class TextCell {
        str: string;
        posy: number;
        width: number;
        color: string;
        maxwidth: number;
        constructor($str: string, $posy: number, $width: number, $color: string, $maxWidth: number);
    }
    class LabelTextFont {
        static writeSingleLabelCopy($uiAtlas: UIAtlas, $key: string, $str: string, fontsize?: number, $align?: string, $baseColor?: string, $filterColor?: string, $ty?: number, $filterWidth?: number, $bolder?: boolean): number;
        static writeSingleLabel($uiAtlas: UIAtlas, $key: string, $str: string, fontsize?: number, $align?: string, $baseColor?: string, $filterColor?: string, $ty?: number, $filterWidth?: number, $bolder?: boolean): number;
        static writeTextLabel($uiAtlas: UIAtlas, $key: string, $str: string, fontsize?: number, $align?: CanvasTextAlign, $maxWidth?: number, $baseColor?: string, $filterColor?: string, $ty?: number, $filterWidth?: number, $bolder?: boolean): Array<number>;
        static writeSingleLabelToCtx($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number, $align?: string, $baseColor?: string, $filterColor?: string, $bolder?: boolean): number;
        static writeSingleLabelToCtxByVertical($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number, $baseColor?: string, $filterColor?: string, $bolder?: boolean): void;
        static writeSingleLabelToCtxSetAnchor($ctx: CanvasRenderingContext2D, $str: string, fontsize?: number, $tx?: number, $ty?: number, $align?: string, $baseColor?: string, $filterColor?: string, $bolder?: boolean): number;
        /**
         * 整行写入文本 不兼容处理颜色
         * @param $x 文本写入时光标所在x位置
         * @param $y 文本写入时光标所在y位置
         * @param fontsize
         * @param fontColor
         * @param bolder
         * @param  $textAlign 对齐方式
         * @readme 如果需要居中对齐显示，则光标所在位置需要传入中心点坐标，对齐方式也需要传入center
         */
        static writeText($uiAtlas: UIAtlas, $key: string, $x: number, $y: number, $str: string, fontsize: number, fontColor: string, $maxWidth?: number, bolder?: boolean, $textAlign?: CanvasTextAlign): Array<number>;
        /**
         * 按行写入文本 带解析颜色。但只能居中对齐
         */
        static writeTextAutoCenterByAnchor($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number, fontColor: string, $maxWidth: number, bolder?: boolean, $filterColor?: string): Array<number>;
        static writeTextAutoVerticalCenter($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number, fontColor: string, $maxWidth: number, $filterColor?: string, bolder?: boolean): void;
        static writeTextAutoCenter($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number, fontColor: string, $maxWidth: number, bolder?: boolean): void;
        private static isNewline;
        private static getTextxpos;
        private static wrapText;
        /**已弃用 请使用clearUI */
        static clearLabel($uiAtlas: UIAtlas, $key: string): void;
    }
}
