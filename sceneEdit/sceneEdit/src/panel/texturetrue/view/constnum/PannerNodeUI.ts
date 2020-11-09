module materialui {
    import Vector2D = Pan3d.Vector2D
    export class PannerNodeUI extends BaseMaterialNodeUI {
        private  inItem: ItemMaterialUI;
        private  inSpeedItem: ItemMaterialUI;

        private  outItem: ItemMaterialUI;

        private  _coordinate: Vector2D;
        private  _speed: Vector2D
        public constructor() {
            super();

            this.gap = 20;
            this.width = 162;
            this.height = 85;


            this._coordinate = new Vector2D;
            this._speed = new Vector2D;

            this.nodeTree = new NodeTreePanner;
            this. nodeTree.ui = this;
            this. nodeTree.type = NodeTree.PANNER;

            this.  outItem = new ItemMaterialUI("out", MaterialItemType.VEC2, false);
            this.addItems(this.outItem);

            this. inItem = new ItemMaterialUI("coordinate", MaterialItemType.VEC2, true);
            this.addItems(this.inItem);

            this.inSpeedItem = new ItemMaterialUI("speed", MaterialItemType.VEC2, true);
            this.addItems(this.inSpeedItem);

            this.drawTitleToFrame("UV")

        }
        public  get speed(): Vector2D {
            return this._speed;
        }
        public set speed(value: Vector2D) {
            this._speed = value;
            (<NodeTreePanner>this.nodeTree).speedValue = value;
        }
        public get coordinate(): Vector2D {
            return this._coordinate;
        }
        public set coordinate(value: Vector2D) {
            this._coordinate = value;
           (< NodeTreePanner>this.nodeTree).coordinateValue = value;
        }

        public setData(obj: any): void {
            super.setData(obj);
            this.coordinate = new Vector2D(obj.coordinate.x, obj.coordinate.y);
            this.speed = new Vector2D(obj.speed.x, obj.speed.y);
        }
    }
}