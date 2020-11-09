module prop {
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data

    export class MaterialParamUi extends BaseReflComponent {
 
        private uiItem: Array<BaseReflComponent>
        protected initView(): void {
            this.height = 100
            this.uiItem = []
        }
 
        public setData( item: Array<any>): void {
            this.destory();
        
            var $changFun: Function = (value: any) => { this.changeDataEvtFun(value) }

            for (var i: number = 0; i < item.length; i++) {
          
                var tempBaseReflComponent: BaseReflComponent
                if (item[i].type == materialui.NodeTree.TEX) {
                    var texturue2DUI: Texturue2DUI = new Texturue2DUI(this.propPanle);
                    texturue2DUI.suffix = "jpg|png";
                    tempBaseReflComponent = texturue2DUI;

                }
                if (item[i].type == materialui.NodeTree.VEC3) {
                    tempBaseReflComponent = new Vec3ColorCtrlUI(this.propPanle);
                    tempBaseReflComponent.KeyStep = 0.01;
                    if (isNaN(item[i].data.x) || isNaN(item[i].data.y) || isNaN(item[i].data.z)) {
                        item[i].data = new Vector3D();
                    }
                }
                if (item[i].type == materialui.NodeTree.VEC2) {
                    tempBaseReflComponent = new Vec2PrameCtrlUI(this.propPanle);
                    tempBaseReflComponent.KeyStep = 0.01;
                    if (isNaN(item[i].data.x) || isNaN(item[i].data.y)) {
                        item[i].data = new Vector2D();
                    }
                }
                if (item[i].type == materialui.NodeTree.FLOAT) {
                    tempBaseReflComponent = new TextCtrlInput(this.propPanle);
                    if (isNaN(item[i].data)) {
                        item[i].data = 1;
                    }
                }
                if (tempBaseReflComponent) {
                    tempBaseReflComponent.FunKey = "data";
                    tempBaseReflComponent.target = item[i];
                    tempBaseReflComponent.label = item[i].paramName;
                    tempBaseReflComponent.changFun = $changFun
                    this.uiItem.push(tempBaseReflComponent);
      
                }


                
            }
            this.refreshViewValue()

        }
        private changeDataEvtFun(temp: BaseReflComponent): void {
            var infoArr: Array<any> = [];
            for (var i: number = 0; i < this.uiItem.length; i++) {
                 infoArr.push(this.uiItem[i].target)
            }
            this.changFun(infoArr)
        }


        public refreshViewValue(): void {
            for (var i: number = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].refreshViewValue()
            }
        }

        public destory(): void {
            for (var i: number = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].destory()
            }
            this.uiItem = []


        }
        public resize(): void {
            super.resize()
            for (var i: number = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].resize();
            }
        }
        public set data(value: any) {
            this._data = value;

        }
        public get data(): any {
            return this._data
        }


        public set x(value: number) {
            this._x = value;



        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;

            var ty: number = 10
            this.height = 50;
            for (var i: number = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].y = this.y + ty

                if (this.uiItem[i] instanceof Vec3ColorCtrlUI) {
                    ty += 50
                    this.uiItem[i].x = 50
                    this.height += 50
                }

                if (this.uiItem[i] instanceof Vec2PrameCtrlUI) {
                    ty += 50
                    this.uiItem[i].x = 50
                    this.height += 50
                }
                if (this.uiItem[i] instanceof TextCtrlInput) {
                    ty += 50
                    this.uiItem[i].x = 50
                    this.height += 50
                }
                if (this.uiItem[i] instanceof Texturue2DUI) {
                    ty += 100
                    this.uiItem[i].x = 50
                    this.height += 100
                }


            }
            this.height += 10

        }
        public get y(): number {
            return this._y
        }
        public get label(): string {
            return this._label;
        }
        public set label(value: string) {
            this._label = value

        }


    }



}