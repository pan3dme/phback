declare module Pan3d {
    class ArtFont {
        fontData: Dictionary;
        fontData_Unit: Dictionary;
        constructor();
        static Red: string;
        static Green: string;
        static Blue: string;
        static White: string;
        static Yellow: string;
        static BOSSBIGTXT: string;
        static CN1: string;
        static num101: string;
        static num102: string;
        static BigYellow: string;
        static num99: string;
        static GARY_TXT: string;
        static ORANGE_TXT: string;
        static num1: string;
        static num2: string;
        static num3: string;
        static num4: string;
        static num5: string;
        static num6: string;
        static num7: string;
        static num10: string;
        static num8: string;
        static num9: string;
        static num11: string;
        static num12: string;
        static num13: string;
        static num14: string;
        static num15: string;
        static num16: string;
        static num17: string;
        static num18: string;
        static num19: string;
        static num20: string;
        static num21: string;
        static num22: string;
        static num23: string;
        static num24: string;
        static num25: string;
        static num26: string;
        static num27: string;
        static num28: string;
        static num30: string;
        static num51: string;
        static num52: string;
        static num53: string;
        static num54: string;
        static num55: string;
        static num56: string;
        static num57: string;
        static num58: string;
        static num59: string;
        static num60: string;
        static num61: string;
        static numVip: string;
        static num63: string;
        static num64: string;
        static num65: string;
        static num66: string;
        private static _instance;
        static getInstance(): ArtFont;
        private makeFontRect;
        private getXmlData;
        private makeBase12pxNum;
        writeFontToCtxLeft($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $tx?: number, $ty?: number, $txtInterval?: number): number;
        /**
         * 将美术字写到ctx上 右对齐的
         * $tx:绘制的终点x
         * $ty:绘制的起点Y
         */
        writeFontToCtxRight($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $tx?: number, $ty?: number, $txtInterval?: number): number;
        writeFontToCtxCenten($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $tx?: number, $ty?: number, $txtInterval?: number): number;
        writeFontToSkinName($UIAtlas: UIAtlas, $iconName: string, $str: string, $color?: string, $textAlign?: string, $txtInterval?: number): number;
        writeFontToSkinNameCenter($UIAtlas: UIAtlas, $iconName: string, $str: string, $color?: string, $txtInterval?: number): void;
        getAirFontWidth($ctx: CanvasRenderingContext2D, $str: string, $color?: string, $txtInterval?: number): number;
        private getRect;
        upArtFont($UIAtlas: UIAtlas, $iconName: string, $str: string, $size?: number, $color?: string, $textAlign?: string): void;
        upArtBase($UIAtlas: UIAtlas, $iconName: string, $str: string, $color?: string, $textAlign?: string): void;
        private getXpos;
        /**
         *计算总宽度和是否绘制
         */
        private getTotalWandDraw;
        getCharId(str: string): number;
    }
}
