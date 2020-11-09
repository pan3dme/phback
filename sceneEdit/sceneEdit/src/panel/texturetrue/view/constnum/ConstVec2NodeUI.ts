module materialui {
    import Vector2D = Pan3d.Vector2D
    export class ConstVec2NodeUI extends BaseMaterialNodeUI {
        private  outItem: ItemMaterialUI;
 
        public get constValue(): Vector2D {
            return (<NodeTreeVec2>this.nodeTree).constValue
        }
        public set constValue(value: Vector2D) {
 
            (<NodeTreeVec2>this.nodeTree).constValue = value;
            this.showDynamic();
        }
        public getData(): Object {
            var obj: any = super.getData();
            obj.constValue = this.constValue;
            return obj;
        }
        public setData(obj: any): void {
            super.setData(obj);
            this.constValue= new Vector2D(obj.constValue.x, obj.constValue.y);
            this.showDynamic();
        }
        public showDynamic(): void {
          
            if (this.nodeTree.isDynamic) {
                this.drawTitleToFrame("vec2<" + this.nodeTree.paramName + ">(" + this.getNumStr(this.constValue.x) + "," + this.getNumStr(this.constValue.y) + ")")
            } else {
                this.drawTitleToFrame("vec2(" + this.getNumStr(this.constValue.x) + "," + this.getNumStr(this.constValue.y)  + ")")
            }
        }
        public getNumStr(num: number): string {
            var n: number = Math.floor(num * 100) / 100;
            return n.toString();
        }
        public constructor() {
            super();

            this.gap = 20;
            this.width = 162;
            this.height = 95;

            this.gap = 20;
            this.width = 162;
            this.height = 65;

 

            this.nodeTree = new NodeTreeVec2;
            this.nodeTree.ui = this;
            this.nodeTree.type = NodeTree.VEC2;

            this.outItem = new ItemMaterialUI("out", MaterialItemType.VEC2, false);
            this.addItems(this.outItem);

            this.drawTitleToFrame("vec2")

        }


    }
}