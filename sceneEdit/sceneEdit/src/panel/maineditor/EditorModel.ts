module maineditor {
    export class EditorModel {
        public static _instance: EditorModel;
        public static getInstance(): EditorModel {
            if (!this._instance) {
                this._instance = new EditorModel();
            }
            return this._instance;
        }
        constructor() {
            this.selectItem=[]
            this.fileItem=[]
        }
        public loadHideMixImg($url: string, $fun: Function): void {
            var mixUrl: string = $url.replace(Pan3d.Scene_data.fileRoot, Pan3d.Scene_data.fileRoot + "hide_min_icon/");
 
            Pan3d.LoadManager.getInstance().load(mixUrl, Pan3d.LoadManager.IMG_TYPE,
                ($img: any) => {
                    $fun($img)
                }, {errorFun: () => { this.makeMixPicByUrl($url, mixUrl, $fun)}});
 
        }
        private convertCanvasToImage(canvas: any): any {
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            return image;
        }
        private makeMixPicByUrl(baseUrl: string, toUrl: string, bfun: Function): void {
 
            console.log("没有小图，需要重置", baseUrl)
            Pan3d.LoadManager.getInstance().load(baseUrl, Pan3d.LoadManager.IMG_TYPE,
                (downImg: any) => {
                    bfun(downImg)

                    var ctx = Pan3d.UIManager.getInstance().getContext2D(128, 128, false);

                    var rect: Pan3d.Rectangle = new Pan3d.Rectangle();
                    rect.width = Math.min(128, downImg.width);
                    rect.height = Math.min(128, downImg.height);
                    rect.x = (128 - rect.width) / 2
                    rect.y = (128 - rect.height) / 2


                    ctx.drawImage(downImg, rect.x, rect.y, rect.width, rect.height);                
                    var imageData = ctx.getImageData(0, 0, 128,128);
                    var tempCanvas: any = document.createElement("CANVAS");
                    tempCanvas.width = 128;
                    tempCanvas.height = 128;
                    tempCanvas.getContext('2d').putImageData(imageData, 0, 0);
                    var upImg: HTMLImageElement = this.convertCanvasToImage(tempCanvas);

                    var $upfile: File = this.dataURLtoFile(upImg.src,  "333.jpg");
                    toUrl =   toUrl.replace(Pan3d.Scene_data.ossRoot, "");
        
                    pack.FileOssModel.upOssFile($upfile, toUrl, (value: any) => {
                        console.log("更新完成",toUrl)
                    })

                  
                });
        }
        private dataURLtoFile(dataurl: string, filename: string): File {
            var arr = dataurl.split(',');
            var mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }
        public openFileByUrl(fileUrl: string): void {
      
            if (fileUrl.indexOf(".map") != -1) {
                Pan3d.  ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.LOAD_SCENE_MAP), fileUrl); //加载场景
                Pan3d. ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL));
            }
            if (fileUrl.indexOf(".material") != -1) {

                Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), fileUrl);
            }

        }
        public hierarchyListPanel: HierarchyListPanel
        public selectItem: Array<FolderMeshVo>

        public addSelctItem(value: Array<FolderMeshVo>, isShift: boolean): void {
            if (isShift) {
                for (var i: number = 0; i < value.length; i++) {
                    if (this.selectItem.indexOf(value[i]) == -1) {
                        this.selectItem.push(value[i]);
                    }
                }
            } else {
                this.selectItem = value
            }
  
        }

        public keyDeleSelectItem(): void {
            if (this.selectItem.length) {
                var truthBeTold = window.confirm("是否确定要删除选取的对象。" );
                if (truthBeTold) {
                    this.deleSelectItem()
                } else {

                }
            }
        }
        public deleSelectItem(): void {
            while (this.selectItem.length) {
                var vo: FolderMeshVo = this.selectItem.pop();
                this.hierarchyListPanel.deleFile(this.fileItem, vo);
            }
            Pan3d.  ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA))
        }
        public fileItem: Array<FolderMeshVo>;

        private mouseHitSprite(item: Array<FolderMeshVo>, mouseVect2d: Vector2D, selectArr: Array<FolderMeshVo>): void {

            var nearDis: number;
            var selectModel: FolderMeshVo;
            for (var i: number = 0; i < item.length; i++) {
                var hit: number = xyz.TooMathHitModel.testHitModel(item[i].dis, item[i].dis._scene, mouseVect2d);
                if (hit!=0) {
                    if (!nearDis || hit<nearDis ) {
                        nearDis = hit
                        selectModel= item[i]
                    } 
                }
            }
            if (selectModel) {
                console.log(nearDis)
                selectArr.push(selectModel)

                console.log("-----------------------")
            }
 
        }
        public selectModel(mouseVect2d: Vector2D): Array<FolderMeshVo> {
            var tempItem: Array<FolderMeshVo>=[]
            this.mouseHitSprite(this.fileItem, mouseVect2d, tempItem)
            return tempItem
        }
        
    }
}