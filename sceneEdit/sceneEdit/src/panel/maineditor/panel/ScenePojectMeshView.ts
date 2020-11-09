module maineditor {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material
    import MaterialTree = materialui.MaterialTree
    import PrefabStaticMesh = pack.PrefabStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class ScenePojectMeshView extends MetaDataView {


        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.TEXT, Label: "场景名字:", FunKey: "mapname", target: this, Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "背景颜色:", FunKey: "bgcolor", target: this, Step: 0.1, Category: "属性" },
                    { Type: ReflectionData.ComboBox, Label: "坐标网格:", FunKey: "gridline", target: this, Category: "属性", Data: [{ name: "false", type: 0 }, { name: "true", type: 1 }] },

                    { Type: ReflectionData.Vec3, Label: "坐标:", FunKey: "campos", target: this, Step: 1, Category: "镜头" },
                    { Type: ReflectionData.Vec3, Label: "角度:", FunKey: "camrotation", target: this, Step: 1, Category: "镜头" },
                    { Type: ReflectionData.NumberInput, Label: "比例:", FunKey: "scenescale", target: this, Step: 1, Category: "镜头" },

                    { Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "texture", changFun: (value: Array<any>) => { this.textureChangeInfo(value) }, target: this, Suffix: "material", Category: "后期" },

                ];
            return ary;
        }
        public get scenescale(): number {
            return this.sceneProjectVo.scenescale  
        }
        public set scenescale(value: number) {
            this.sceneProjectVo.scenescale  =value
            ScenePojectMeshView.gridLineSprite.scale = this.sceneProjectVo.scenescale
        }


        private static gridLineSprite: Pan3d.GridLineSprite;
        public get gridline(): number {
            if (!ScenePojectMeshView.gridLineSprite) {
                ScenePojectMeshView.gridLineSprite = new Pan3d.GridLineSprite()
                ScenePojectMeshView.gridLineSprite.scale = this.sceneProjectVo.scenescale
            }
            ScenePojectMeshView.gridLineSprite.scale=0.5
            if (this.sceneProjectVo.gildline) {
                MainEditorProcessor.edItorSceneManager.addDisplay(ScenePojectMeshView.gridLineSprite, 0);
            } else {
                MainEditorProcessor.edItorSceneManager.removeDisplay(ScenePojectMeshView.gridLineSprite);
            }
            return this.sceneProjectVo.gildline ? 1 : 0
        }
        public set gridline(value: number) {
            this.sceneProjectVo.gildline = value == 1;
            this.refreshViewValue();

        }
        private textureChangeInfo(value: Array<any>): void {
            this.sceneProjectVo.paramInfo = value;

            this.sceneProjectVo.materialParam= new Pan3d.MaterialBaseParam;
            this.sceneProjectVo.materialParam.material = this.sceneProjectVo.material
             pack.PackPrefabManager.getInstance().makeMaterialBaseParam(this.sceneProjectVo.materialParam, this.sceneProjectVo.paramInfo);
 
        }
        //private chuangeData(): void {
        //    this.sceneProjectVo.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE))
        //}
        public getParamItem(value: string): any {
            for (var i: number = 0; this.sceneProjectVo.paramInfo && i < this.sceneProjectVo.paramInfo.length; i++) {
                if (this.sceneProjectVo.paramInfo[i].paramName == value) {
                    return this.sceneProjectVo.paramInfo[i].data
                }
            }
            return null
        }

        public set texture(value: MaterialTree) {
            this.sceneProjectVo.material = value
            this.sceneProjectVo.textureurl = this.sceneProjectVo.material.url
            this.refreshViewValue()
        }
        public get texture(): MaterialTree {
            if (this.sceneProjectVo.material) {
                return this.sceneProjectVo.material
            } else {
                if (this.sceneProjectVo.textureurl) {

                    pack.PackMaterialManager.getInstance().getMaterialByUrl(this.sceneProjectVo.textureurl, ($materialTree: MaterialTree) => {
                        this.sceneProjectVo.material = $materialTree;
                        this.refreshViewValue()
                    })

                }
                return null
            }


        }
        public get mapname() {
            return AppData.mapOpenUrl;
        }

        public get data(): any {
            return this._data
        }

        public set data(value: any) {
            this._data = value
            this.sceneProjectVo = value;
            this.refreshViewValue();
        }
        private sceneProjectVo: SceneProjectVo
        public get campos() {
            return new Vector3D()
        }
        public set campos(value: Vector3D) {

        }
        private _bgcolor: Vector3D = new Vector3D(11, 11, 11)
        public get bgcolor() {
            return this._bgcolor
        }
        public set bgcolor(value: Vector3D) {
            this._bgcolor = value
        }
        public get camrotation() {
            return new Vector3D()
        }
        public set camrotation(value: Vector3D) {

        }



    }
}