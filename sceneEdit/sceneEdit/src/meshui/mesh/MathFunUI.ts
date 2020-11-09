module prop {

    export class AgalFunUI extends BaseReflComponent {

        private textLabelUI: TextLabelUI;
        private textFunNameUI: TextLabelUI;

 

        protected initView(): void {
            this.textLabelUI = new TextLabelUI();
            this.textFunNameUI = new TextLabelUI();

            this.height = 20
        }
        public destory(): void {
            this.textLabelUI.destory()
            this.textFunNameUI.destory()

        }
        public set data(value: any) {
            this._data = value;

        }
        public get data(): any {
            return this._data
        }
        private onChangeInput($evt: ReflectionEvet): void {


            this.target[this.FunKey] = this.target[this.FunKey] + this.KeyStep * Number($evt.data);

            this.refreshViewValue();




        }
        public refreshViewValue(): void {

            var $vo: materialui.MathFunNodeUI = this.target[this.FunKey];
 

            this.textFunNameUI.label = (<materialui.NodeTreeFun>$vo.nodeTree).funName

           

        }
     
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 0;
            this.textFunNameUI.x = this._x + 75;
    
        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.textLabelUI.y = this._y
            this.textFunNameUI.y = this._y

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