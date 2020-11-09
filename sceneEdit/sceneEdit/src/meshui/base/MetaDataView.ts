module prop {

    export class MetaDataView {

        public x: number = 0;
        public y: number = 0;
        protected _data: any;
        protected _top: number = 0
        public type: string;

        public getMeshInfo(): any {
            var obj: any = {};
            obj.class = this;
            obj.data = this.data;
            return obj
        }
        public onAdd(): void {
            console.log("onRemove")
            for (var i: number = 0; this.ui && i < this.ui.length; i++) {
                this.ui[i].visible = true
            }
        }

        public onRemove(): void {

            console.log("onRemove")
            for (var i: number = 0; this.ui && i < this.ui.length; i++) {
                this.ui[i].visible = false
            }
        }
     
        public set top(value: number) {
            this._top = value;
            this.resize()
   
        }
        public get top(): number {
            return this._top
        }
        public set width(value: number) {
            this._width = value;
            this.resize()

        }
        protected _width: number = 100
        public get width(): number {
            return this._width
        }

        public set height(value: number) {
            this._height = value;
            this.resize()

        }
        protected _height: number = 100
        public get height(): number {
            return this._height
        }
        private propPanle: UiMeshSprite
        public constructor(value: UiMeshSprite) {
            this.propPanle = value
 
            this.creat(this.getView());
        }

        public replayUiList(): void {
            this.destory()//复活UI
            this.creat(this.getView());
        }
        public getView(): Array<any> {
            var ary: Array<any> =
                [
 
                ];
            return ary;
        }
        public set data(value: any) {
            this._data = value;
            this.refreshViewValue()
  
        }
        public get data(): any {
            return this._data
        }

        public ui: Array<BaseReflComponent>;
        private categoryKey: any = {}
        private hideCategory: string
        public creat(data: Array<any>): void {
            this.ui = new Array;
            this.categoryKey = {};
            for (var i: number = 0; i < data.length; i++) {
                if (data[i].Category && !this.categoryKey[data[i].Category]) {

                    if (!this.hideCategory) {
                        this.hideCategory = data[i].Category;
                    }
                    if (this.hideCategory != data[i].Category) {
                        this.categoryKey[data[i].Category] = true
                        var tempCategory2DUI: Category2DUI = this.getCategoryUI(data[i].Category)
                        tempCategory2DUI.data = this.hideCategoryKey[data[i].Category];
                        this.ui.push(tempCategory2DUI);
                    }
              
                  
            
                }
                if (!Boolean(this.hideCategoryKey[data[i].Category])) {
                    var tempUi: BaseReflComponent = this.creatComponent(data[i])
                    tempUi.Category = data[i].Category;
                    this.ui.push(tempUi);
                }
             
            }
            this.resize();
        }
        protected hideCategoryKey: any = {};
        public categoryFun: Function
        public categoryClikUp(value: string): void {
            this.hideCategoryKey[value] = !this.hideCategoryKey[value];
            if (this.hideCategoryKey[value]) {
 
                for (var i: number = this.ui.length - 1; i >= 0; i--) {
                    var $ui: BaseReflComponent = this.ui[i]
                    if ($ui.Category == value) {
                        $ui.destory()
                        this.ui.splice(i, 1)
                    }
                }
          
            } else {
 
                var data: Array<any> = this.getView();
                var indx: number = this.getUiIndxByCategory(value)
                for (var i: number = 0; i < data.length; i++) {
                    if (data[i].Category == value) {
                        if (!Boolean(this.hideCategoryKey[data[i].Category])) {
                            var tempUi: BaseReflComponent = this.creatComponent(data[i])
                            tempUi.Category = data[i].Category;
                            this.ui.splice(indx++, 0, tempUi);
                            tempUi.refreshViewValue();
                        }
                    }
 
                }
            }
            this.resize();
            this.categoryFun && this.categoryFun();
        }
        private getUiIndxByCategory(value: string): number {
            for (var i: number = 0; i < this.ui.length; i++) {
                var $ui: BaseReflComponent = this.ui[i]
                if ($ui instanceof Category2DUI) {
                    if ($ui.label == value) {
                        return i+1;
                    }
                }
            }
            console.log("必须找到标签，显示这行说明就错。不应该到这里")
        }
   
        public resize(): void {
            var ty: number = this._top
            for (var i: number = 0; this.ui&& i < this.ui.length; i++) {
                this.ui[i].y = ty;
                this.ui[i].x = 20;
         
                this.ui[i].width = this.width
                this.ui[i].resize()

                ty += this.ui[i].height;
  
            }
            this._height = ty - this._top;
        }
        public eventKey(value: string): void {
         
        }
        public creatComponent(obj: any): BaseReflComponent {
            var type: String = obj[ReflectionData.Key_Type];
            if (type == ReflectionData.NumberInput) {
                return this.getNumComponent(obj);
            }
            if (type == ReflectionData.AgalFunUI) {
                return this.getAgalFunComponent(obj);
            }
            if (type == ReflectionData.Texturue2DUI) {
                return this.getTexturue2DUI(obj);
            }
            if (type == ReflectionData.MaterialPicUi) {
                return this.getMaterialPicUi(obj);
            }
            if (type == ReflectionData.RoleMesh2DUI) {
                return this.getRoleMesh2DUI(obj);
            }
            if (type == ReflectionData.RoleAnim2DUI) {
                return this.getRoleAnimi2DUI(obj);
            }
            
            if (type == ReflectionData.ComboBox) {
                return this.getComboBox(obj);
            }
            if (type == ReflectionData.CheckBox) {
                return this.getCheckBox(obj);
            }
            if (type == ReflectionData.Vec3Color) {
                return this.getVec3Color(obj);
            }
            if (type == ReflectionData.Vec3) {
                return this.getVec3(obj);
            }
            if (type == ReflectionData.Vec2) {
                return this.getVec2(obj);
            }
            if (type == ReflectionData.TEXT) {
                return this.getTextField2DUI(obj);
            }
            if (type == ReflectionData.MeshScene2DUI) {
                return this.getMeshScene2DUI(obj);
            }
            if (type == ReflectionData.MeshMaterialLeft2DUI) {
                return this.getMeshMaterialLeft2DUI(obj);
            }
            if (type == ReflectionData.MaterialFunContentUI) {
                return this.getMaterialFunContentUI(obj);
            }
            
 
            return null;
        }
        public getMaterialFunContentUI($obj: Object): MaterialFunContentUI {
            var temp: MaterialFunContentUI = new MaterialFunContentUI(this.propPanle)
            temp.label = $obj[ReflectionData.Key_Label];
            temp.FunKey = $obj[ReflectionData.FunKey];
            temp.target = this
            return temp;
        }
        public getMeshMaterialLeft2DUI($obj: Object): MeshMaterialLfetView2DUI {
            var temp: MeshMaterialLfetView2DUI = new MeshMaterialLfetView2DUI(this.propPanle)
            temp.label = $obj[ReflectionData.Key_Label];
            temp.FunKey = $obj[ReflectionData.FunKey];
            temp.suffix = $obj[ReflectionData.Key_Suffix];
            temp.target = this
            return temp;
        }
        public getMeshScene2DUI($obj: Object): MeshSceneView2DUI {
            var temp: MeshSceneView2DUI = new MeshSceneView2DUI(this.propPanle)
            temp.label = $obj[ReflectionData.Key_Label];
            temp.FunKey = $obj[ReflectionData.FunKey];
            temp.target = this
            return temp;
        }
        public getCategoryUI(value: string): Category2DUI {
            var $category2DUI: Category2DUI = new Category2DUI(this.propPanle)
            $category2DUI.label = value
            $category2DUI.changFun = (value: string) => { this.categoryClikUp(value) }
            return $category2DUI;
        }
        public getTextField2DUI($obj: Object): TextField2DUI {
            var $textCtrlInput: TextField2DUI = new TextField2DUI(this.propPanle)
            $textCtrlInput.label = $obj[ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[ReflectionData.FunKey];
            $textCtrlInput.clikEvent = $obj[ReflectionData.ClikEventKey];
            $textCtrlInput.target = this
            return $textCtrlInput;
        }
        public getVec3($obj: Object): Vec3dCtrlUI {
            var $textCtrlInput: Vec3dCtrlUI = new Vec3dCtrlUI(this.propPanle)
            $textCtrlInput.label = $obj[ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[ReflectionData.FunKey];
            if ($obj[ReflectionData.Key_Step]) {
                $textCtrlInput.KeyStep = $obj[ReflectionData.Key_Step];
            } else {
                $textCtrlInput.KeyStep = 1
            }
            $textCtrlInput.target = this
            return $textCtrlInput;
        }
        public getVec2($obj: Object): Vec2PrameCtrlUI {
            var $textCtrlInput: Vec2PrameCtrlUI = new Vec2PrameCtrlUI(this.propPanle)
            $textCtrlInput.label = $obj[ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[ReflectionData.FunKey];
            if ($obj[ReflectionData.Key_Step]) {
                $textCtrlInput.KeyStep = $obj[ReflectionData.Key_Step];
            } else {
                $textCtrlInput.KeyStep = 1
            }
            $textCtrlInput.target = this
            return $textCtrlInput;
        }
        public getVec3Color($obj: Object): Vec3ColorCtrlUI {
            var $textCtrlInput: Vec3ColorCtrlUI = new Vec3ColorCtrlUI(this.propPanle)
            $textCtrlInput.label = $obj[ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[ReflectionData.FunKey];
            if ($obj[ReflectionData.Key_Step]) {
                $textCtrlInput.KeyStep = $obj[ReflectionData.Key_Step];
            } else {
                $textCtrlInput.KeyStep=0.01
            }
            $textCtrlInput.target = this
            return $textCtrlInput;
        }
        public getComboBox($obj: Object): ComBoBoxCtrl2D {
            var $ComBoBoxCtrl2D: ComBoBoxCtrl2D = new ComBoBoxCtrl2D(this.propPanle)
            $ComBoBoxCtrl2D.label = $obj[ReflectionData.Key_Label];
            $ComBoBoxCtrl2D.FunKey = $obj[ReflectionData.FunKey];
            $ComBoBoxCtrl2D.data = $obj[ReflectionData.Key_Data];
            $ComBoBoxCtrl2D.target = this
            return $ComBoBoxCtrl2D;
        }
        public getCheckBox($obj: Object): CheckBox2DUI {
            var $ComBoBoxCtrl2D: CheckBox2DUI = new CheckBox2DUI(this.propPanle)
            $ComBoBoxCtrl2D.label = $obj[ReflectionData.Key_Label];
            $ComBoBoxCtrl2D.FunKey = $obj[ReflectionData.FunKey];
            $ComBoBoxCtrl2D.target = this
            return $ComBoBoxCtrl2D;
        }
        public getTexturue2DUI($obj: Object): Texturue2DUI {
            var $texturue2DUI: Texturue2DUI = new Texturue2DUI(this.propPanle)
            $texturue2DUI.label = $obj[ReflectionData.Key_Label];
            $texturue2DUI.suffix = $obj[ReflectionData.Key_Suffix];
            $texturue2DUI.FunKey = $obj[ReflectionData.FunKey];
            $texturue2DUI.target = this
            return $texturue2DUI;
        }
        public getMaterialPicUi($obj: Object): Material2DUI {
            var $texturue2DUI: Material2DUI = new Material2DUI(this.propPanle)
            $texturue2DUI.label = $obj[ReflectionData.Key_Label];
            $texturue2DUI.suffix = $obj[ReflectionData.Key_Suffix];
            $texturue2DUI.FunKey = $obj[ReflectionData.FunKey];
            $texturue2DUI.changFun = $obj["changFun"];
            $texturue2DUI.target = this
            return $texturue2DUI;
        }
        public getRoleMesh2DUI($obj: Object): RoleMesh2DUI {
            var $texturue2DUI: RoleMesh2DUI = new RoleMesh2DUI(this.propPanle)
            $texturue2DUI.label = $obj[ReflectionData.Key_Label];
            //   $texturue2DUI.suffix = $obj[ReflectionData.Key_Suffix];
            $texturue2DUI.FunKey = $obj[ReflectionData.FunKey];
            $texturue2DUI.changFun = $obj["changFun"];
            $texturue2DUI.target = this
            return $texturue2DUI;
        }

        public getRoleAnimi2DUI($obj: Object): RoleAnimi2DUI {
            var $roleAnimi2DUI: RoleAnimi2DUI = new RoleAnimi2DUI(this.propPanle)
            $roleAnimi2DUI.label = $obj[ReflectionData.Key_Label];
            //   $texturue2DUI.suffix = $obj[ReflectionData.Key_Suffix];
            $roleAnimi2DUI.FunKey = $obj[ReflectionData.FunKey];
            $roleAnimi2DUI.changFun = $obj["changFun"];
            $roleAnimi2DUI.target = this
            return $roleAnimi2DUI;
        }


        
        public getNumComponent($obj: Object): TextCtrlInput {
            var $textCtrlInput: TextCtrlInput = new TextCtrlInput(this.propPanle)
            $textCtrlInput.label = $obj[ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[ReflectionData.FunKey];
            $textCtrlInput.KeyStep = $obj[ReflectionData.Key_Step];
            $textCtrlInput.target = this
            return $textCtrlInput;
        }
        public getAgalFunComponent($obj: Object): AgalFunUI {
            var $textCtrlInput: AgalFunUI = new AgalFunUI(this.propPanle)
            $textCtrlInput.label = $obj[ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[ReflectionData.FunKey];
            $textCtrlInput.KeyStep = $obj[ReflectionData.Key_Step];
            $textCtrlInput.target = this
            return $textCtrlInput;
        }
        public refreshViewValue(): void {
            for (var i: number = 0; i < this.ui.length; i++) {
                this.ui[i].refreshViewValue()
            }
            this.resize();
        }
        public destory(): void
        {
            while (this.ui.length) {
                var $ui: BaseReflComponent = this.ui.pop();
                $ui.destory()
            }

        }

    }
}