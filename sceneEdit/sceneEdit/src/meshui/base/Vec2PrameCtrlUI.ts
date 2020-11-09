module prop {
    import Vector3D = Pan3d.Vector3D
    export class Vec2PrameCtrlUI extends BaseReflComponent {

        protected textLabelUI: TextLabelUI;
        protected inputTextUiX: InputTextUi;
        protected inputTextUiY: InputTextUi;
 
        protected textX: TextLabelUI;
        protected textY: TextLabelUI;
   
        protected _v2d: Vector2D;
        protected initView(): void {
            this.textLabelUI = new TextLabelUI();
            this.textX = new TextLabelUI(50, 30);
            this.textY = new TextLabelUI(50, 30);
 
            this.textX.label = "X:";
            this.textY.label = "Y:";
 

            this.inputTextUiX = new InputTextUi(100, 30);
            this.inputTextUiY = new InputTextUi(100, 30);
 

            this.propPanle.addBaseMeshUi(this.textLabelUI)
            this.propPanle.addBaseMeshUi(this.textX)
            this.propPanle.addBaseMeshUi(this.textY)
 
            this.propPanle.addBaseMeshUi(this.inputTextUiX)
            this.propPanle.addBaseMeshUi(this.inputTextUiY)
 


            this.inputTextUiX.addEventListener(ReflectionEvet.CHANGE_DATA, this.inputTextUiXchange, this)
            this.inputTextUiY.addEventListener(ReflectionEvet.CHANGE_DATA, this.inputTextUiYchange, this)
 

            this.height = 30
        }
        public destory(): void {


            this.textLabelUI.destory();
            this.inputTextUiX.destory();
            this.inputTextUiY.destory();
 
            this.textX.destory();
            this.textY.destory();
 



        }
        public set visible(value: boolean) {
 

            this.inputTextUiX.visible = value
            this.inputTextUiY.visible = value
 

        }
        public set data(value: any) {
            this._data = value;
            this._v2d = this._data

        }
        public get data(): any {
            return this._data
        }

        private inputTextUiXchange($evt: ReflectionEvet): void {
            this._v2d.x = Number($evt.data);
            this.changeV3d()
        }
        private inputTextUiYchange($evt: ReflectionEvet): void {
            this._v2d.y = Number($evt.data);
            this.changeV3d()
        }
  
        private changeV3d(): void {

            this.target[this.FunKey] = this._v2d;
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
            this._v2d = this.target[this.FunKey]

            this.inputTextUiX.text = this.getNumStr(this._v2d.x);
            this.inputTextUiY.text = this.getNumStr(this._v2d.y);
    

        }
        public getNumStr(num: number): string {
            var n: number = Math.floor(num * 100) / 100;
            return n.toString();
        }
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x - 0;

            this.textX.x = this._x + 55;
            this.textY.x = this._x + 125;
   

            this.inputTextUiX.x = this._x + 85;
            this.inputTextUiY.x = this._x + 155;
 

        }
        public resize(): void {
            super.resize()
            this.inputTextUiX.resize();
            this.inputTextUiY.resize();
 
        }

        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value + 5;
            this.textLabelUI.y = this._y
            this.textX.y = this._y
            this.textY.y = this._y
    
            this.inputTextUiX.y = this._y
            this.inputTextUiY.y = this._y
 

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
 

}