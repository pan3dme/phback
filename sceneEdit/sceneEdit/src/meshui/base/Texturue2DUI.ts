module prop {
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    import InteractiveEvent = Pan3d.InteractiveEvent
    export class Texturue2DUI extends BaseReflComponent {

        protected textLabelUI: TextLabelUI;
        protected textureUrlText: TextLabelUI;
        protected texturePicUi: TexturePicUi
        protected searchIcon: BaseMeshUi
   

        protected initView(): void {
            this.textLabelUI = new TextLabelUI(64, 16)
            this.textureUrlText = new TextLabelUI(200,16)
            this.texturePicUi = new TexturePicUi()
            this.searchIcon = new BaseMeshUi(20, 20);

            this.propPanle.addBaseMeshUi(this.textLabelUI)
            this.propPanle.addBaseMeshUi(this.textureUrlText)
            this.propPanle.addBaseMeshUi(this.texturePicUi)
            this.propPanle.addBaseMeshUi(this.searchIcon)

            this.drawUrlImgToUi(this.searchIcon.ui, "icon/search.png")
     
            this.texturePicUi.addEventListener(ReflectionEvet.CHANGE_DATA, this.onChangePicurl, this)

            this.searchIcon.ui.addEventListener(InteractiveEvent.Up, this.searchClik, this)

            this.height = 100;
        }
        protected searchClik(evt: InteractiveEvent): void {
            this.searchFileByPath(this.target[this.FunKey])
        }
        protected searchFileByPath(value: string): void {
            var pathurl: string = Pan3d.Scene_data.fileRoot + value;
  
            Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), pathurl.replace(Pan3d.Scene_data.ossRoot, ""))
        }
        private getPerentPath(value: string): string {
            var idex: number = value.lastIndexOf("/")
            if (idex != -1) {
                value = value.substr(0, idex + 1)
            } else {
                value = ""
            }
            return value
        }

        private onChangePicurl($evt: ReflectionEvet): void {

            if ($evt.data instanceof File) {
                this.makeNewTextureByFile($evt.data);
            } else {
                if (this.texturePicUi.url.indexOf(".material") != -1) {
                    console.log("是材质")

                    pack.PackMaterialManager.getInstance().getMaterialByUrl(this.texturePicUi.url, ($materialTree: materialui.MaterialTree) => {
                        console.log($materialTree);
                        //是地址
                        this.target[this.FunKey] = $materialTree
                        this.changFun && this.changFun();
                        this.refreshViewValue()
                    })

                } else {
                    //是地址
                    this.target[this.FunKey] = this.texturePicUi.url
                    this.changFun && this.changFun();
                    this.refreshViewValue()
                }

            
           
          
            }

        }
        private makeNewTextureByFile(simpleFile: File): void {
            var reader = new FileReader();
            reader.readAsDataURL(simpleFile);
            reader.onload = () => {
                var img: any = makeImage()
                img.onload = () => {
                    TextureManager.getInstance().addImgRes(Scene_data.fileRoot + simpleFile.name, img);
                    this.target[this.FunKey] = simpleFile.name

                    this.refreshViewValue()
                }
                img.src = reader.result;
                
            }

         
        }
        public destory(): void {
            this.textLabelUI.destory()
            this.textureUrlText.destory()
            this.texturePicUi.destory()
            this.searchIcon.destory()
    
        }
        public set data(value: any) {
            this._data = value;

        }
        public get data(): any {
            return this._data
        }

        public refreshViewValue(): void {

            var $url: string = String(this.target[this.FunKey]);
            this.texturePicUi.url = $url

            var $arr: Array<string> = $url.split("/");
            this.textureUrlText.label = $arr[$arr.length - 1];
    
        }
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 0;
            this.texturePicUi.x = this._x + 60;
            this.textureUrlText.x = this._x + 60
            this.searchIcon.x = this._x + 150;

        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.textLabelUI.y = this._y
            this.texturePicUi.y = this._y 
            this.textureUrlText.y = this._y + 75
            this.searchIcon.y = this._y+10
        }
        public get y(): number {
            return this._y
        }
        public get label(): string {
            return this._label;
        }
        public set label(value: string) {
            this._label = value
            this.textLabelUI.label = value;
        }
        private _suffix: string
        public get suffix(): string {
            return this._suffix;
        }
        public set suffix(value: string) {
            this._suffix = value
            this.texturePicUi.suffix = value
 
        }
        
    }

 

}