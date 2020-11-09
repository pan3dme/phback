module prop {
    import Vector2D = Pan3d.Vector2D;
    import InteractiveEvent = Pan3d.InteractiveEvent
    import ModuleEventManager = Pan3d.ModuleEventManager
    

    export class ComBoBoxCtrl2D extends BaseReflComponent {

        protected textLabelUI: TextLabelUI;
        protected comboBoxUi: ComboBoxUi;

  

        protected initView(): void {
            this.textLabelUI = new TextLabelUI();
            this.comboBoxUi = new ComboBoxUi();

            this.propPanle.addBaseMeshUi(this.textLabelUI)
            this.propPanle.addBaseMeshUi(this.comboBoxUi)
 

            this.comboBoxUi.addEventListener(InteractiveEvent.Down, this.comboBoxUiDown, this)
            this.height = 30
        }
        public destory(): void {
            this.textLabelUI.destory()
            this.comboBoxUi.destory()
        }
        public set data(value: any) {
            this._data = value;
            this.comboxListTxt = this._data

        }
        public get data(): any {
            return this._data
        }
        private comboxListTxt: Array<any>;
        protected comboBoxUiDown($evt: InteractiveEvent): void {
            var $rightMenuEvet: menutwo.MenuTwoEvent = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_COMBOX_MENU);
            $rightMenuEvet.posv2d = new Vector2D(this.comboBoxUi.ui.absoluteX, this.comboBoxUi.ui.absoluteY + 20);
            $rightMenuEvet.comboxData = this.data;
            $rightMenuEvet.comboxFun = (value: number) => { this.selectFun(value)}
            ModuleEventManager.dispatchEvent($rightMenuEvet);
        }
        protected selectFun(value: number): void {
            this.target[this.FunKey] = value;
            this.refreshViewValue();
        }
        public refreshViewValue(): void {
            if (this.FunKey) {
                var $i: number = this.target[this.FunKey]
                if (this.comboxListTxt[$i]) {
                    this.comboBoxUi.text = this.comboxListTxt[$i].name
                }
             
            }
        }
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 0;
            this.comboBoxUi.x = this._x + 75;
        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.textLabelUI.y = this._y+4
            this.comboBoxUi.y = this._y+6
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