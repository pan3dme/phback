module pack {
    import Scene_data = Pan3d.Scene_data
    import Engine = Pan3d.Engine
    import MathClass = Pan3d.MathClass
    import ModuleEventManager = Pan3d.ModuleEventManager




    export class FileVo {
        public name: string
        public path: string
        public suffix: string
        public isFolder: boolean
        public select: boolean
        public static PREFAB: string = "prefab";
        public static MATERIAL: string = "material";
        public static JPG: string = "jpg";
        public static PNG: string = "png";
        public static TXT: string = "txt";
        public static OBJS: string = "objs";
        public static MAP: string = "map";
        public static LYF: string = "lyf";
        public static ZZW: string = "zzw";
        public static SKILL: string = "skill";
        public static MD5ANIM: string = "md5anim";
        public static MD5MESH: string = "md5mesh";



        public meshStr(str: string): void {
            var $arr: Array<string> = str.split("/");
            this.name = $arr[$arr.length - 2]
            this.path = str;
            this.isFolder = true;
            //  console.log(this.name, this.path)
        }
        public static meshObj(value: any): FileVo {
            if (value.name.length - 1 != value.name.lastIndexOf("/")) {
                var vo: FileVo = new FileVo()
                var str: string = value.name
                var $arr: Array<string> = str.split("/");
                vo.name = $arr[$arr.length - 1]
                vo.path = str.replace("upfile/shadertree/", "");
                vo.suffix = vo.name.split(".")[1]
                return vo
            }
            return null
        }
    }

    export class FileOssModel {
        private static waitItem: Array<any>;
        public static ossWrapper: OSS.Wrapper;
        private static oneByOne(): void {
            if (this.waitItem.length > 0) {
                var $dir: string = this.waitItem[0].a;//目录

                var kFun: Function = this.waitItem[0].b; //返回
                var nextMarker = "";
                this.ossWrapper.list({
                    'delimiter': '/',
                    'prefix': $dir,
                    'max-keys': 100,
                    'marker': nextMarker,
                }).then((result) => {
                    this.waitItem.shift();
                    this.oneByOne();
                    kFun(result);
                }).catch((err) => {
                    console.log(err)
                    console.log("网络异常。需要注意");
                    this.waitItem.shift();
                    this.oneByOne();
                    kFun(null);
                });
            }
        }
        private static saveDicfileGropFun($dir, fileArr: Array<FileVo>, bfun: Function): void {

            //  console.log("保存文件夹目录", $dir, fileArr)

            var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray()
            $byte.writeUTF(JSON.stringify(fileArr))
            var $file: File = new File([$byte.buffer], this.indexFileName);
            var pathurl: string = $dir
            console.log(pathurl + $file.name);
            pack.FileOssModel.upOssFile($file, pathurl + $file.name, () => {
                console.log("文件夹配置",pathurl + $file.name);

                bfun();
            })

        }
        private static indexFileName: string = "index.hidegroup" //配置文件名读取这个文件标记为文件夹下的所以

        private static getDicByUrl($dir: string, bfun: Function, errBfun: Function): void {
            var filePath: string = Scene_data.ossRoot + $dir + this.indexFileName
            Pan3d.LoadManager.getInstance().load(filePath, Pan3d.LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                var $dicByte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray($byte);
                var $tempItem: Array<any> = JSON.parse($dicByte.readUTF());
                var fileArr: Array<FileVo> = []
                for (var i: number = 0; i < $tempItem.length; i++) {
                    var fileVo: FileVo = new FileVo();
                    fileVo.name = $tempItem[i].name
                    fileVo.path = $tempItem[i].path
                    if ($tempItem[i].isFolder) {
                        fileVo.isFolder = $tempItem[i].isFolder
                    }
                    if ($tempItem[i].suffix) {
                        fileVo.suffix = $tempItem[i].suffix
                    }
                    fileArr.push(fileVo)

                }
                bfun(fileArr);
            //    console.log("url获取", filePath)
            }, {
                    errorFun: () => {
                        errBfun();
                    }
                });

        }
        //获得文件夹目录
        private static getPerentPath(value: string): string {
            var idex: number = value.lastIndexOf("/")
            if (idex != -1) {
                value = value.substr(0, idex + 1)
            } else {
                value = ""
            }
            return value
        }
        //通过方法可以重新生存文件目录
        public static getDisByOss($dir: string, bfun: Function): void {

            //特别处理是不椒"/"结尾的文件目录
            $dir = this.getPerentPath($dir)

            this.getTempOss($dir, (value) => {
                var fileArr: Array<FileVo> = []
                for (var i: number = 0; value.prefixes && i < value.prefixes.length; i++) {
                    var fileVo: FileVo = new FileVo();
                    fileVo.meshStr(value.prefixes[i])
                    if (fileVo.name!="hide_min_icon") {//不是隐藏文件夹
                        fileArr.push(fileVo)
                    }
                  
                }
                for (var j: number = 0; value.objects && j < value.objects.length; j++) {
                    var fileVo: FileVo = FileVo.meshObj(value.objects[j])
                    if (fileVo && fileVo.suffix != this.indexFileName.split(".")[1]) { //不是文件夹配置文件
                        fileArr.push(fileVo);
                    }
                }
                console.log("oss获取文件目录", $dir)
                this.saveDicfileGropFun($dir, fileArr, () => {
                    bfun(fileArr);
                })
         
               
            })
        }
        public static isMustUseOssGetDic: boolean = false //是否必须使用OSS方案 //当文件内有添加删除文件，需要更新配置文件目录
        public static getFolderArr($dir: string, bfun: Function): void {
       

            if (this.isMustUseOssGetDic) { 
                this.getDisByOss($dir, bfun)
            } else {
                this.getDicByUrl($dir, bfun, () => {
                    this.getDisByOss($dir, bfun)
                })
            }
        }
        private static getTempOss($dir: string, bfun: Function): void {
            if (!this.waitItem) {
                this.waitItem = [];
            }
            this.waitItem.push({ a: $dir, b: bfun });
            if (this.waitItem.length == 1) {
                if (!this.ossWrapper) {
                    this.makeOssWrapper(() => {
                        this.oneByOne();
                    })
                } else {
                    this.oneByOne();

                }
            }
        }
        private static waitOssWrapper: Array<Function>

        private static getWarpperByUrl(bfun: Function): void {
            this.WEB_SEVER_EVENT_AND_BACK("get_STS", "id=" + 99, (res: any) => {
                if (res && res.data && res.data.info) {
                    this.ossWrapper = new OSS.Wrapper({
                        accessKeyId: res.data.info.AccessKeyId,
                        accessKeySecret: res.data.info.AccessKeySecret,
                        stsToken: res.data.info.SecurityToken,
                        endpoint: "https://oss-cn-shanghai.aliyuncs.com",
                        bucket: "webpan"
                    });
                    bfun();
                } else {
                    console.log("链接错误，重试");
                    Pan3d.TimeUtil.addTimeOut(2000, () => {
                        this.getWarpperByUrl(bfun)
                    })
                }
            })
        }
        public static makeOssWrapper(bfun: Function): void {
      
            if (!this.waitOssWrapper) {
                this.waitOssWrapper = [bfun];
                this.getWarpperByUrl(() => {
                    while (this.waitOssWrapper.length) {
                        console.log("waitOssWrapper", this.waitOssWrapper)
                        this.waitOssWrapper.pop()();
                    }
                })
                
            } else {
                this.waitOssWrapper.push(bfun)
            }
    
        }
        public static makeOssWrapperCopy(bfun: Function): void {
        
            if (!this.waitOssWrapper) {
                this.waitOssWrapper = [bfun];
                this.WEB_SEVER_EVENT_AND_BACK("get_STS", "id=" + 99, (res: any) => {
                    if (res && res.data && res.data.info) {
                        this.ossWrapper = new OSS.Wrapper({
                            accessKeyId: res.data.info.AccessKeyId,
                            accessKeySecret: res.data.info.AccessKeySecret,
                            stsToken: res.data.info.SecurityToken,
                            endpoint: "https://oss-cn-shanghai.aliyuncs.com",
                            bucket: "webpan"
                        });
                        while (this.waitOssWrapper.length) {
                            console.log("waitOssWrapper", this.waitOssWrapper)
                            this.waitOssWrapper.pop()();
                        }
                    } else {
                        console.log("链接错误，重试");
                    
                    }
                })
            } else {
                this.waitOssWrapper.push(bfun)
            }

        }

        public static deleFile($filename: string, $bfun: Function = null): void {
            if (!FileOssModel.ossWrapper) {
                this.makeOssWrapper(() => {
                    FileOssModel.ossWrapper.delete($filename).then(function (result) {
                       // console.log(result);
                        $bfun && $bfun()
                    }).catch(function (err) {
                        console.log(err);
                    });

                })
            } else {

                FileOssModel.ossWrapper.delete($filename).then(function (result) {
                  //  console.log(result);
                    $bfun && $bfun()
                }).catch(function (err) {
                    console.log(err);
                });

            }



        }

        private static uploadFile($file: File, $filename: string, $bfun: Function = null): void {
            if (!FileOssModel.ossWrapper) {
                this.makeOssWrapper(() => {
                    FileOssModel.ossWrapper.multipartUpload($filename, $file).then(function (result) {
                     //   console.log(result);
                        $bfun && $bfun()
                    }).catch(function (err) {
                        console.log(err);
                    });
                });
            } else {
                FileOssModel.ossWrapper.multipartUpload($filename, $file).then(function (result) {
                  //  console.log(result);
                    $bfun && $bfun()
                }).catch(function (err) {
                    console.log(err);
                });
            }
            console.log("上传文件==>", $filename)

        }

        public static copyFile(toUrl: string, srcoueUrl: string, $bfun: Function = null): void {

     
            srcoueUrl = encodeURI(srcoueUrl)
            toUrl = decodeURI(toUrl)
            
            if (!FileOssModel.ossWrapper) {
                this.makeOssWrapper(() => {
                    FileOssModel.ossWrapper.copy(toUrl, srcoueUrl).then(function (result) {
                         console.log(result);
                        $bfun && $bfun()
                    }).catch(function (err) {
                        console.log(err);
                    });

                })
            } else {
                console.log(FileOssModel.ossWrapper.copy)
              
                FileOssModel.ossWrapper.copy(toUrl, srcoueUrl).then(function (result) {
                      console.log(result);
                    $bfun && $bfun()
                }).catch(function (err) {
                    console.log(err);
                });
           

            }



        }




        public static WEB_SEVER_EVENT_AND_BACK(webname: string, postStr: string, $bfun: Function = null): void {
            webname = webname.replace(/\s+/g, "");
            var $obj: any = new Object();
            $obj.webname = webname;
            $obj.postStr = postStr.replace(/\s+/g, "");
            $obj.fun = $bfun;
            this.isPostWeboffwx(webname, postStr, $bfun)
        }



        public static webseverurl: string = "http://api.h5key.com/api/";
        //网页模式的WEB请求
        private static isPostWeboffwx(webname: string, postStr: string, $bfun: Function = null) {
            var ajax: XMLHttpRequest = new XMLHttpRequest();
            var url: string = this.webseverurl + webname;

            // $bfun = null;

            let timestamp: string = String(Pan3d.TimeUtil.getTimer());
            let keystr: string = "ABC";
            let self_sign: string = "ABC";

            ajax.open("post", url, true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.setRequestHeader("timestamp", timestamp)
            ajax.setRequestHeader("sign", self_sign)
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200) {
                        $bfun ? $bfun({ data: JSON.parse(ajax.responseText) }) : null
                    }
                    else {
                        console.log("HTTP请求错误！错误码：" + ajax.status);
                        $bfun ? $bfun(null) : null
                    }
                }

            }
            ajax.send(postStr);
        }


        private static waitItemUpFile: Array<any> = []
        public static version: number=1
        public static upOssFile(file: File, $fileUrl: string, $bfun: Function = null): void {
 
            this.waitItemUpFile.push({ a: file, b: $fileUrl, c: $bfun })
            if (this.waitItemUpFile.length == 1) {
                if (!FileOssModel.ossWrapper) {
                    FileOssModel.makeOssWrapper(() => {
                        this.oneByOneUpFile();
                    })
                } else {
                    this.oneByOneUpFile();
                }

            }
        }
        private static oneByOneUpFile(): void {
            if (this.waitItemUpFile.length > 0) {
                FileOssModel.uploadFile(this.waitItemUpFile[0].a, this.waitItemUpFile[0].b, () => {
                   // console.log(this.waitItemUpFile[0])
                    var kFun: Function = this.waitItemUpFile[0].c;
                    this.waitItemUpFile.shift();
                    kFun && kFun()
                    this.oneByOneUpFile()
                })
            }

        }


 
        public static upTempFileToOss(bfun: Function): void {
            var htmlTxt: HTMLInputElement = <HTMLInputElement>document.createElement('input');
            htmlTxt.setAttribute('id', '_ef');
            htmlTxt.setAttribute('type', 'file');
            htmlTxt.setAttribute("style", 'visibility:hidden');
            htmlTxt.click();
            htmlTxt.value;
            htmlTxt.addEventListener("change", (evt: any) => { changeFile(evt) });

            function changeFile(evt: any): void {
                for (var i: number = 0; htmlTxt&& i < htmlTxt.files.length && i < 1; i++) {
                    var simpleFile: File = <File>htmlTxt.files[i];
                    htmlTxt = null;
                    bfun(simpleFile)
                }
            }
   
        }


    }

}