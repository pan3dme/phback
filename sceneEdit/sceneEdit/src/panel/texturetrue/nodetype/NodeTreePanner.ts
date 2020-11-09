module materialui {
    import Vector2D = Pan3d.Vector2D
    export class NodeTreePanner extends NodeTree {
        public coordinateValue: Vector2D = new Vector2D(1, 1);
        public speedValue: Vector2D = new Vector2D(0, 0);
        public constructor() {
            super();
        }
        public getComponentID($id: number): string {
            var str: string;
            if ($id == 0) {
                str = CompileTwo.FT + this.regResultTemp.id + ".xy";
            }
            return str;
        }

        public checkInput(): boolean {
            return true;
        }


    }
}