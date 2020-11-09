module materialleft {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;
    import UiMeshSprite = prop.UiMeshSprite





    export class MateriaMeshView extends MetaDataView {
        public constructor(value: UiMeshSprite) {
            super(value);
           
           
        }
        public resize(): void {
            this._top = 0
            super.resize()
        }
        
        public getView(): Array<any> {
            if (isNaN(this.hideCategoryKey["后期"])) {
                this.hideCategoryKey["后期"] = true;
                this.hideCategoryKey["属性"] = true;
            }

 
            var ary: Array<any> =
                [
                    { Type: ReflectionData.MeshMaterialLeft2DUI, Label: "窗口:", FunKey: "materialTree", Suffix:"prefab|zzw|objs",target: this, Category: "模型" },
                    {
                        Type: ReflectionData.ComboBox, Label: "渲染模式:", FunKey: "blendMode", target: this, Data: [
             
                            { name: "普通模式", type: 0 },
                            { name: "透明模式", type: 1 },
                            { name: "叠加模式", type: 2 }],
                        Category: "设置"
                    },

             
                    { Type: ReflectionData.CheckBox, Label: "深度测试:", FunKey: "testzbuff", target: this, Category: "设置" },
                    { Type: ReflectionData.CheckBox, Label: "写入深度:", FunKey: "writeZbuffer", target: this, Category: "设置" },
                    { Type: ReflectionData.CheckBox, Label: "点灯光:", FunKey: "pointlight", target: this, Category: "设置" },

                    { Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "laterTexture", changFun: (value: Array<any>) => { this.textureChangeInfo(value) }, target: this, Suffix: "material", Category: "后期" },

                    { Type: ReflectionData.Vec3Color, Label: "模型列表:", FunKey: "sunDirect", target: this, Step: 0.1, Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "sun颜色:", FunKey: "sunColor", target: this, Step: 0., Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "基本颜色:", FunKey: "ambientColor", target: this, Step: 0.1, Category: "属性" },

                ];
            return ary;
        }
        public getParamItem(value: string): any {
            return null
        }
        public set laterTexture(value: materialui.MaterialTree) {

            this._materialTree.laterTextureurl = value.url;
            this._materialTree.laterTexture = value

            this.refreshViewValue()
        }
        public get laterTexture(): materialui.MaterialTree {

            return this._materialTree.laterTexture
        }
        private textureChangeInfo(value: Array<any>): void {
 
 

        }
        public set materialTree(value: materialui.MaterialTree) {

        }
        private _materialTree: materialui.MaterialTree
        public get materialTree(): materialui.MaterialTree {

            return this._materialTree;
        }
        public get blendMode(): number {
            return this._materialTree.blendMode
        }
        public set blendMode(value: number) {
             this._materialTree.blendMode = value
        }
        public get testzbuff(): boolean {
            return this._materialTree.zbuff
        }
        public set testzbuff(value: boolean) {
            this._materialTree.zbuff = value

        }

        public get writeZbuffer(): boolean {
            return this._materialTree.writeZbuffer;
        }
        public set writeZbuffer(value: boolean) {
            this._materialTree.writeZbuffer = value;

        }
        public get pointlight(): boolean {
            return this._materialTree.pointlight
        }
        public set pointlight(value: boolean) {
            this._materialTree.pointlight = value

        }

    

        public set data(value: any) {
            this._data = value;
            this._materialTree = value;
            this.refreshViewValue()
        }
        public get data(): any {
            return this._data
        }
        public get sunDirect(): Vector3D {
            return new Vector3D(Scene_data.light.sunDirect[0], Scene_data.light.sunDirect[1], Scene_data.light.sunDirect[2]);
        }
        public set sunDirect(value: Vector3D) {
            Scene_data.light.sunDirect[0] = value.x;
            Scene_data.light.sunDirect[1] = value.y;
            Scene_data.light.sunDirect[2] = value.z;
        }

        public get sunColor(): Vector3D {
            return new Vector3D(Scene_data.light.sunColor[0], Scene_data.light.sunColor[1], Scene_data.light.sunColor[2]);
        }
        public set sunColor(value: Vector3D) {
            Scene_data.light.sunColor[0] = value.x;
            Scene_data.light.sunColor[1] = value.y;
            Scene_data.light.sunColor[2] = value.z;
        }

        public get ambientColor(): Vector3D {
            return new Vector3D(Scene_data.light.ambientColor[0], Scene_data.light.ambientColor[1], Scene_data.light.ambientColor[2]);
        }
        public set ambientColor(value: Vector3D) {
            Scene_data.light.ambientColor[0] = value.x;
            Scene_data.light.ambientColor[1] = value.y;
            Scene_data.light.ambientColor[2] = value.z;
        }
    


    }
}