module materialui {

    export class DataMathFunNode {
        public name: string
        public type: string;
        public constructor($name: string, $type: string) {
            this.name = $name;
            this.type = $type;
        }
    }

    export class NodeTreeFun extends NodeTreeDynamic {
        public funStr: string;
        public funName: string;
        public constructor() {
            super();
        }

        public static isNeedChangePanel($a: string, $b: string): boolean {
            var sortID: number = $a.split(CompileTwo.LN)[0].indexOf($b.split(CompileTwo.LN)[0])
            return sortID == -1;
        }
        public static getMathFunName($agalStr: string): string{
            var $tittlestr: string = $agalStr.split(CompileTwo.LN)[0];
            var $funName: string = $tittlestr.split(CompileTwo.SPACE)[1].split(CompileTwo.LEFT_PARENTH)[0]; //函数名
            return $funName
        }
        public static getMathFunReturnType($agalStr: string): string {
            var $tittlestr: string = $agalStr.split(CompileTwo.LN)[0];
            var $returnType: string = $tittlestr.split(CompileTwo.SPACE)[0]; //返回类型
            return $returnType
        }
        public static getDataMathFunArr($agalStr: string): Array<DataMathFunNode> {


            var $tittlestr: string = $agalStr.split(CompileTwo.LN)[0];
   

            var left: number = $tittlestr.indexOf(CompileTwo.LEFT_PARENTH)
            var right: number = $tittlestr.indexOf(CompileTwo.RIGHT_PARENTH)
            var $kv: Array<string> = $tittlestr.substring(left + 1, right).split(CompileTwo.COMMA);
            var $arr: Array<DataMathFunNode> = new Array();;
            for (var i: number = 0; i < $kv.length; i++) {
                if ($kv[i].split(CompileTwo.LN).length != 2) {
                    var atype: string = $kv[i].split(CompileTwo.SPACE)[0];
                    var aname: string = $kv[i].split(CompileTwo.SPACE)[1];
                   // console.log(atype, aname);
                    $arr.push(new DataMathFunNode(aname, atype));
                } else {
                    console.log("有错")
                }

            }
            return $arr
        }
    }
}