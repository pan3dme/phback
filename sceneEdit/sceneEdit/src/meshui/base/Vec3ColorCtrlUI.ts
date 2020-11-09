module prop {
    import Vector3D = Pan3d.Vector3D
    export class Vec3dCtrlUI extends BaseReflComponent {

        protected textLabelUI: TextLabelUI;
        protected inputTextUiX: InputTextUi;
        protected inputTextUiY: InputTextUi;
        protected inputTextUiZ: InputTextUi;

        protected textX: TextLabelUI;
        protected textY: TextLabelUI;
        protected textZ: TextLabelUI;

 

        protected _v3d: Vector3D;
        protected initView(): void {
            this.textLabelUI = new TextLabelUI();
            this.textX = new TextLabelUI(50,30);
            this.textY = new TextLabelUI(50, 30);
            this.textZ = new TextLabelUI(50, 30);
            this.textX.label = "X:";
            this.textY.label = "Y:";
            this.textZ.label = "Z:";

            this.inputTextUiX = new InputTextUi(100,30);
            this.inputTextUiY = new InputTextUi(100, 30);
            this.inputTextUiZ = new InputTextUi(100, 30);

            this.propPanle.addBaseMeshUi(this.textLabelUI)
            this.propPanle.addBaseMeshUi(this.textX)
            this.propPanle.addBaseMeshUi(this.textY)
            this.propPanle.addBaseMeshUi(this.textZ)
            this.propPanle.addBaseMeshUi(this.inputTextUiX)
            this.propPanle.addBaseMeshUi(this.inputTextUiY)
            this.propPanle.addBaseMeshUi(this.inputTextUiZ)


            this.inputTextUiX.addEventListener(ReflectionEvet.CHANGE_DATA, this.inputTextUiXchange, this)
            this.inputTextUiY.addEventListener(ReflectionEvet.CHANGE_DATA, this.inputTextUiYchange, this)
            this.inputTextUiZ.addEventListener(ReflectionEvet.CHANGE_DATA, this.inputTextUiZchange, this)
 
            this.height = 30
        }
        public destory(): void {
 

            this.textLabelUI.destory();
            this.inputTextUiX.destory();
            this.inputTextUiY.destory();
            this.inputTextUiZ.destory();
            this.textX.destory();
            this.textY.destory();
            this.textZ.destory();

        
  
        }
        public set visible(value: boolean) {



            this.inputTextUiX.visible = value
            this.inputTextUiY.visible = value
            this.inputTextUiZ.visible = value

        }
        public set data(value: any) {
            this._data = value;
            this._v3d = this._data 
       
        }
        public get data(): any {
            return this._data
        }
  
        private inputTextUiXchange($evt: ReflectionEvet): void {
            this._v3d.x = Number($evt.data);
            this.changeV3d()
        }
        private inputTextUiYchange($evt: ReflectionEvet): void {
            this._v3d.y = Number($evt.data);
            this.changeV3d()
        }
        private inputTextUiZchange($evt: ReflectionEvet): void {
            this._v3d.z = Number($evt.data);
            this.changeV3d()
        }
        private changeV3d(): void {
         
            this.target[this.FunKey] = this._v3d;
            this.changFun && this.changFun(this);
            this.refreshViewValue();
        }
        protected colorPickUIchange($evt: ReflectionEvet): void {
            var $vec: Vector3D = <Vector3D>($evt.data);
            this.target[this.FunKey] = $vec
            this.changFun && this.changFun(this);
            this.refreshViewValue();
        }
        public refreshViewValue(): void {
            this._v3d = this.target[this.FunKey]
 
            this.inputTextUiX.text = this.getNumStr(this._v3d.x);
            this.inputTextUiY.text = this.getNumStr(this._v3d.y);
            this.inputTextUiZ.text = this.getNumStr(this._v3d.z);

        }
        public getNumStr(num: number): string {
            var n: number = Math.floor(num * 100) / 100;
            return n.toString();
        }
        public set x(value: number) {
            this._x = value ;
            this.textLabelUI.x = this._x - 0;

            this.textX.x = this._x + 55;
            this.textY.x = this._x + 125;
            this.textZ.x = this._x + 195;

            this.inputTextUiX.x = this._x + 85;
            this.inputTextUiY.x = this._x + 155;
            this.inputTextUiZ.x = this._x + 225;

        }
        public resize(): void {
            super.resize()
            this.inputTextUiX.resize();
            this.inputTextUiY.resize();
            this.inputTextUiZ.resize();
        }
  
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value + 5;
            this.textLabelUI.y = this._y
            this.textX.y = this._y
            this.textY.y = this._y
            this.textZ.y = this._y
            this.inputTextUiX.y = this._y
            this.inputTextUiY.y = this._y
            this.inputTextUiZ.y = this._y
          
        }
     
      
        public get y(): number {
            return this._y
        }
        public get label(): string {
            return this._label;
        }
        public set label(value: string) {
            this._label = value
            this.textLabelUI.label = value;
        }
    }

    export class Vec3ColorCtrlUI extends Vec3dCtrlUI {
        private colorPickUI: ColorPickUI
    
        public set x(value: number) {
            this._x = value + 10;
            this.textLabelUI.x = this._x - 20;

            this.textX.x = this._x + 55;
            this.textY.x = this._x + 125;
            this.textZ.x = this._x + 195;

            this.inputTextUiX.x = this._x + 85;
            this.inputTextUiY.x = this._x + 155;
            this.inputTextUiZ.x = this._x + 225;

            this.colorPickUI.x = this._x + 37;
        }
        public set y(value: number) {
            this._y = value + 5;
            this.textLabelUI.y = this._y
            this.textX.y = this._y
            this.textY.y = this._y
            this.textZ.y = this._y
            this.inputTextUiX.y = this._y
            this.inputTextUiY.y = this._y
            this.inputTextUiZ.y = this._y
            this.colorPickUI.y = this._y +2;
        }
        public refreshViewValue(): void {
            super.refreshViewValue()
            this.colorPickUI.vec3d = this._v3d;
            

        }
        protected initView(): void {

            super.initView()
            this.colorPickUI = new ColorPickUI(12, 12);
            this.colorPickUI.addEventListener(ReflectionEvet.CHANGE_DATA, this.colorPickUIchange, this)

            this.propPanle.addBaseMeshUi(this.colorPickUI )
     
        }
        public destory(): void {
            super.destory()
            this.colorPickUI.destory();
        }
    }

}