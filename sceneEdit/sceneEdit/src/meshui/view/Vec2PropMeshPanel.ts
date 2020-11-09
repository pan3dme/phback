module prop {
    import Vector2D = Pan3d.Vector2D
    import ModuleEventManager = Pan3d.ModuleEventManager;
    export class Vec2PropMeshPanel extends MetaDataView {
        private constVec2NodeUI: materialui.ConstVec2NodeUI;
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.Vec2, Label: "xy:", FunKey: "vec2data", target: this, Step: 0.1, Category: "属性" },
                ];
            return ary;
        }
        public set vec2data(value: Vector2D) {
            this.constVec2NodeUI.constValue = value;
            this.changeData();
            this.refreshViewValue();
        }
        public get vec2data(): Vector2D {
            return this.constVec2NodeUI.constValue;
        }
        public set data(value: any) {
            this._data = value;
            this.constVec2NodeUI = this._data;
            this.refreshViewValue();
        }
        public get data(): any {
            return this._data;
        }
        
        private changeData(): void {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        }
    }
}