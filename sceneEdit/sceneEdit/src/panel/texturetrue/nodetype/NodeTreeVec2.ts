module materialui {
    import Vector2D = Pan3d.Vector2D
    export class NodeTreeVec2 extends NodeTree {
        public constValue: Vector2D = new Vector2D;
        public constructor() {

            super();
            this.canDynamic = true;
        }
        public getComponentID($id: number): string {
             if ($id == 0) {
                 var str: string = CompileTwo.FC + NodeTree.getID(this.regResultConst.id);
                if (this.regConstIndex == 0) {
                    str += ".xy";
                } else if (this.regConstIndex == 1) {
                    str += ".yz";
                } else if (this.regConstIndex == 2) {
                    str += ".zw";
                }
                return str;
            }
            return null;
        }


    }
}