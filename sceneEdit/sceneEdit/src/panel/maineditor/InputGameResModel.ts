module inputres {
    import Scene_data = Pan3d.Scene_data
    import FBO = Pan3d.FBO
    import Display3D = Pan3d.Display3D
    import MathClass = Pan3d.MathClass
    import Engine = Pan3d.Engine
    import Pan3dByteArray = Pan3d.Pan3dByteArray;
    import ByteArray = Pan3d.Pan3dByteArray
    import LoadManager = Pan3d.LoadManager;
    import ObjDataManager = Pan3d.ObjDataManager;
    import TextureManager = Pan3d.TextureManager
    import ModuleEventManager = Pan3d.ModuleEventManager


    export class SceneRes extends Pan3d.SceneRes {
        public bfun: Function;
        public readScene(): void {
            super.readScene();
            this.bfun();
        }
        private saveImgToSever(imgAryBuffer: ArrayBuffer, httpUrl:string): void {
            var $img: any = new Image()
            $img.url = httpUrl.replace(Scene_data.fileRoot, "");
            $img.src = 'data:image/png;base64,' + Pan3d.Base64.encode(imgAryBuffer);
            var $upfile: File = this.dataURLtoFile($img.src, $img.url);
            this.upOssFile($upfile, httpUrl)
        }
        private dataURLtoFile(dataurl: string, filename: string): File {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }
        private readChangeBuff(data: DataView, $dataWidth: number, $offset: number, $stride: number): Array<number> {

            var $arr: Array<number> = new Array
            var len: number = data.byteLength / (4 * $stride)
            for (var i: number = 0; i < len; i++) {
                var pos: number = $stride * i + $offset;
                for (var j: number = 0; j < $dataWidth; j++) {
                    var id: number = (pos + j) * 4
                    var num = data.getFloat32(id, true);
                    data.setFloat32(id, num, true);
                    $arr.push(num)
                }
            }
            return $arr
        }
        private saveObjDataToSever(objdata: ObjData, httpUrl: string): void {
            httpUrl = httpUrl.replace(".xml", ".objs");
            var tw: number = objdata.stride / 4
            var obj: any = {};
            obj.version = Scene_data.version
            obj.vertices = this.readChangeBuff(objdata.dataView, 3, 0, tw);
            obj.uvs = this.readChangeBuff(objdata.dataView, 2, 3, tw);
            obj.lightuvs = this.readChangeBuff(objdata.dataView, 2, 5, tw);
            obj.normals = obj.vertices
            obj.indexs = objdata.indexs
  

            for (var i: number = 0; i < obj.vertices.length; i++) {
                obj.vertices[i] *= this.scale //输小;
            }
            var $file: File = new File([JSON.stringify(obj)], "temp.objs");
            this.upOssFile($file, httpUrl)
        }
        private needRefrishArr: Array<string> = []

        private   getPerentPath(value: string): string {
            var idex: number = value.lastIndexOf("/")
            if (idex != -1) {
                value = value.substr(0, idex + 1)
            } else {
                value = ""
            }
            return value
        }
        private addNeedReedRerishDic(pathurl: string): void {
            pathurl = this.getPerentPath(pathurl);
            if (this.needRefrishArr.indexOf(pathurl) == -1) {
                this.needRefrishArr.push(pathurl)
            }
        }
        public reFrishArrByOney(): void {
            if (this.needRefrishArr.length) {
                var pathurl:string= this.needRefrishArr.pop()
                pack.FileOssModel.getDisByOss(pathurl, () => {
                    console.log("刷新了文件夹目录", pathurl);

                    this.reFrishArrByOney()
                })
            }
        }
        public fileRoot: string = "ccav/"
        public scale: number = 0.1
        private upOssFile(file: File, httpurl: string): void {
            var url: string = httpurl.replace(Scene_data.fileRoot, "") //得到相对位置；
            url = Scene_data.fileRoot + this.fileRoot+url   //得到http文件位置
            var ossUrl: string = url.replace(Scene_data.ossRoot, "");
            this.addNeedReedRerishDic(ossUrl)

            pack.FileOssModel.upOssFile(file, ossUrl, () => { })
        }
        
        public readObj($srcByte: Pan3dByteArray): void {
            var objNum: number = $srcByte.readInt();
            for (var i: number = 0; i < objNum; i++) {
                var url: string = Scene_data.fileRoot + $srcByte.readUTF();
                var size: number = $srcByte.readInt();
                var newByte: Pan3dByteArray = new Pan3dByteArray();
                newByte.length = size;
                $srcByte.readBytes(newByte, 0, size);
                var objData: ObjData = ObjDataManager.getInstance().loadObjCom(newByte.buffer, url);

                this.saveObjDataToSever(objData, url)
            }

            if (this._imgFun) {
                this._imgFun();
            }

        }
        public readImg(): void {
            this.imgNum = this._byte.readInt();
            this.imgLoadNum = 0;
            for (var i: number = 0; i < this.imgNum; i++) {
                var url: string = Scene_data.fileRoot + this._byte.readUTF();
                var imgSize: number = this._byte.readInt();
                if (url.search(".jpng") != -1) {
                    this.readJpngImg(url);
                    console.log("url")
                } else {
                    var imgAryBuffer: ArrayBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + imgSize);
                    this._byte.position += imgSize;
                    this.saveImgToSever(imgAryBuffer, url)
                }
         
                this.countImg()
            }
        }
    }
    export class ImputGameResModel {
        private static _instance: ImputGameResModel;
        public static getInstance(): ImputGameResModel {
            if (!this._instance) {
                this._instance = new ImputGameResModel();
            }
            return this._instance;
        }
        private sceneRes: SceneRes;
        public inputSceneFile($file: File, $fileroot: string): void {
            var $reader: FileReader = new FileReader();
            $reader.readAsArrayBuffer($file);
                $reader.onload = ($temp: Event) => {
                    if (this.isMapH5File(<ArrayBuffer>$reader.result)) {
                        var arrayBuff: ArrayBuffer = <ArrayBuffer>$reader.result
                        this.setMapByteMesh(arrayBuff, $fileroot);
                    } else {
                        alert("不确定类型");
                    }
                }
        }
   
        private setMapByteMesh($byte: ArrayBuffer, $fileroot: string): void {
            this.sceneRes = new SceneRes();
            this.sceneRes.fileRoot = $fileroot  //指定到对应文件夹；
            this.sceneRes.scale =0.1  //指定到对应文件夹；
            this.sceneRes.bfun = () => {
               

                var baseTextureUrl: string = "baseedit/assets/base/baselight.material";//原始材质位置
                var toTextureUrl: string = Scene_data.fileRoot.replace(Scene_data.ossRoot, "") + this.sceneRes.fileRoot + "baselight.material"; //对应工程位置
                pack.FileOssModel.copyFile(toTextureUrl  , baseTextureUrl);

                var buildItem: Array<any> = this.sceneRes.sceneData.buildItem;
                for (var i: number = 0; i < buildItem.length; i++) {
                    if (buildItem[i].type == 1) {
                        var pramaitam: Array<any> = []
                        var objsurl: string = buildItem[i].objsurl;
                        var lighturl: string = buildItem[i].lighturl;
                        var mainpic: string = this.getMainPic(buildItem[i].materialInfoArr)
                        var name: string = buildItem[i].name

                        pramaitam.push({ name: "param0", url: mainpic })
                        pramaitam.push({ name: "param1", url: lighturl })

                        if (objsurl) {
                            //console.log(name)
                            //console.log(objsurl)
                            //console.log(lighturl)
                            //console.log(mainpic)
                            if (!mainpic) {
                                mainpic = "assets/base/base.jpg"
                            }
                            if (!lighturl) {
                                lighturl = "assets/base/white.jpg"
                            }
                            this.makePerfabToSever(name, objsurl, pramaitam, buildItem[i])
                        }
                    }
                }
                this.sceneRes.reFrishArrByOney();

            }
            this.sceneRes.loadComplete($byte);
            //加载文件
            //LoadManager.getInstance().load(Scene_data.fileRoot + "pan/ccav.txt", LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
            //    this.sceneRes.loadComplete($byte);
            //});

        }
        private isMapH5File(arrayBuffer: ArrayBuffer): boolean {
            var $byte: ByteArray = new ByteArray(arrayBuffer);
            $byte.position = 0
            var $version: number = $byte.readInt();
            var $url: string = $byte.readUTF();
            if ($url.indexOf("role/") != -1) {
                return true
            } else {
                return true
            }

        }

        //从材质中获取一张图;
        private getMainPic(infoArr: Array<any>): string {
            for (var i: number = 0; infoArr&& i < infoArr.length; i++) {
                if (infoArr[i].type == 0) {
                    return infoArr[i].url
                }
            }
            return null;
        }
        private getNameByPath(value: string): string {
            return value.substr(value.lastIndexOf("/") + 1, value.length)
        }
        private makePerfabToSever(name: string, objsurl: string, imgItem: Array<any>, buildinfo: any): void {
            var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray();
            var prefabStaticMesh: pack.PrefabStaticMesh = new pack.PrefabStaticMesh()
         
            prefabStaticMesh.url = this.sceneRes.fileRoot+"prefab/" +name + ".prefab"  //放到指定路径
            prefabStaticMesh.objsurl = this.sceneRes.fileRoot+ objsurl.replace(".xml",".objs")
            prefabStaticMesh.textureurl = this.sceneRes.fileRoot + "baselight.material";
            prefabStaticMesh.paramInfo = [];
            for (var i: number = 0; i < imgItem.length; i++) {
                var paramVo: any = {};
                paramVo.id = i;
                paramVo.type = "tex";
                paramVo.paramName = imgItem[i].name;
                paramVo.data = this.sceneRes.fileRoot +  imgItem[i].url;
                prefabStaticMesh.paramInfo.push(paramVo);
 
            }
            var $fileUrl: string = Pan3d.Scene_data.fileRoot + prefabStaticMesh.url


            var $temp: any = prefabStaticMesh.getObject();
            $temp.version = pack.FileOssModel.version;
            $byte.writeUTF(JSON.stringify($temp))
 
            var $file: File = new File([$byte.buffer], "temp.prefab");
            var pathurl: string = $fileUrl.replace(Pan3d.Scene_data.ossRoot, "");

 
            pack.FileOssModel.upOssFile($file, pathurl, () => {


                var obj: any = {}
                obj.name = this.getNameByPath(prefabStaticMesh.url)
                obj.url = prefabStaticMesh.url;
                var sceneScale: number = this.sceneRes.scale
                obj.pos = new Vector3D(buildinfo.x * sceneScale, buildinfo.y * sceneScale, buildinfo.z * sceneScale);
                obj.scale = new Vector3D(buildinfo.scaleX, buildinfo.scaleY, buildinfo.scaleZ);
                obj.rotation = new Vector3D(buildinfo.rotationX, buildinfo.rotationY, buildinfo.rotationZ);
                ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INPUT_PREFAB_TO_SCENE), obj)

            })
        }

    
   
    }
}
