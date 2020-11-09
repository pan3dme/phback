module prop {
    import Vector3D = Pan3d.Vector3D;
    import ModuleEventManager = Pan3d.ModuleEventManager;
    export class Vec3PropMeshPanel extends MetaDataView {
        private constVec3NodeUI: materialui.ConstVec3NodeUI;
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.Vec3Color, Label: "Vec3d:", FunKey: "constValue", target: this, Step: 0.1, Category: "属性" },
                ];
            return ary;
        }
 
        public set data(value: any) {
            this._data = value;
            this.constVec3NodeUI = this._data;
 
            this.refreshViewValue()


        }
        public get data(): any {
            return this._data
        }

        public get constValue() {
            return this.constVec3NodeUI.constValue
        }
        public set constValue(value: Vector3D) {
            this.constVec3NodeUI.constValue = value 
            this.changeData();
      

        }


        private changeData(): void {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        }
    }
}