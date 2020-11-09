module prop {
    import ModuleEventManager = Pan3d.ModuleEventManager;
    export class MathFunMeshPanel extends MetaDataView {

        private mathFunNodeUI: materialui.MathFunNodeUI;
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "tittleStr", target: this, Category: "函数" },
                    { Type: ReflectionData.MaterialFunContentUI, Label: "窗口:", FunKey: "nodeUI",    target: this, Category: "程序" },
                ];
            return ary;
        }
        public get tittleStr(): string {
            return this.mathFunNodeUI.tittleStr
        }
      
 
        public set data(value: any) {
            this._data = value;
            this.mathFunNodeUI = this._data;
            this.refreshViewValue();
  
        }
        
        private changeFile(evt: any): void {

            /*
            if (materialui.NodeTreeFun.isNeedChangePanel($agalStr, (<materialui.NodeTreeFun>this.mathFunNodeUI.nodeTree).funStr)) {
                this.mathFunNodeUI.inPutFunStr($agalStr)
            } else {
                (<materialui.NodeTreeFun>this.mathFunNodeUI.nodeTree).funStr = $agalStr
                this.changeData();
            }
            */
        }

        public destory(): void {
            super.destory()
        
        }
        public get data(): any {

            console.log(this.mathFunNodeUI)
            return this._data
        }
        public get nodeUI(): materialui.MathFunNodeUI {
            return this.mathFunNodeUI
        }
        public set nodeUI(value: materialui.MathFunNodeUI) {
            
            this.changeData();

        }
        private changeData(): void {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        }
    }
}