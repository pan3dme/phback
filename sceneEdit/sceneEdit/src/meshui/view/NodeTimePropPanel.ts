module prop {
    import ModuleEventManager = Pan3d.ModuleEventManager;
    export class NodeTimePropPanel extends MetaDataView {

        private timeNodeUI: materialui.TimeNodeUI;
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.NumberInput, Label: "时间间隔:", FunKey: "timeInterval", target: this, Step: 0.01, Category: "属性" },
                    { Type: ReflectionData.NumberInput, Label: "数值比例:", FunKey: "numScale", target: this, Step: 0.01, Category: "属性" },

                ];
            return ary;
        }
        public set data(value: any) {
            this._data = value;
            this.timeNodeUI = this._data;
            this.refreshViewValue()
        }
        public get data(): any {
            return this._data
        }

        public get timeInterval(): number {
            return this.timeNodeUI.timeValue.x
        }
        public set timeInterval(value: number) {
            this.timeNodeUI.timeValue.x = value
            this.changeData();

        }
        public get numScale(): number {
            return this.timeNodeUI.timeValue.y
        }
        public set numScale(value: number) {
            this.timeNodeUI.timeValue.y = value
            this.changeData();

        }
        private changeData(): void {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        }
    }
}