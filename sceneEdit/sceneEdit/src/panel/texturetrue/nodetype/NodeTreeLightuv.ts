module materialui {
    import Vector2D = Pan3d.Vector2D
    export class NodeTreeLightuv extends NodeTree {
        public constValue: Vector2D = new Vector2D;
        public constructor() {

            super();
            this.canDynamic = true;
        }
        public getComponentID($id: number): string {
            if ($id == 0) {
                return "lightuv.xy";
            }
            return null;
        }


    }
}