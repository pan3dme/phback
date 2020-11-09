module materialui {

    export class TexLightUvNodeUI extends BaseMaterialNodeUI {
        private outItem: ItemMaterialUI;
        public constructor() {
            super();

            this.gap = 20;
            this.width = 162;
            this.height = 65;


            this.nodeTree = new NodeTreeLightuv;
            this.nodeTree.ui = this;
            this.nodeTree.type = NodeTree.TEXCOORDLIGHT;

            this.outItem = new ItemMaterialUI("out", MaterialItemType.VEC2, false);
            this.addItems(this.outItem);
            this.drawTitleToFrame("Lightuv")

        }
    }
}