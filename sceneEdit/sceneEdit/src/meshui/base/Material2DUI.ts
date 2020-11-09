module prop {
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    import Material = Pan3d.Material
   
    export class Material2DUI extends Texturue2DUI {
        private textureTree: materialui.MaterialTree
        protected initView(): void {
            super.initView();
            this.height =300
        }
        public destory(): void {
            super.destory()
            if (this._materialTreeMc) {
                this._materialTreeMc.destory()
                this._materialTreeMc = null
            }
        }
        public set data(value: any) {
            this._data = value;
          //  console.log("data", value)

        }
        public refreshViewValue(): void {

            this.textureTree = this.target[this.FunKey]
            if (this.textureTree) {
                this.texturePicUi.url = this.textureTree.url
                var $arr: Array<string> = this.textureTree.url.split("/");
                this.textureUrlText.label = $arr[$arr.length - 1];

                this.showMaterialParamUi();
            } else {
                this.texturePicUi.url = "icon/base.jpg"
                this.textureUrlText.label = "无材质"
            }
 
        }
        private _materialTreeMc: MaterialParamUi
        public paramChange(item: Array<any>): void {
            this.changFun(item)
        }
        private showMaterialParamUi(): void {
            if (!this._materialTreeMc) {
                console.log(this.propPanle == PropModel.getInstance().propPanle);
             
                this._materialTreeMc = new MaterialParamUi(this.propPanle)
                this._materialTreeMc.changFun = (value: Array<any>) => { this.paramChange(value) }
            }
            this.textureTree = this.target[this.FunKey]
            this._materialTreeMc.setData(this.makeTempInfo(this.textureTree))
            this._materialTreeMc.y = this._y + 100
            this.height = 100 + this._materialTreeMc.height
           
 
        }
        public resize(): void {
            super.resize()
            if (this._materialTreeMc) {
                this._materialTreeMc.resize();

                this._materialTreeMc.y = this._y + 100
                this.height = 100 + this._materialTreeMc.height
          
            }
        }
        protected searchClik(evt: Pan3d.InteractiveEvent): void {
            console.log(this.textureTree.url)
            this.searchFileByPath(this.textureTree.url)
        }
   
        private makeTempInfo($materialTree: materialui.MaterialTree): Array<any> {

            var item: Array<any>=[]
            for (var i: number = 0; i < $materialTree.data.length; i++) {
                if ($materialTree.data[i].data.isDynamic) {
                    var temp: any
                    if ($materialTree.data[i].type == materialui.NodeTree.TEX) {
                        temp = {};
                        temp.data = $materialTree.data[i].data.url
                    }
                    if ($materialTree.data[i].type == materialui.NodeTree.VEC3) {
                        temp = {};
                        temp.data = $materialTree.data[i].data.constValue
                    }
                    if ($materialTree.data[i].type == materialui.NodeTree.FLOAT) {
                        temp = {};
                        temp.data = $materialTree.data[i].data.constValue
                    }
                    if (temp) {
                        temp.type = $materialTree.data[i].type;
                        temp.paramName = $materialTree.data[i].data.paramName;
                        var tempValue: any = this.target.getParamItem(temp.paramName);//如果有对象替换纹理中的
                        if (tempValue) {
                            temp.data = tempValue;
                        }

                        item.push(temp)
                    }
                }
            }

            return item
        }
    
    }

}