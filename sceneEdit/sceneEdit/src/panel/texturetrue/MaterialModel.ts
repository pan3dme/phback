module materialui {
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import Scene_data = Pan3d.Scene_data;
    import LoadManager = Pan3d.LoadManager
    import InteractiveEvent = Pan3d.InteractiveEvent
    import Panel = win.Panel;
    import TextureManager = Pan3d.TextureManager
    import LayerManager = win.LayerManager
    import MenuListData = menutwo.MenuListData

    export class MaterialModel {
        private static _instance: MaterialModel;
        public static getInstance(): MaterialModel {
            if (!this._instance) {
                this._instance = new MaterialModel();
            }
            return this._instance;
        }
        public makePanle(): void {

            MaterialCtrl.getInstance().bgwinPanel = new Panel() //背景线
            MaterialCtrl.getInstance().nodeUiPanel = new Panel() //模块
            MaterialCtrl.getInstance().linePanel = new Panel();//线

            MaterialCtrl.getInstance().lineContainer = new MaterialLineContainer() //创建线层
            MaterialCtrl.getInstance().linePanel.addUIContainer(MaterialCtrl.getInstance().lineContainer);

 
            MaterialCtrl.getInstance().bgwinPanel.addUIContainer(new MaterialCavasPanel());

        
        }

        public selectMaterialUrl(url: string): void {
        
            pack.PackMaterialManager.getInstance().getMaterialByUrl( url, ($materialTree: materialui.MaterialTree) => {
 
                ModuleEventManager.dispatchEvent(new MaterialEvent(MaterialEvent.INUPT_NEW_MATERIAL_FILE) ,$materialTree);
            
            })
        }
        private getMenuXml(): Array<MenuListData> {

            var item: Array<MenuListData>= new Array();
            item.push(this.getMathListData());
            item.push(this.getV2CListData());
            item.push(this.getTextureListData());
            item.push(this.getOtherListData());
            return item;

        }
        private getMathListData(): MenuListData {
            var $vo: MenuListData = new MenuListData("Math", "1")
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("ADD", "11"));
            $vo.subMenu.push(new MenuListData("SUB", "12"));
            $vo.subMenu.push(new MenuListData("MUL", "13"));
            $vo.subMenu.push(new MenuListData("DIV", "14"));
            $vo.subMenu.push(new MenuListData("SIN", "15"));
            $vo.subMenu.push(new MenuListData("COS", "16"));
            //$vo.subMenu.push(new MenuListData("LERP", "17"));
            //$vo.subMenu.push(new MenuListData("MIN", "18"));
            return $vo;

        }
        private getV2CListData(): MenuListData {
            var $vo: MenuListData = new MenuListData("常数", "2")
            $vo.subMenu = new Array;
            //     $vo.subMenu.push(new MenuListData("vec4", "21"));
            $vo.subMenu.push(new MenuListData("vec3", "22"));
            $vo.subMenu.push(new MenuListData("vec2", "23"));
            $vo.subMenu.push(new MenuListData("float", "24"));
            $vo.subMenu.push(new MenuListData("Time", "25"));
            $vo.subMenu.push(new MenuListData("Normal", "26"));
            return $vo;
        }
        private getTextureListData(): MenuListData {
            var $vo: MenuListData = new MenuListData("纹理", "3")
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("纹理贴图", "31"));
            $vo.subMenu.push(new MenuListData("纹理坐标", "32"));
            $vo.subMenu.push(new MenuListData("纹理滚动", "33"));
            $vo.subMenu.push(new MenuListData("Cube纹理", "34"));
            $vo.subMenu.push(new MenuListData("3D贴图", "35"));
            $vo.subMenu.push(new MenuListData("LightUv", "36"));
  

            return $vo;
        }
        private getOtherListData(): MenuListData {
            var $vo: MenuListData = new MenuListData("其它", "4")
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("菲捏尔", "41"));
            $vo.subMenu.push(new MenuListData("導入材質", "42"));
            $vo.subMenu.push(new MenuListData("函数", "43"));
            $vo.subMenu.push(new MenuListData("文件列表", "44"));
            return $vo;
        }


        public mekeMaterialRightMenu($evt: MouseEvent): void {
            var $rightMenuEvet: menutwo.MenuTwoEvent = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp: any = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY)
            temp.menuXmlItem = this.getMenuXml();
            temp.info = {};
            temp.info.bfun = (value: any, evt: InteractiveEvent) => { this.menuBfun(value, evt) }
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        }
        private menuBfun(value: any, evt: InteractiveEvent): void {

            console.log("材质返回菜单", value)

            switch (value.key) {
                case "1":
                    break
                case "2":
                    break
                case "3":
                    break
                case "4":
                    break
                case "11":
                    this.onTempNode(new MathAddNodeUI(), evt)
                    break;
                case "12":
                    this.onTempNode(new MathSubNodeUI(), evt)
                    break;
                case "13":
                    this.onTempNode(new MathMulNodeUI(), evt)
                    break;
                case "14":
                    this.onTempNode(new MathDivNodeUI(), evt)
                    break;
                case "15":
                    this.onTempNode(new MathSinNodeUI(), evt)
                    break;
                case "16":
                    this.onTempNode(new MathCosNodeUI(), evt)
                    break;
                case "22":
                    this.onTempNode(new ConstVec3NodeUI(), evt)
                    break;
                case "23":
                    this.onTempNode(new ConstVec2NodeUI(), evt)
                    break;
                case "24":
                    this.onTempNode(new ConstFloatNodeUI(), evt)
                    break;
                case "25":
                    this.onTempNode(new TimeNodeUI(), evt)
                    break;
                case "26":
                    this.onTempNode(new NormalNodeUI(), evt)
                    break;
                case "31":
                    var textui: TextureSampleNodeUI = new TextureSampleNodeUI()
                    this.onTempNode(textui, evt)
                    textui.creatBase("assets/white.jpg");
                    break;


                case "32":
                    this.onTempNode(new TexCoordNodeUI(), evt)
                    break;
                case "36":
                    this.onTempNode(new TexLightUvNodeUI(), evt)
                    break;
                case "33":
                    this.onTempNode(new PannerNodeUI(), evt)
                    break;
                case "34":
                    var textCubeui: TextureCubeNodeUI = new TextureCubeNodeUI()
                    this.onTempNode(textCubeui, evt)
                    textCubeui.creatBase("assets/white.jpg");
                    break;
                case "35":
                    var text3dui: Texture3DNodeUI = new Texture3DNodeUI()
                    this.onTempNode(text3dui, evt)
                    text3dui.creatBase("assets/white.jpg");
                    break;
                case "41":
                    this.onTempNode(new FresnelNodeUI(), evt)
                    break;
                case "42":
                    //this.selectInputDae(evt)
                    // filemodel.InputMaterialModel.getInstance().inputFile(evt)
                    break;
                case "43":
                    this.onTempNode(new MathFunNodeUI(), evt)
                    break;
                case "44":



                    Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.SHOW_FOLDER_PANEL));
                    break;
                default:
                    break;
            }

        }
        private onTempNode($ui: BaseMaterialNodeUI, evt: InteractiveEvent): void {
            $ui.left = evt.x / MtlUiData.Scale - 150;
            $ui.top = evt.y / MtlUiData.Scale - 30;
            $ui.uiScale = MtlUiData.Scale;
            MaterialCtrl.getInstance().addNodeUI($ui)

   

            win.LayerManager.getInstance().resize()
        }

        private dataURLtoFile(dataurl: string, filename: string): File {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }
        public MakeTempWebMaterialTree($temp: MaterialTree, $info: any ) {
            var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray();
            $byte.writeUTF(JSON.stringify({ data: $temp.data, info: $info }))
            pack.PackMaterialManager.getInstance().getMaterialByUrl($temp.url, (value: materialui.MaterialTree) => {
               pack.PackMaterialManager.getInstance().makeMaterialShaderByByte($byte, $temp.url, value)
            })


        }

        public upMaterialTreeToWeb($temp: MaterialTree, $info: any, $url: string) {
 
                for (var i: number = 0; $temp.data && i < $temp.data.length; i++) {
                    var $vo: any = $temp.data[i];
                    if ($vo.type == materialui.NodeTree.TEX || $vo.type == materialui.NodeTree.TEX3D || $vo.type == materialui.NodeTree.TEXCUBE) {
                        var $img: any = TextureManager.getInstance().getImgResByurl(Scene_data.fileRoot + $vo.data.url)
                        if ($img) { //新加的图
                            console.log("图片列表",$img)
                            /*
                            var $upfile: File = this.dataURLtoFile($img.src, $vo.data.url);
                            var $newUrl: string = "ccc.jpg"
                            filemodel.FolderModel.upOssFile($upfile, "shadertree/" + $newUrl, () => {
                                console.log("文件上传成功");
                            })
                            $vo.data.url = $newUrl;
                            */
                        } else {

                        }
                    }
                }
            var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray();
            $byte.writeUTF(JSON.stringify({ data: $temp.data, info: $info }))
            var $file: File = new File([$byte.buffer], "ossfile.txt");
 
            var pathUrl: string = Pan3d.Scene_data.fileRoot + $url
            var pathurl: string = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
            console.log(pathUrl)
            pack.FileOssModel.upOssFile($file, pathurl, () => {
                console.log("材质上传成功");
                pack.PackMaterialManager.getInstance().replaceMaterialByUrl($url);
            })
  
        }
      

        public selectFileById(value: number): void {

           
            var $texturl: string = "texturelist/" + value + ".txt"
            LoadManager.getInstance().load(Scene_data.fileRoot + $texturl, LoadManager.BYTE_TYPE,
                ($dtstr: ArrayBuffer) => {
                    var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray($dtstr);
                    $byte.position = 0
                    var $temp: any = JSON.parse($byte.readUTF());
                    var $tempMaterial: MaterialTree = new MaterialTree
                    $tempMaterial = new MaterialTree;
                    $tempMaterial.url = $texturl
                    $tempMaterial.setData({ data: $temp.data });
           
                    ModuleEventManager.dispatchEvent(new MaterialEvent(MaterialEvent.INUPT_NEW_MATERIAL_FILE), $tempMaterial);

                /*
                    LoadManager.getInstance().load(Scene_data.fileRoot + "texturelist/config/" + this.fileid + ".txt", LoadManager.XML_TYPE,
                        ($configStr: string) => {
                            var $config: any = JSON.parse($configStr);
                            if ($config.showType == 0) {
                                LoadManager.getInstance().load(Scene_data.fileRoot + "texturelist/model_" + value + "_objs.txt", LoadManager.XML_TYPE,
                                    ($modelxml: string) => {
                                        left.ModelShowModel.getInstance().readTxtToModelBy($modelxml)
                                        ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
                                    });
                            }
                            if ($config.showType == 1) {
                                filemodel.RoleChangeModel.getInstance().changeRoleModel(this.fileid)
                                Scene_data.cam3D.distance = 100
                                left.SceneRenderToTextrue.getInstance().viweLHnumber = 300
                            }
                        });
                 
                    */
 

                });

        }
    }

}