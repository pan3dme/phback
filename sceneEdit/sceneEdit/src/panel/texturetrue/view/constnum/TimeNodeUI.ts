module materialui {

    export class TimeNodeUI extends BaseMaterialNodeUI {
        private outItem: ItemMaterialUI;
        private _speed: number = 1;
 
        public constructor() {
            super();

            this.gap = 20;
            this.width = 162;
            this.height = 65;


            this.nodeTree = new NodeTreeTime;
            this.nodeTree.ui = this;
            this.nodeTree.type = NodeTree.TIME;

            this.outItem = new ItemMaterialUI("out", MaterialItemType.FLOAT, false);
            this.addItems(this.outItem);
            this.drawTitleToFrame("Time")
        }
        public get speed(): number {
            return this._speed
        }
        public set speed(value) {
            this._speed = value;
            (<NodeTreeTime>this.nodeTree).speed = this.speed;
        }
        public get timeValue() {
            return (<NodeTreeTime>this.nodeTree).timeValue
        }
        public set timeValue(value: Vector2D) {
            (<NodeTreeTime>this.nodeTree).timeValue = value
        }
        public getData(): Object {
            var obj: any = super.getData();
            obj.speed = this._speed
            if (!this.timeValue) {
                this.timeValue = new Vector2D(1, 1);
            }
            obj.timeValue = this.timeValue
 
            return obj;
        }

        public setData(obj: any): void {
            super.setData(obj);
            if (obj.speed) {
                this.speed = obj.speed;;
            } else {
                this.speed = 1;
            }
            if (obj.timeValue) {
                this.timeValue = new Vector2D(obj.timeValue.x, obj.timeValue.y)
            } else {
                this.timeValue = new Vector2D(1,1)
            }
            (<NodeTreeTime>this.nodeTree).speed = this.speed;
        }
    }
}