module ossfolder {
    import UICompenent = Pan3d.UICompenent
    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign
    import Rectangle = Pan3d.Rectangle
    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import UIRectangle = Pan3d.UIRectangle
    import baseMeshVo = Pan3d.baseMeshVo
    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import MouseType = Pan3d.MouseType
    import FileVo = pack.FileVo
    import Vector2D = Pan3d.Vector2D
    import Vector3D = Pan3d.Vector3D
    import Scene_data = Pan3d.Scene_data
    import SampleFileVo = filelist.SampleFileVo
    import TextureManager = Pan3d.TextureManager
    

    export class OssListFile {
        public isOpen: boolean;
        public baseFile: FileVo;

    }
    export class FolderMeshVo extends Pan3d.baseMeshVo {
        public ossListFile: OssListFile
        public childItem: Array<FolderMeshVo>
        public needDraw: boolean;
        public constructor() {
            super();
        }
        public set name(value: string) {
    
            this.needDraw = true;
        }
     
        public destory(): void {
            this.pos = null;
 
            this.needDraw = null;
            this.clear = true
        }


    }
    export class FolderName extends Disp2DBaseText {
        public folderMeshVo: FolderMeshVo
        public makeData(): void {
            this.folderMeshVo = this.rightTabInfoVo;
            if (this.folderMeshVo) {

                var $uiRec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);


                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, "[9c9c9c]" + this.folderMeshVo.ossListFile.baseFile.name, 18, 50, 5, TextAlign.LEFT)



                if (this.folderMeshVo.ossListFile.isOpen) {
                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_PanRight"], 2, 7, 14, 14)

                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_FolderOpen_dark"], 20, 2, 18 * 1.4, 16 * 1.4)
                } else {
                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_PanUp"], 3, 7, 14, 14)

                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_FolderClosed_dark"], 20, 2, 18 * 1.4, 16 * 1.4)
                }

                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);

            }
        }



        public update(): void {
            this.folderMeshVo = this.rightTabInfoVo;
            if (this.folderMeshVo) {
                if (this.folderMeshVo.needDraw) {
                    this.makeData();
                    this.folderMeshVo.needDraw = false;
                }
                if (this.folderMeshVo.pos) {
                    this.ui.x = this.folderMeshVo.pos.x;
                    this.ui.y = this.folderMeshVo.pos.y;
 
                    this.ui.width = this.ui.baseRec.width * this.folderMeshVo.uiScale;
                    this.ui.height = this.ui.baseRec.height * this.folderMeshVo.uiScale;

                }
                if (this.folderMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        }
    }

    export class OssFolderPanel extends win.Dis2dBaseWindow {

        public static imgBaseDic: any
        public constructor() {
            super(FolderName, new Rectangle(0, 0, 256, 22), 5);
            this.left = 0;
            this.pageRect = new Rectangle(0, 0, 200, 200)
        }
        protected loadConfigCom(): void {
            super.loadConfigCom();

            this._baseRender.mask = this._uiMask

          

            this.loadAssetImg(() => {
                this.makeItemUiList()
                Pan3d.TimeUtil.addFrameTick((t: number) => { this.update(t) });
            })

            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) };
            }
            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
        }

        private loadAssetImg(bfun: Function): void {
            OssFolderPanel.imgBaseDic = {};
            var item: Array<string> = [];
            item.push("icon_FolderClosed_dark");
            item.push("icon_FolderOpen_dark");
            item.push("icon_PanRight");
            item.push("icon_PanUp");


            var finishNum: number = 0
            for (var i: number = 0; i < item.length; i++) {
                this.loadTempOne(item[i], () => {
                    finishNum++
                    if (finishNum >= item.length) {
                        bfun();
                    }

                });
            }

 
        }

        public resize(): void {
            super.resize();
            if (this.uiLoadComplete) {

                var needScroll: boolean = this.contentHeight > this._uiMask.height;
   
                this.setUiListVisibleByItem([this.c_scroll_bar_bg], needScroll);

                if (needScroll) {
                    this._uiMask.width -= this.c_scroll_bar_bg.width;
                }
            }
 
          
        }
     

        private loadTempOne(name: string, bfun: Function): void {

            var tempImg = makeImage()
            OssFolderPanel.imgBaseDic[name] = tempImg;
            tempImg.onload = () => {
                bfun();
            }
            tempImg.url = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png"
            tempImg.src = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png"

        }

     
        public update(t: number): void {
            super.update(t);

        }

        public fileOssFolderDic(value: string): void {
 
            this.fileAndOpenDicByUrl(value, this.fileItem)

        }
        private fileAndOpenDicByUrl(value: string, arr: Array<FolderMeshVo>): void {

            for (var i: number = 0; arr&& i < arr.length; i++) {
                var vo: FolderMeshVo = arr[i]
                if (value.indexOf(vo.ossListFile.baseFile.path) != -1) {
                    console.log("找到文件目录", vo.ossListFile.baseFile.path)
          

                    if (!vo.ossListFile.isOpen) {
                        vo.ossListFile.isOpen = true;
                        if (vo.childItem) {
                            this.resetHideDic(vo.childItem)
                            this.refrishFolder();
                            this.fileAndOpenDicByUrl(value, vo.childItem)
                        } else {
                            this.pushChidrenDic(vo, () => {
                                this.refrishFolder();
                                this.fileAndOpenDicByUrl(value, vo.childItem)
                            }) //显示mu
                        }

                    } else {
                        this.fileAndOpenDicByUrl(value, vo.childItem)
                    } 
               
              


 
                }
            }
        }

         
        protected itemMouseUp(evt: InteractiveEvent): void {
  
            if (this.c_scroll_bar_bg.parent && evt.x > this.c_scroll_bar_bg.x) {
                console.log("在外面---")
                return;
            }
  
                for (var i: number = 0; i < this._uiItem.length; i++) {
                    var $vo: FolderName = <FolderName>this._uiItem[i]
                    if ($vo.ui == evt.target) {
                        if ((evt.x - this.left) - $vo.ui.x < 20) {
                            $vo.folderMeshVo.ossListFile.isOpen = !$vo.folderMeshVo.ossListFile.isOpen;
                            if ($vo.folderMeshVo.ossListFile.isOpen) {
                                this.pushChidrenDic($vo.folderMeshVo)
                            } else {
                                this.clearChildern($vo.folderMeshVo)   //将要关闭
                            }
                          
                        } else {
                            if (!$vo.folderMeshVo.ossListFile.isOpen) {
                                this.pushChidrenDic($vo.folderMeshVo)
                            } 
                            $vo.folderMeshVo.ossListFile.isOpen = true

                            Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), $vo.folderMeshVo.ossListFile.baseFile.path)
                        }

                        $vo.folderMeshVo.needDraw = true;

                      
                    }
                }
                this.refrishFolder();

            

        }
        private resetHideDic(arr: Array<FolderMeshVo>): void {

            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].clear = false
                arr[i].pos = new Vector3D();
                this.showTemp(arr[i]);
                this.resetHideDic( arr[i].childItem)
            }

        }
        private pushChidrenDic(folderMeshVo: FolderMeshVo, bfun?: Function): void {
            if (folderMeshVo.childItem) {

                console.log("已经有了，直接显示就行")
                this.resetHideDic(folderMeshVo.childItem)
            

            } else {
                var pathurl: string = folderMeshVo.ossListFile.baseFile.path
                pack.FileOssModel.getFolderArr(pathurl, (value: Array<FileVo>) => {
                    if (!folderMeshVo.childItem) {
                        folderMeshVo.childItem = []
                        for (var i: number = 0; value && i < value.length; i++) {
                            if (value[i].isFolder) {
                                var $vo: FolderMeshVo = this.getCharNameMeshVo(value[i])
                                $vo.pos = new Vector3D(0, i * 15, 0)
                                folderMeshVo.childItem.push($vo)
 
                            }
                        }
                        this.refrishFolder();

                        bfun && bfun()
                    } else {
                        console.log("已获取过，注意可能是网络问题")
                    }

                })
            }
           
      
 
        }
        private clearChildern($folderMeshVo: FolderMeshVo): void {
            if ($folderMeshVo.childItem) {
                for (var i: number = 0; i < $folderMeshVo.childItem.length; i++) {
                    var $vo: FolderMeshVo = $folderMeshVo.childItem[i];
                    $vo.destory();
                    this.clearChildern($vo)
                }
            }
        }
        private makeItemUiList(): void {
            this.fileItem = [];
            for (var i: number = 0; i < this._uiItem.length; i++) {
              //  this._uiItem[i].ui.addEventListener(InteractiveEvent.Up, this.itemMouseUp, this);
            }
  
            //"upfile/shadertree/"
            //
            //Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            var rootDic: string = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.getFolderArr(rootDic, (value: Array<FileVo>) => {
                for (var i: number = 0; i < value.length; i++) {
                    if (value[i].isFolder) {
                        var $vo: FolderMeshVo = this.getCharNameMeshVo(value[i])
                        $vo.pos = new Vector3D(0, i * 15, 0)

                        this.fileItem.push($vo)
                    }
                }
                this.refrishFolder();
            })

        }
        private fileItem: Array<FolderMeshVo>;
        public getCharNameMeshVo(value: FileVo): FolderMeshVo {
            var $vo: FolderMeshVo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            $vo.ossListFile.baseFile = value
            var tmep: Disp2DBaseText = this.showTemp($vo);

            tmep.ui.removeEventListener(InteractiveEvent.Up, this.itemMouseUp, this);
            tmep.ui.addEventListener(InteractiveEvent.Up, this.itemMouseUp, this);
            return $vo;
        }
        protected makeOtherRender(): UIRenderComponent {
            var tempRender: UIRenderComponent = new UIRenderComponent;
            console.log("添加新对象")
            tempRender.mask = this._uiMask;
            return tempRender;
        }
    
        private folderCellHeight: number = 20
        private refrishFolder(): void {
         
            OssFolderPanel.listTy = this.moveListTy;
            var frist: number = OssFolderPanel.listTy 
            this.disChiendren(this.fileItem,10);
            var moveTy: number = 0;
            this.moveAllTy(this.fileItem, moveTy)

            this.contentHeight = OssFolderPanel.listTy - frist;
            this.resize();
        }
        private get isCanToDo(): boolean { //false为可以操作

            if (this && this.hasStage) {
                return true;
            } else {
                return false;
            }

        }
        public onMouseWheel($evt: MouseWheelEvent): void {
            if (!this.isCanToDo) {
                return
            }
            if (this.pageRect.isHitByPoint($evt.x, $evt.y)) {
                if (this.contentHeight > this._uiMask.height) {
                    this.c_scroll_bar.y += $evt.deltaY / 30;
                    this.changeScrollBar();
                    this.resize();
                }
            }
        }
        protected changeScrollBar(): void {
            super.changeScrollBar()
            this.refrishFolder();
        }
        private moveAllTy(arr: Array<FolderMeshVo>, ty: number = 0): void {
            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].pos.y += ty;  
                if (arr[i].ossListFile.isOpen) {
                    this.moveAllTy(arr[i].childItem, ty)
                }
            }

        }
        private static listTy: number=0
        private disChiendren(arr: Array<FolderMeshVo>, tx: number=0): void {
            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].pos.x = tx;
                arr[i].pos.y = OssFolderPanel.listTy
                arr[i].uiScale=0.7
                OssFolderPanel.listTy += 20;
                if (arr[i].ossListFile.isOpen) {
                    this.disChiendren(arr[i].childItem, tx+20)
                }
            }
   
        }
    }
}