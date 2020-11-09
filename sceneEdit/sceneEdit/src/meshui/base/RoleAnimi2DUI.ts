module prop {
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    import SkinMesh = Pan3d.SkinMesh
    import Material = Pan3d.Material
    import Matrix3D = Pan3d.Matrix3D
    import Quaternion = Pan3d.Quaternion
    import AnimData = Pan3d.AnimData
    import LoadManager = Pan3d.LoadManager
    import DualQuatFloat32Array = Pan3d.DualQuatFloat32Array
    import InteractiveEvent = Pan3d.InteractiveEvent
    import ModuleEventManager = Pan3d.ModuleEventManager

    import Md5animAnalysis = md5list.Md5animAnalysis

    export class RoleAnimi2DUI extends BaseReflComponent {

        protected textLabelUI: TextLabelUI;
        protected comboBoxUi: ComboBoxUi;
        protected deleIcon: BaseMeshUi


        protected md5animUrlText: TextLabelUI;
        protected md5animPicUi: TexturePicUi
        protected md5searchIcon: BaseMeshUi





        private _animDic: Object
 

        protected initView(): void {
            super.initView();


            this.textLabelUI = new TextLabelUI();
            this.comboBoxUi = new ComboBoxUi(80,20);
            this.deleIcon = new BaseMeshUi(16, 16);


            this.md5animUrlText = new TextLabelUI(100, 16)
            this.md5animPicUi = new TexturePicUi()
            this.md5animPicUi.suffix = "md5anim";
            this.md5animPicUi.addEventListener(ReflectionEvet.CHANGE_DATA, this.drawInAnimUrl, this)
         
            this.md5searchIcon = new BaseMeshUi(20, 20);
 

            this.propPanle.addBaseMeshUi(this.textLabelUI)
            this.propPanle.addBaseMeshUi(this.comboBoxUi)
            this.propPanle.addBaseMeshUi(this.deleIcon);


            this.propPanle.addBaseMeshUi(this.md5animUrlText);
            this.propPanle.addBaseMeshUi(this.md5animPicUi);
            this.propPanle.addBaseMeshUi(this.md5searchIcon);
 

            this.drawUrlImgToUi(this.md5searchIcon.ui, "icon/search.png")
            this.drawUrlImgToUi(this.deleIcon.ui, "icon/deleticon.png")
 

            this.comboBoxUi.addEventListener(InteractiveEvent.Down, this.comboBoxUiDown, this)

            this.deleIcon.ui.addEventListener(InteractiveEvent.Down, this.deleIconDown, this)
            this.md5searchIcon.ui.addEventListener(InteractiveEvent.Up, this.md5searchIconClik, this)

            this.height = 150;

        }
        protected md5searchIconClik(evt: InteractiveEvent): void {
            var vo: pack.RoleStaticMesh = this.target.data;
            console.log(vo.animPlayKey)
           // var pathurl: string = Pan3d_me.Scene_data.fileRoot + value;

          //  Pan3d_me.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), pathurl.replace(Pan3d_me.Scene_data.ossRoot, ""))
        }
       
        private drawInAnimUrl(): void {
            var meshUrl: string     //需要mesh信息才能编译动作
            var vo: pack.RoleStaticMesh = this.target.data
       
            if (vo && vo.skinMesh && vo.skinMesh.meshAry && vo.skinMesh.meshAry.length) {
                for (var i: number = 0; i < vo.skinMesh.meshAry.length; i++) {
                    meshUrl=vo.skinMesh.meshAry[i].md5meshurl
                }
            }
            if (meshUrl) {
                LoadManager.getInstance().load(Scene_data.fileRoot + meshUrl, LoadManager.XML_TYPE, ($meshstr: any) => {
                    var $md5Srite: left.LocalMd5MoveSprite = new left.LocalMd5MoveSprite()
                    $md5Srite.addLocalMeshByStr($meshstr)
                    LoadManager.getInstance().load(Scene_data.fileRoot + this.md5animPicUi.url, LoadManager.XML_TYPE, (anistr: any) => {
                        $md5Srite.addLocalAdimByStr(anistr)
                        var animfilename: string = AppData.getFileName(this.md5animPicUi.url)
                        animfilename = animfilename.split(".")[0]
                        var rolesprite: left.MaterialRoleSprite = new left.MaterialRoleSprite();
                        rolesprite.changeRoleWeb($md5Srite);

                        for (var keyStr in rolesprite.animDic) { //只会有一个关键动作。  stand .需要优化可读性
                            vo.animDic[animfilename] = rolesprite.animDic[keyStr]
                        }
                        vo.animPlayKey = animfilename;
                        this.refreshViewValue()
                        this.changFun()
                        console.log("准备获取新的动作数据", vo.animPlayKey);
                    });
                });

            } else {
                alert("需要先有md5mesh文件")
            }

            /*
            LoadManager.getInstance().load(Scene_data.fileRoot + meshUrl, LoadManager.XML_TYPE, ($meshstr: any) => {
                var $md5Srite: left.LocalMd5MoveSprite = new left.LocalMd5MoveSprite()
                $md5Srite.addLocalMeshByStr($meshstr)
                LoadManager.getInstance().load(Scene_data.fileRoot + this.md5animPicUi.url, LoadManager.XML_TYPE, (anistr: any) => {
                    $md5Srite.addLocalAdimByStr(anistr)
                    var animfilename: string = AppData.getFileName(this.md5animPicUi.url)
                    animfilename = animfilename.split(".")[0]
                    var rolesprite: left.MaterialRoleSprite = new left.MaterialRoleSprite();
                    rolesprite.changeRoleWeb($md5Srite);
             
                    for (var keyStr in rolesprite.animDic) { //只会有一个关键动作。  stand .需要优化可读性
                        vo.animDic[animfilename] = rolesprite.animDic[keyStr]
                    }
                    vo.animPlayKey = animfilename;
                    this.refreshViewValue()
                    this.changFun()
                    console.log("准备获取新的动作数据", vo.animPlayKey);
                });
            });
            */
        }
        protected deleIconDown($evt: InteractiveEvent): void {
            var vo: pack.RoleStaticMesh = this.target.data
            if (this.getObjKeyLen(vo.animDic) > 1) {
                if (vo.animDic[vo.animPlayKey]) {
                    var truthBeTold = window.confirm("是否确定要删除动作" + vo.animPlayKey);
                    if (truthBeTold) {
                        delete (vo.animDic[vo.animPlayKey])
                        vo.animPlayKey = null;
                        this.refreshViewValue();
                    }
                }
            } else {
                alert("最后一个动作不可以删除")
            }
            
        }
        private getObjKeyLen(obj: any): number {
            var len: number = 0
            for (var keyStr in obj) {
                len++
            }
            return len
        }
        public destory(): void {
            this.textLabelUI.destory()
            this.comboBoxUi.destory()
            this.deleIcon.destory()

            this.md5animUrlText.destory()
            this.md5animPicUi.destory()
            this.md5searchIcon.destory()
 
 
            super.destory()

        }
        public get x(): number {
            return this._x
        }
        public set x(value: number) {
            this._x = value;

            this.textLabelUI.x = this._x + 0;
            this.comboBoxUi.x = this._x + 75;
            this.deleIcon.x = this._x + 150;

            this.md5animUrlText.x = this._x + 60;
            this.md5animPicUi.x = this._x + 60
            this.md5searchIcon.x = this._x + 150;

 

        }



        public get y(): number {
            return this._y
        }
        public set y(value: number) {
            this._y = value;

            this.textLabelUI.y = this._y + 4
            this.comboBoxUi.y = this._y + 6
            this.deleIcon.y = this._y + 6;

            this.md5animUrlText.y = this._y + 100
            this.md5animPicUi.y = this._y + 35
            this.md5searchIcon.y = this._y + 40
 

        }

        protected comboBoxUiDown($evt: InteractiveEvent): void {
            var $rightMenuEvet: menutwo.MenuTwoEvent = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_COMBOX_MENU);
            $rightMenuEvet.posv2d = new Vector2D(this.comboBoxUi.ui.absoluteX, this.comboBoxUi.ui.absoluteY + 20);
            var arrItem: Array<any> = []
            for (var keyStr in this._animDic) {
                arrItem.push({ name: keyStr, type: arrItem.length })
            }

            $rightMenuEvet.comboxData = arrItem;
            $rightMenuEvet.comboxFun = (value: number) => { this.selectFun(value) }
            ModuleEventManager.dispatchEvent($rightMenuEvet);
        }
        protected selectFun(value: number): void {
            var skipId: number = 0
            var vo: pack.RoleStaticMesh = this.target.data
            for (var keyStr in this._animDic) {
                vo.animPlayKey = keyStr;
                if (skipId == value) {
                    break;
                }
                skipId++
            }
            this.changFun()
            //vo.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE))
            this.refreshViewValue();
        }
 
     //   private selectAnimKey: string
        public refreshViewValue(): void {
            if (this.FunKey) {
                this._animDic = this.target[this.FunKey]

                var vo: pack.RoleStaticMesh = this.target.data
                if (!vo.animPlayKey) {
                    for (var keyStr in this._animDic) {
                        vo.animPlayKey = keyStr
                        break;
                    }
                }
                if (this._animDic[vo.animPlayKey]) {
                    if (!this._animDic[vo.animPlayKey].url) {
                        this._animDic[vo.animPlayKey].url = vo.animPlayKey + ".md5anim"
                    }
                    this.textLabelUI.label = "部分";
                    this.comboBoxUi.text = vo.animPlayKey;
                    this.md5animPicUi.url = "icon/txt_64x.png";
                    this.md5animUrlText.label = this._animDic[vo.animPlayKey].url;
                } else {
                    console.log("没有动作对象")
                }


            }
        }

 
   



    }

}