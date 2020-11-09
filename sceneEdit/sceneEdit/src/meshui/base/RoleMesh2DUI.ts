module prop {
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    import SkinMesh = Pan3d.SkinMesh
    import Material = Pan3d.Material
    import MeshData = Pan3d.MeshData
    import LoadManager = Pan3d.LoadManager
    import InteractiveEvent = Pan3d.InteractiveEvent
    import ModuleEventManager = Pan3d.ModuleEventManager

    export class RoleMesh2DUI extends BaseReflComponent {

        protected textLabelUI: TextLabelUI;
        protected comboBoxUi: ComboBoxUi;
        protected deleIcon: BaseMeshUi

        protected md5meshUrlText: TextLabelUI;
        protected md5meshPicUi: TexturePicUi
        protected md5searchIcon: BaseMeshUi
 

        protected textureUrlText: TextLabelUI;
        protected texturePicUi: TexturePicUi;
        protected texturesearchIcon: BaseMeshUi;

        private _skinMesh: SkinMesh
        private textureTree: materialui.MaterialTree

        protected initView(): void {
            super.initView();


            this.textLabelUI = new TextLabelUI();
            this.comboBoxUi = new ComboBoxUi();
            this.deleIcon = new BaseMeshUi(16, 16);


            this.md5meshUrlText = new TextLabelUI(200, 16)
            this.md5meshPicUi = new TexturePicUi()
            this.md5meshPicUi.suffix = "md5mesh";
            this.md5meshPicUi.addEventListener(ReflectionEvet.CHANGE_DATA, this.drawInMeshUrl, this)

            this.md5searchIcon = new BaseMeshUi(20, 20);


            this.textureUrlText = new TextLabelUI(200, 16)
            this.texturePicUi = new TexturePicUi()
            this.texturePicUi.suffix = "material";
            this.texturePicUi.addEventListener(ReflectionEvet.CHANGE_DATA, this.drawInTextureUrl, this)
            this.texturesearchIcon = new BaseMeshUi(20, 20);

            this.propPanle.addBaseMeshUi(this.textLabelUI)
            this.propPanle.addBaseMeshUi(this.comboBoxUi)
            this.propPanle.addBaseMeshUi(this.deleIcon);
 

            this.propPanle.addBaseMeshUi(this.md5meshUrlText);
            this.propPanle.addBaseMeshUi(this.md5meshPicUi);
            this.propPanle.addBaseMeshUi(this.md5searchIcon);
    


            this.propPanle.addBaseMeshUi(this.textureUrlText);
            this.propPanle.addBaseMeshUi(this.texturePicUi);
            this.propPanle.addBaseMeshUi(this.texturesearchIcon);


            this.drawUrlImgToUi(this.md5searchIcon.ui, "icon/search.png")
            this.drawUrlImgToUi(this.texturesearchIcon.ui, "icon/search.png")
            this.drawUrlImgToUi(this.deleIcon.ui, "icon/deleticon.png")
 
            this.comboBoxUi.addEventListener(InteractiveEvent.Down, this.comboBoxUiDown, this)
            this.deleIcon.ui.addEventListener(InteractiveEvent.Down, this.deleIconDown, this)

            this.height = 200;
 
        }
        protected deleIconDown($evt: InteractiveEvent): void {
            this._skinMesh.meshAry.splice(this.selectMeshId, 1)
            this.changFun();
  
        }
        
        private drawInTextureUrl(): void {
    
            var tempObj: any = this._skinMesh.meshAry[this.selectMeshId]
            if (tempObj) {
                console.log(tempObj);
                tempObj.materialUrl = this.texturePicUi.url
                this.refreshViewValue()

                this.changFun();
            }
        }
     
        private drawInMeshUrl(): void {
      
            var meshUrl: string = this.md5meshPicUi.url
            LoadManager.getInstance().load(Scene_data.fileRoot + meshUrl, LoadManager.XML_TYPE, ($meshstr: any) => {
                var $md5Srite: left.LocalMd5MoveSprite = new left.LocalMd5MoveSprite()
                $md5Srite.addLocalMeshByStr($meshstr);
                var rolesprite: left.MaterialRoleSprite = new left.MaterialRoleSprite();
                rolesprite.changeRoleWeb($md5Srite);

                var tempMesh: any = rolesprite.skinMesh.meshAry[0];
                tempMesh.materialUrl = "base.material" //设计默认

                tempMesh.md5meshurl = meshUrl;

                pack.PackMaterialManager.getInstance().getMaterialByUrl(tempMesh.materialUrl, ($materialTree: materialui.MaterialTree) => {
                    $materialTree.shader = $materialTree.roleShader;
                   // $materialTree.program = $materialTree.shader.program;
                    tempMesh.material = $materialTree;
                    this._skinMesh.meshAry.push(tempMesh);
                    this.refreshViewValue();
                })

                
              
           
                
            });
        }
        public destory(): void {
            this.textLabelUI.destory()
            this.comboBoxUi.destory()
            this.deleIcon.destory()

            this.md5meshUrlText.destory()
            this.md5meshPicUi.destory()
            this.md5searchIcon.destory()
 

            this.textureUrlText.destory()
            this.texturePicUi.destory()
            this.texturesearchIcon.destory()

            if (this._materialTreeMc) {
                this._materialTreeMc.destory();
            }

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

            this.md5meshUrlText.x = this._x + 60;
            this.md5meshPicUi.x = this._x + 60
            this.md5searchIcon.x = this._x + 150;


            this.texturePicUi.x = this._x + 60;
            this.textureUrlText.x = this._x + 60
            this.texturesearchIcon.x = this._x + 150;
     

        }
        
 
 
        public get y(): number {
            return this._y
        }
        public set y(value: number) {
            this._y = value;

            this.textLabelUI.y = this._y + 4
            this.comboBoxUi.y = this._y + 6
            this.deleIcon.y = this._y + 6;

            this.md5meshUrlText.y = this._y  +100
            this.md5meshPicUi.y = this._y  +35
            this.md5searchIcon.y = this._y + 40 

            this.texturePicUi.y = this._y + 35 + 110
            this.textureUrlText.y = this._y + 105 + 110
            this.texturesearchIcon.y = this._y + 40 + 110

        }
      
        protected comboBoxUiDown($evt: InteractiveEvent): void {
            var $rightMenuEvet: menutwo.MenuTwoEvent = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_COMBOX_MENU);
            $rightMenuEvet.posv2d = new Vector2D(this.comboBoxUi.ui.absoluteX, this.comboBoxUi.ui.absoluteY + 20);

            var arrItem: Array<any>=[]

            for (var i: number = 0; i < this._skinMesh.meshAry.length; i++) {
                arrItem.push({ name: "mesh_" + i, type: i })
            }

            $rightMenuEvet.comboxData = arrItem
            $rightMenuEvet.comboxFun = (value: number) => { this.selectFun(value) }
            ModuleEventManager.dispatchEvent($rightMenuEvet);
        }
        protected selectFun(value: number): void {
            this.selectMeshId = value
            this.refreshViewValue();
        }

        public set data(value: any) {
            this._data = value;
 

        }
        public get data(): any {
            return this._data
        }
        private selectMeshId: number=0
        public refreshViewValue(): void {
            if (this.FunKey) {

                this._skinMesh = this.target[this.FunKey]
                this.textLabelUI.label="部分"
                this.comboBoxUi.text = "mesh_" + this.selectMeshId

                this.md5meshPicUi.url = "icon/txt_64x.png"
        
 
                var tempObj: any = this._skinMesh.meshAry[this.selectMeshId]
                if (tempObj) {
                    this.md5meshUrlText.label = tempObj.md5meshurl;
                    this.texturePicUi.url = tempObj.materialUrl
                    this.textureUrlText.label = tempObj.materialUrl
                    this.textureTree = tempObj.material
                    this.showMaterialParamUi()
                }
 
            }
        }


        private _materialTreeMc: MaterialParamUi
        public paramChange(item: Array<any>): void {
 
            var tempObj: any = this._skinMesh.meshAry[this.selectMeshId]
            if (tempObj) {
                tempObj.paramInfo = item
            }
            this.changFun(item)

        }
        private showMaterialParamUi(): void {
            if (!this._materialTreeMc) {
                this._materialTreeMc = new MaterialParamUi(PropModel.getInstance().propPanle)
                this._materialTreeMc.changFun = (value: Array<any>) => { this.paramChange(value) }
            }
  
            this._materialTreeMc.setData(this.makeTempInfo(this.textureTree))
            this._materialTreeMc.y = this._y + 240;
            this.height = 240 + this._materialTreeMc.height;

        }
        public getParamItem(value: string): any {
            var tempObj: any = this._skinMesh.meshAry[this.selectMeshId]
            if (tempObj) {
                for (var i: number = 0; tempObj.paramInfo && i < tempObj.paramInfo.length; i++) {
                    if (tempObj.paramInfo[i].paramName == value) {
                        return tempObj.paramInfo[i].data
                    }
                }
            }
            return null;
        }
        private makeTempInfo($materialTree: materialui.MaterialTree): Array<any> {

            var item: Array<any> = []
            for (var i: number = 0; i < $materialTree.data.length; i++) {
                if ($materialTree.data[i].data.isDynamic) {
                    var temp: any
                    if ($materialTree.data[i].type == materialui.NodeTree.TEX) {
                        temp = {};
                        temp.data = $materialTree.data[i].data.url
                    }
                    if ($materialTree.data[i].type == materialui.NodeTree.VEC3) {
                        temp = {};
                        temp.data = $materialTree.data[i].data.constValue
                    }
                    if ($materialTree.data[i].type == materialui.NodeTree.FLOAT) {
                        temp = {};
                        temp.data = $materialTree.data[i].data.constValue
                    }
                    if (temp) {
                        temp.type = $materialTree.data[i].type;
                        temp.paramName = $materialTree.data[i].data.paramName;
                        var tempValue: any = this.getParamItem(temp.paramName);//如果有对象替换纹理中的
                        if (tempValue) {
                            temp.data = tempValue;
                        }

                        item.push(temp)
                    }
                }
            }

            return item
        }
    
       

    }

}