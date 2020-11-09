module materialui {

    export class NodeTreeCos extends NodeTree {

        public constructor() {

            super();
        }
        public getComponentID($id: number): string {
            if ($id == 0) {
                var str: string = CompileTwo.FT + this.regResultTemp.id + ".x";
                return str;
            }
            return null;
        }
    }
}