module pack {
    import LoadManager = Pan3d.LoadManager
    import Scene_data = Pan3d.Scene_data
    import Pan3dByteArray = Pan3d.Pan3dByteArray
    import PrefabStaticMesh = pack.PrefabStaticMesh
    import ConstItem = Pan3d.ConstItem
    import TexItem = Pan3d.TexItem
    import TextureManager = Pan3d.TextureManager;
    import TextureRes = Pan3d.TextureRes


    export class PackObjDataManager {

        private static _instance: PackObjDataManager;
        public static getInstance(): PackObjDataManager {
            if (!this._instance) {
                this._instance = new PackObjDataManager();
            }
            return this._instance;
        }
        private dic: any = {};
        private loadDic: any = {};
        public getObjDataByUrl($url: string, bfun: Function): void {
 
            if (this.dic[$url]) { //有了就反回
                bfun(this.dic[$url])
            }
            if (!this.loadDic[$url]) { //创建加载队列
                this.loadDic[$url] = [bfun]
                LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.XML_TYPE,
                    ($modelxml: string) => {
                        var $objData: ObjData = this.readTxtToModel($modelxml)
                        if (!this.dic[$url]) {
                            this.dic[$url] = $objData;
                        }
                        while (this.loadDic[$url].length) {
                            this.loadDic[$url].pop()($objData);
                        }
                    });
            } else {
                this.loadDic[$url].push(bfun)
            }
   
        }
        public readTxtToModel($str: string): ObjData {
            var objstr: any = JSON.parse($str);
            var $objdata: ObjData = new ObjData();
            $objdata.vertices = objstr.vertices
            $objdata.normals = objstr.normals
            $objdata.uvs = objstr.uvs
            $objdata.lightuvs = objstr.lightuvs
            $objdata.indexs = objstr.indexs
            $objdata.treNum = $objdata.indexs.length


            TBNUtils.processTBN($objdata);

            $objdata.vertexBuffer = Scene_data.context3D.uploadBuff3D($objdata.vertices);
            $objdata.uvBuffer = Scene_data.context3D.uploadBuff3D($objdata.uvs);
            $objdata.lightUvBuffer = Scene_data.context3D.uploadBuff3D($objdata.lightuvs);
            $objdata.tangentBuffer = Scene_data.context3D.uploadBuff3D($objdata.tangents);
            $objdata.bitangentBuffer = Scene_data.context3D.uploadBuff3D($objdata.bitangents);
            $objdata.normalsBuffer = Scene_data.context3D.uploadBuff3D($objdata.normals);
            $objdata.indexBuffer = Scene_data.context3D.uploadIndexBuff3D($objdata.indexs);

            return $objdata


        }
    }
}