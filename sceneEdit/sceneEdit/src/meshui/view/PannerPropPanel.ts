module prop {
    import Vector2D = Pan3d.Vector2D
    import ModuleEventManager = Pan3d.ModuleEventManager;
    export class PannerPropPanel extends MetaDataView {
        private pannerNodeUI: materialui.PannerNodeUI;
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.NumberInput, Label: "coord_x:", FunKey: "coordinateX", target: this, Step: 0.01 },
                    { Type: ReflectionData.NumberInput, Label: "coord_y:", FunKey: "coordinateY", target: this, Step: 0.01 },

                    { Type: ReflectionData.NumberInput, Label: "speed_x:", FunKey: "speedX", target: this, Step: 0.01 },
                    { Type: ReflectionData.NumberInput, Label: "speed_y:", FunKey: "speedY", target: this, Step: 0.01 },
                ];
            return ary;
        }
        private _coordinate: Vector2D
        public set data(value: any) {
            this._data = value;
            this.pannerNodeUI = this._data;
            this.refreshViewValue();

        }
        public get data(): any {
            return this._data;
        }
        public get coordinateX(): number {
            return this.pannerNodeUI.coordinate.x;
        }
        public set coordinateX(value: number) {
            this.pannerNodeUI.coordinate.x = value;
            this.changeData();
        }
        public get coordinateY(): number {
            return this.pannerNodeUI.coordinate.y;
        }
        public set coordinateY(value: number) {
            this.pannerNodeUI.coordinate.y = value;
            this.changeData();
        }
        public get speedX(): number {
            return this.pannerNodeUI.speed.x;
        }
        public set speedX(value: number) {
            this.pannerNodeUI.speed.x = value;
            this.changeData()
        }
        public get speedY(): number {
            return this.pannerNodeUI.speed.y;
        }
        public set speedY(value: number) {
            this.pannerNodeUI.speed.y = value;
            this.changeData()
        }
        private changeData(): void {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        }
    }
}