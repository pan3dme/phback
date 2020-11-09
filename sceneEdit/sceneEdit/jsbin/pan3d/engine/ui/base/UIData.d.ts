declare module Pan3d {
    class MainUiLoad {
        static loadFun: Function;
        static init($res: Array<any>, $bfun: Function, $loadFun?: Function): number;
        private static _skipnum;
        private static _bFun;
        private static _itemLoad;
        private static loadBaseConfigCom;
        private static loadOkNum;
        private static _dic;
        private static _imgDic;
        private static loadUIdata;
        static loadOkd(): void;
    }
    class UIData {
        static designWidth: number;
        static designHeight: number;
        static font: string;
        static Scale: number;
        static setDesignWH($width: number, $height: number): void;
        static resize(): void;
        static textImg: any;
        static loadFun: Function;
        static init($res: Array<any>, $bfun: Function, $loadFun?: Function): number;
        private static _skipnum;
        private static _bFun;
        private static _listUIRenderComponent;
        static readonly mainUIAtlas: UIAtlas;
        private static _itemLoad;
        private static loadBaseConfigCom;
        private static loadOkNum;
        static textlist: string;
        static publicUi: string;
        static faceItem: Array<string>;
        private static _dic;
        private static _imgDic;
        private static loadUIdata;
        static loadOkd(): void;
        static getImgByKey($key: string): HTMLImageElement;
        static getUiByName($key: string, $name: string): Object;
        static getUiArrByKey($key: string): any;
    }
    class UiDraw {
        static drawUseImg($ui: UICompenent, $useImgAtlas: UIAtlas, $skinName: string): void;
        static clearUI($ui: UICompenent): void;
        static drawTxtLab($ui: UICompenent, $str: string, $fontsize: number, $align: string, $tx?: number, $ty?: number): void;
        /**属性 - value */
        static drawAttVal($ui: UICompenent, $att: number, $val: number, $align?: string, $needadd?: boolean): void;
        /**绘制未获得属性 - value */
        static drawAttValAdd($ui: UICompenent, $att: number, $val: number): void;
        /**绘制增加属性 向上箭头 */
        static drawAddValTop($ui: UICompenent, $val: number): void;
        /**绘制增加属性 向右箭头 $align只接受左右对齐*/
        static drawAddValRight($ui: UICompenent, $val: number, $needadd?: boolean, $align?: string): void;
        /**
         * 绘制需 自身有某id的道具多少个和需要多少数量的道具  a/b
         * @param
         * @param
         * @param
         */
        static drawResHasNumAndAllNum($ui: UICompenent, $CostAry: Array<number>, $txt?: string): boolean;
        /**
         * 在ctx上指定位置绘制一个小图标
         * @param
         * @param
         */
        static drawCost($cxt: CanvasRenderingContext2D, $tx: number, $ty: number, $type: number): void;
        static drawCostUI($ui: UICompenent, $tx: number, $ty: number, $type: number): void;
        static cxtDrawImg($cxt: CanvasRenderingContext2D, $name: any, $rect: Rectangle, $key: string): void;
        static uiAtlasDrawImg($uiAtlas: UIAtlas, $skinName: string, $key: string, $shareName: string): void;
        /**
         * 将共享资源图绘制到$uiAtlas纹理对象中
         * $touiAtlas：绘制到的uiAtlas对象
         * $fromuiAtlas: 资源来源的uiAtlas对象
         * $skinName: 绘制对象名
         * $shareName：资源名
         * $tx：偏移量x
         * $ty：偏移量y
         * $fillflag：是否填充整个对象，若填充，则考虑偏移量，否则反之
         */
        static SharedDrawImg($touiAtlas: UIAtlas, $fromuiAtlas: UIAtlas, $skinName: string, $shareName: string, $tx?: number, $ty?: number, $fillflag?: boolean): void;
        static drawToUiAtlasToCtx($ctx: CanvasRenderingContext2D, $fromuiAtlas: UIAtlas, $shareName: string, $posRect: Rectangle): void;
        static RepeatLoadImg($url1: string, $url2: string, $backFuc?: Function): void;
    }
    class UIuitl {
        private static _instance;
        static getInstance(): UIuitl;
        constructor();
        /**
         * 绘制背景图+资源icon+资源数目
         */
        drawCostUI($uiAtlas: UIAtlas, $skinName: string, $costary: Array<any>, $fontcolor?: string, $bgwidth?: number, $bgheight?: number): void;
        costtype($costid: number): string;
    }
}
