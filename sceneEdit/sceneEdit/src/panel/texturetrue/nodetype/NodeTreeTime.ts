module materialui {

    export class NodeTreeTime extends NodeTree {
        public speed: number = 1;
        public timeValue: Vector2D = new Vector2D(1,1)
        public constructor() {
            super();
        }
       
        public getComponentID($id: number): string {
            if ($id == 0) {
                return "time";
            }
            return null;
        }


    }
}