declare module materialui {
    class DataMathFunNode {
        name: string;
        type: string;
        constructor($name: string, $type: string);
    }
    class NodeTreeFun extends NodeTreeDynamic {
        funStr: string;
        funName: string;
        constructor();
        static isNeedChangePanel($a: string, $b: string): boolean;
        static getMathFunName($agalStr: string): string;
        static getMathFunReturnType($agalStr: string): string;
        static getDataMathFunArr($agalStr: string): Array<DataMathFunNode>;
    }
}
