module pack {
    import LoadManager = Pan3d.LoadManager
    import Scene_data = Pan3d.Scene_data
    import Pan3dByteArray = Pan3d.Pan3dByteArray
    import PrefabStaticMesh = pack.PrefabStaticMesh
    import ConstItem = Pan3d.ConstItem
    import TexItem = Pan3d.TexItem
    import TextureManager = Pan3d.TextureManager;
    import TextureRes = Pan3d.TextureRes
    import Material = Pan3d.Material
    import DynamicBaseConstItem = Pan3d.DynamicBaseConstItem
    import DynamicBaseTexItem = Pan3d.DynamicBaseTexItem
    import MaterialBaseParam = Pan3d.MaterialBaseParam

    
    export class PackPrefabManager {

        private static _instance: PackPrefabManager;
        public static getInstance(): PackPrefabManager {
            if (!this._instance) {
                this._instance = new PackPrefabManager();
            }
            return this._instance;
        }
        public constructor() {

        }
        private dic: any = {}
        private loadDic: any = {}


        private playBfun($prefab: PrefabStaticMesh, $url: string): void {
            if (!this.dic[$url]) {
                this.dic[$url] = $prefab;
            }
            while (this.loadDic[$url].length) {
                this.loadDic[$url].pop()($prefab);
            }
        }

        public makeMaterialBaseParam(materialParam: MaterialBaseParam, paramInfo: Array<any>): void {
            materialParam.dynamicConstList = []
            materialParam.dynamicTexList = []
            for (var i: number = 0; paramInfo&& i < paramInfo.length; i++) {
                var tempInfo: any = paramInfo[i];
                if (tempInfo.type == "tex") {
                    this.mekeParamTexture(tempInfo, materialParam)
                } else {
                    this.makeParamValue(tempInfo, materialParam)
                }
            }
     
        }
        private makeParamValue(obj: any, materialParam: MaterialBaseParam): void {
 
            var constList: Array<ConstItem>  = materialParam.material.constList;
            var targetName = obj.paramName;
            var target = null;
            for (var j = 0; j < constList.length; j++) {
                if (targetName == constList[j].paramName0
                    || targetName == constList[j].paramName1
                    || targetName == constList[j].paramName2
                    || targetName == constList[j].paramName3) {
                    target = constList[j];
                    break;
                }
            }
 
            var constItem: DynamicBaseConstItem = new DynamicBaseConstItem();
            constItem.setTargetInfo(target, targetName, obj.type);
            switch (obj.type) {
                case "vec3":
                    constItem.setCurrentVal(obj.data.x, obj.data.y, obj.data.z);
                    break
                case "vec2":
                    constItem.setCurrentVal(obj.data.x, obj.data.y);
                    break
                case "float":
                    constItem.setCurrentVal(obj.data);
                    break
            }
  
            materialParam.dynamicConstList.push(constItem)
        }
      
        private mekeParamTexture(obj: any,  materialParam: MaterialBaseParam): void {
            var texList = materialParam.material.texList;
            var texItem: DynamicBaseTexItem = new DynamicBaseTexItem();
            texItem.paramName = obj.paramName;
            for (var i: number = 0; i < texList.length; i++) {
                if (texItem.paramName == texList[i].paramName) {
                    texItem.target = texList[i];
                    break;
                }
            }
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + obj.data, ($textres: TextureRes) => {
                texItem.textureRes = $textres;
            });
     
            materialParam.dynamicTexList.push(texItem);


        }
        public getPrefabByUrl($url: string, bfun: Function): void {
            if (this.dic[$url]) { //有了就反回
                bfun ( this.dic[$url])
            }
            if (!this.loadDic[$url]) { //创建加载队列
                this.loadDic[$url] = [bfun]
                LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.BYTE_TYPE, ($byte: any) => {
                    var $obj: any = JSON.parse(new Pan3dByteArray($byte).readUTF())
                    var $prefab: PrefabStaticMesh = new PrefabStaticMesh();
                    for (var key in $obj) {
                        $prefab[key] = $obj[key];
                    }
                    $prefab.url = $url;
         
                    if ($prefab.objsurl) {
                        pack.PackObjDataManager.getInstance().getObjDataByUrl($prefab.objsurl, (value: ObjData) => {
                            $prefab.objData = value;
                            if ($prefab.textureurl) {
                                pack.PackMaterialManager.getInstance().getMaterialByUrl($prefab.textureurl, ($materialTree: materialui.MaterialTree) => {
                                    $prefab.material = $materialTree;
                                //    console.log("prefab加载完成", $prefab.url)
                                    this.playBfun($prefab, $url)
                                })
                            }
                        
                        })
                    } else {
                        console.log("没有模型地址")
                        if ($prefab.textureurl) {
                            pack.PackMaterialManager.getInstance().getMaterialByUrl($prefab.textureurl, ($materialTree: materialui.MaterialTree) => {
                                $prefab.material = $materialTree;
                                this.playBfun($prefab, $url)
                            })
                        } else {
                            console.log("没有材质地址")
                        }

                    }

                
                    

                });
            } else {
                this.loadDic[$url].push(bfun)
            }
        
 
        }
  
       
    }
}