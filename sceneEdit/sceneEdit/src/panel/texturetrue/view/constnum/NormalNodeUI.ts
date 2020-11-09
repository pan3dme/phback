module materialui {
    import Vector3D = Pan3d.Vector3D
    export class NormalNodeUI extends BaseMaterialNodeUI {

        private outItem: ItemMaterialUI;

        private outAItem: ItemMaterialUI;

        private outRGBAItem: ItemMaterialUI;

        private _constValue: Vector3D;

        protected _bastTitleStr: String = "Normal"

        public constructor() {
            super();

            this.gap = 20;
            this.width = 162;
            this.height = 60;

            this._constValue = new Vector3D;

            this.initNodeTree();

            this.outItem = new ItemMaterialUI("out", MaterialItemType.VEC3, false);
            this.addItems(this.outItem);

            this.drawTitleToFrame("Normal")

        }
        public getData(): Object {
            var obj: any = super.getData();
            obj.constValue = this._constValue;
            return obj;
        }
        public initNodeTree(): void {
            this.nodeTree = new NodeTreeNormal;
            this.nodeTree.ui = this;
            this.nodeTree.type = NodeTree.NORMAL;
        }
        public setData(obj: any): void {
            super.setData(obj);
            this.constValue = new Vector3D(obj.constValue.x, obj.constValue.y, obj.constValue.z, obj.constValue.w);
            (<NodeTreeNormal>this.nodeTree).constVec3 = this.constValue;
   
        }
        public get constValue(): Vector3D {
            return this._constValue;
        }

        public set constValue(value: Vector3D) {
            this._constValue = value;
            (<NodeTreeNormal>this.nodeTree).constVec3 = value;

        }
    
       
    }
}