module prop {
    import Vector3D = Pan3d.Vector3D
    import UIRectangle = Pan3d.UIRectangle;
    import TextureManager = Pan3d.TextureManager;
    import EventDispatcher = Pan3d.EventDispatcher;
    import TimeUtil = Pan3d.TimeUtil;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    import Matrix3D = Pan3d.Matrix3D;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    import Rectangle = Pan3d.Rectangle;
    import UIAtlas = Pan3d.UIAtlas
    import UIRenderComponent = Pan3d.UIRenderComponent
    import LoadManager = Pan3d.LoadManager
    import UIConatiner = Pan3d.UIConatiner
    import Scene_data = Pan3d.Scene_data;

    
  
    export class TexturePicUi extends BaseMeshUi {
        public constructor(w: number = 64, h: number = 64) {
            super(w, h);
 
            this.initView();
            this.resize();
        }
        protected initView(): void {
            this.addEvets()
        }
        protected addEvets(): void {
            super.addEvets();
            var $ui: UICompenent = this.ui
            $ui.addEventListener(drag.PanDragEvent.DRAG_DROP, this.dragDrop, this);
            $ui.addEventListener(drag.PanDragEvent.DRAG_ENTER, this.dragEnter, this);
        }
        private dragDrop(evt: any): void {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                console.log("可以拖动")
            } else {
                console.log("不可以")
            }

        }
        private dragEnter(evt: any): void {
            if (this.testSuffix(drag.DragManager.dragSource.url)) {
                this.url = drag.DragManager.dragSource.url;
                this.dispatchEvent(new ReflectionEvet(ReflectionEvet.CHANGE_DATA));
            }
        }
        private $dulbelClikTm: number = 0;
        private _inputHtmlSprite: HTMLInputElement
        public suffix: string;
        public haveDoubleCilk: boolean = true
        protected butClik(evt: InteractiveEvent): void {
 
        
            if (TimeUtil.getTimer() < this.$dulbelClikTm) {

                if (this._url&&this._url.indexOf(".material") != -1) {
                    var fileUrl: string = this._url
                    Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), fileUrl);
                } else {
                    if (this.haveDoubleCilk) {
                        console.log("选文件")
                        this.doubleClick()
                    } else {
                        console.log("关闭了选取事件");
                    }
                
                }

            }
            this.$dulbelClikTm = TimeUtil.getTimer() + 1000
         
        }
        protected doubleClick(): void {
            this._inputHtmlSprite = <HTMLInputElement>document.createElement('input');
            this._inputHtmlSprite.setAttribute('id', '_ef');
            this._inputHtmlSprite.setAttribute('type', 'file');
            this._inputHtmlSprite.setAttribute("style", 'visibility:hidden');
            this._inputHtmlSprite.click();
            this._inputHtmlSprite.value;
            this._inputHtmlSprite.addEventListener("change", (cevt: any) => { this.changeFile(cevt) });
        }
        private testSuffix(value: string): boolean {
            if (!this.suffix) {
                return;
            }
            var tempItem: Array<string> = this.suffix.split("|")
            for (var i: number = 0; i < tempItem.length; i++) {
                if (value.indexOf(tempItem[i])!=-1) {
                    return true
                }
            }
            return false
        }
        private changeFile(evt: any): void {
            for (var i: number = 0; i < this._inputHtmlSprite.files.length&&i<1; i++) {
                var simpleFile = this._inputHtmlSprite.files[i]
       
                //if (!/image\/\w+/.test(simpleFile.type)) {
                //    alert("请确保文件类型为图像类型");
                //}
                console.log(this.testSuffix(simpleFile.name))
                if (this.testSuffix(simpleFile.name)) {
                    var $reflectionEvet: ReflectionEvet = new ReflectionEvet(ReflectionEvet.CHANGE_DATA)
                    $reflectionEvet.data = simpleFile
                    this.dispatchEvent($reflectionEvet);
                } else {
                    alert("请确保文件类型 " + this.suffix);
                }
            }
            this._inputHtmlSprite = null;
        }
   
 
        public get url(): string {
            return this._url
        }
        protected _url: string
        public set url(value: string) {
            this._url = value;
            if (!this._url) {
                this._url = "";
            }
            var picUrl: string = this._url
            if (this._url.indexOf(".material") != -1) {
                picUrl = "icon/marterial_64x.png"
            }  
            if (this._url.indexOf(".objs") != -1) {
                picUrl = "icon/objs_64x.png"
            }  
            if (this._url.indexOf(".md5anim") != -1) {
                picUrl = "icon/txt_64x.png"
            }  
            if (this._url.indexOf(".txt") != -1) {
                picUrl = "icon/txt_64x.png"
            }  
            if (this._url.indexOf(".zzw") != -1) {
                picUrl = "icon/zzw_64x.png"
            }  
            if (this._url.indexOf(".md5mesh") != -1) {
                picUrl = "icon/txt_64x.png"
            }  

     

            var $img: any = TextureManager.getInstance().getImgResByurl(Scene_data.fileRoot + picUrl)
            var $uiRender: UIRenderComponent = this.textureContext.ui.uiRender
            if ($img) {
                var rec: UIRectangle = $uiRender.uiAtlas.getRec(this.textureContext.ui.skinName);
                $uiRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                $uiRender.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                TextureManager.getInstance().updateTexture($uiRender.uiAtlas.texture, rec.pixelX, rec.pixelY, $uiRender.uiAtlas.ctx);
            } else {
                this.textureContext.ui.uiRender.uiAtlas.upDataPicToTexture(picUrl, this.textureContext.ui.skinName);
            }

    
        }
 
    
         

    }
} 