module prop {


 
    import InteractiveEvent = Pan3d.InteractiveEvent

    export class CheckBox2DUI extends BaseReflComponent {
 
        private boxIcon: BaseMeshUi;
        private textLabelUI: TextLabelUI;
        protected initView(): void {
 
            this.boxIcon = new BaseMeshUi(18, 18);
            this.textLabelUI = new TextLabelUI();
            this.propPanle.addBaseMeshUi(this.boxIcon)
            this.propPanle.addBaseMeshUi(this.textLabelUI)
            this.height = 25
            this.boxIcon.ui.addEventListener(InteractiveEvent.Up, this.clikMouseUp, this)
        }
        private clikMouseUp(evt: InteractiveEvent): void {

            this.target[this.FunKey] = !this.target[this.FunKey]
            this.refreshViewValue();
        }
 
        public destory(): void {
            this.boxIcon.ui.removeEventListener(InteractiveEvent.Up, this.clikMouseUp, this)
            this.textLabelUI.destory()
            this.boxIcon.destory();

  
        }
    
        public refreshViewValue(): void {

            if (this.target[this.FunKey]) {
                this.drawUrlImgToUi(this.boxIcon.ui, "icon/checkbox_down.png")
      
            } else {
                this.drawUrlImgToUi(this.boxIcon.ui, "icon/checkbox_up.png")
            }
 

        }

        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x ;
 
            this.boxIcon.x = 100

        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.textLabelUI.y = this._y + 5
 

            this.boxIcon.y = this._y + 2
 
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