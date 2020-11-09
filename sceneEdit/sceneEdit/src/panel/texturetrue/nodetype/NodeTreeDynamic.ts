module materialui {

    export class NodeTreeDynamic extends NodeTree {

        public constructor() {

            super();
        }

        public getComponentID($id: number): string {
            var output: NodeTreeItem = this.outputVec[0];
            if ($id == 0) {
                if (output.type == MaterialItemType.VEC4) {
                    return CompileTwo.FT + this.regResultTemp.id;
                } else if (output.type == MaterialItemType.VEC3) {
                    return CompileTwo.FT + this.regResultTemp.id + ".xyz";
                } else if (output.type == MaterialItemType.VEC2) {
                    return CompileTwo.FT + this.regResultTemp.id + ".xy";
                } else if (output.type == MaterialItemType.FLOAT) {
                    return CompileTwo.FT + this.regResultTemp.id + ".x";
                }
            } else if ($id == 1) {
                return CompileTwo.FT + this.regResultTemp.id + ".x";
            } else if ($id == 2) {
                return CompileTwo.FT + this.regResultTemp.id + ".y";
            } else if ($id == 3) {
                return CompileTwo.FT + this.regResultTemp.id + ".z";
            } else if ($id == 4) {
                return CompileTwo.FT + this.regResultTemp.id + ".xy";
            } else if ($id == 5) {
                return CompileTwo.FT + this.regResultTemp.id + ".xyz";
            } else if ($id == 6) {
                return CompileTwo.FT + this.regResultTemp.id + ".w";
            }

            return null;
        }
    }
}