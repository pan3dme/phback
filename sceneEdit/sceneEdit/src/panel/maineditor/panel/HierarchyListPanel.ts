module maineditor {
    import UICompenent = Pan3d.UICompenent
    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import DualQuatFloat32Array = Pan3d.DualQuatFloat32Array
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign
    import Rectangle = Pan3d.Rectangle
    import Display3dMovie = Pan3d.Display3dMovie
    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import CombineParticle = Pan3d.CombineParticle
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
    import TextureManager = Pan3d.TextureManager
    import LoadManager = Pan3d.LoadManager
    import KeyboardType = Pan3d.KeyboardType
    import SkinMesh = Pan3d.SkinMesh
    import MeshData = Pan3d.MeshData
    import Dictionary = Pan3d.Dictionary
    import AnimData = Pan3d.AnimData

    import Display3DSprite = Pan3d.Display3DSprite

    import Shader3D = Pan3d.Shader3D
    import GroupDataManager = Pan3d.GroupDataManager
    import Material = Pan3d.Material
    import GroupRes = Pan3d.GroupRes
    import GroupItem = Pan3d.GroupItem
    import BaseRes = Pan3d.BaseRes
    import TexItem = Pan3d.TexItem
    import MaterialBaseParam = Pan3d.MaterialBaseParam
    import ObjData = Pan3d.ObjData
    import TextureRes = Pan3d.TextureRes
    import Matrix3D = Pan3d.Matrix3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import BaseDiplay3dShader = Pan3d.BaseDiplay3dShader
    import ConstItem = Pan3d.ConstItem
    import Display3D = Pan3d.Display3D
    import DynamicBaseTexItem = Pan3d.DynamicBaseTexItem
    import DynamicBaseConstItem = Pan3d.DynamicBaseConstItem
    import BaseEvent = Pan3d.BaseEvent

    import PrefabStaticMesh = pack.PrefabStaticMesh
    import CombineReflectionView = prop.CombineReflectionView

    import TooXyzPosData = xyz.TooXyzPosData
    import Panel = win.Panel;
    import MenuListData = menutwo.MenuListData
    import SampleFileVo = filelist.SampleFileVo



    export class TestDiplay3dShader extends Shader3D {
        static TestDiplay3dShader: string = "TestDiplay3dShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +

                "uniform mat4 vpMatrix3D;" +
                "uniform mat4 posMatrix3D;" +

                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +

                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = vpMatrix3D * vt0;" +

                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "gl_FragColor =infoUv;\n" +
                "}"
            return $str

        }

    }


    export class ModelSprite extends left.MaterialModelSprite {
        public constructor() {
            super();
        }
 
        public update(): void {
            var showTempModel: boolean = false
            if (showTempModel) {
                this.drawBaseModel()
            } else {
                super.update()
            }
        }
 
        private baseTextureres: TextureRes
        private baseModeShader: Shader3D
        private drawBaseModel(): void {
            if (this.objData) {
                if (!this.baseModeShader) {
                    ProgrmaManager.getInstance().registe(TestDiplay3dShader.TestDiplay3dShader, new TestDiplay3dShader);
                    this.baseModeShader = ProgrmaManager.getInstance().getProgram(TestDiplay3dShader.TestDiplay3dShader);
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(128, 128, false);
                    $ctx.fillStyle = "rgb(255,255,255)";
                    $ctx.fillRect(0, 0, 128, 128);
                    this.baseTextureres = TextureManager.getInstance().getCanvasTexture($ctx)
                }
                Scene_data.context3D.setProgram(this.baseModeShader.program);
                Scene_data.context3D.setVpMatrix(this.baseModeShader, Scene_data.vpMatrix.m);
                Scene_data.context3D.setVcMatrix4fv(this.baseModeShader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setRenderTexture(this.baseModeShader, "s_texture", this.baseTextureres.texture, 0);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        }

        private _prefab: PrefabStaticMesh;
        public get prefab(): PrefabStaticMesh {
            return this._prefab
        }
        public set prefab(value: PrefabStaticMesh) {
            this._prefab = value
            this._prefab.addEventListener(BaseEvent.COMPLETE, this.meshParamInfo, this);
            this.meshParamInfo();
        }
        private meshParamInfo(): void {
            if (this._prefab.objsurl) {
                pack.PackObjDataManager.getInstance().getObjDataByUrl(this._prefab.objsurl, (value: ObjData) => {
                    this._prefab.objData = value
                    this.objData = value;
                })
            }
            if (this._prefab.textureurl) {
                pack.PackMaterialManager.getInstance().getMaterialByUrl(this._prefab.textureurl, ($materialTree: materialui.MaterialTree) => {
                    this._prefab.material = $materialTree;
                    this.material = $materialTree;
                })
            }
            if (this.material) {
                if (this._prefab.paramInfo) {
                    this.materialParam = new Pan3d.MaterialBaseParam;
                    this.materialParam.material = this.material;
                    pack.PackPrefabManager.getInstance().makeMaterialBaseParam(this.materialParam, this._prefab.paramInfo);
                }
            }

        }

        public setPreFabUrl(url: string, bfun?: Function): void {
            pack.PackPrefabManager.getInstance().getPrefabByUrl(url, (value: pack.PrefabStaticMesh) => {
                this.prefab = value
                bfun && bfun()
            })
        }



    }

    export class OssListFile extends HierarchyFileNode {


    }
    export class FolderMeshVo extends Pan3d.baseMeshVo {
        public ossListFile: OssListFile
        public childItem: Array<FolderMeshVo>
        public needDraw: boolean;
        public dis: Display3D;
        public cellPos: Vector2D

        public constructor() {
            super();
        }
        public set name(value: string) {

            this.needDraw = true;
        }

        public destory(): void {

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

                // this.parent.uiAtlas.ctx.fillStyle = "#3c3c3c"; // text color
                // this.parent.uiAtlas.ctx.fillRect(1, 1, $uiRec.pixelWitdh-2, $uiRec.pixelHeight-2);


                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, "[9c9c9c]" + this.folderMeshVo.ossListFile.name, 24, 70, 10, TextAlign.LEFT)


                var uiScaleVo: number = 2

                if (this.folderMeshVo.ossListFile.children || this.folderMeshVo.ossListFile.type == HierarchyNodeType.Folder) {
                    if (this.folderMeshVo.ossListFile.isOpen) {
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_PanRight"], 2, 5, 20, 20)
                    } else {
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_PanUp"], 3, 5, 20, 20)
                    }
                }
                switch (this.folderMeshVo.ossListFile.type) {
                    case HierarchyNodeType.Prefab:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["profeb_16"], 30, 5, 26, 32)
                        break
                    case HierarchyNodeType.Role:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["zzw_16x"], 30, 5, 26, 32)
                        break
                    case HierarchyNodeType.SKILL:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["skill_16x"], 30, 5, 26, 32)
                        break

                    case HierarchyNodeType.Light:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_point16"], 30, 5, 26, 32)
                        break
                    case HierarchyNodeType.Particle:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["particle_16x"], 30, 5, 26, 32)
                        break
                    case HierarchyNodeType.Folder:
                        if (this.folderMeshVo.ossListFile.isOpen) {
                            this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_FolderOpen_dark"], 15, 2, 18, 16)
                        } else {
                            this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_FolderClosed_dark"], 15, 2, 18, 16)
                        }
                        break
                    default:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["water_plane16"], 15, 2, 18, 16)
                        break
                }
                //icon_point16
                //profeb_16
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
                if (this.folderMeshVo.cellPos) {
                    this.ui.x = this.folderMeshVo.cellPos.x;
                    this.ui.y = this.folderMeshVo.cellPos.y;

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

    export class HierarchyListPanel extends win.Dis2dBaseWindow {

        public only: boolean = true //标记需要移除
        public static imgBaseDic: any;
        public constructor() {
            super(FolderName, new Rectangle(0, 0, 400, 40), 20);
            this.left = 0;
            this.pageRect = new Rectangle(0, 0, 200, 200)
            EditorModel.getInstance().hierarchyListPanel = this

            this.maskRoundRect = new Rectangle(0, 13, 0, 14);
 
        }

        protected makeOtherRender(): UIRenderComponent {
            var tempRender: UIRenderComponent = new UIRenderComponent;
            console.log("添加新对象")
            tempRender.mask = this._uiMask;
            return tempRender;
        }


        protected loadConfigCom(): void {
            super.loadConfigCom();
            this.setUiListVisibleByItem([this.c_scroll_bar_bg], true)
            this.setUiListVisibleByItem([this.c_win_bg], false)
            this.setUiListVisibleByItem([this.e_panel_1], true)
            this.resize();
            this.loadAssetImg(() => {
                this.makeItemUiList()
                Pan3d.TimeUtil.addFrameTick((t: number) => { this.update(t) });

                //  console.log("图片加载完")
            })


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
        private _cellBgRender: UIRenderComponent
        private loadAssetImg(bfun: Function): void {
            HierarchyListPanel.imgBaseDic = {};
            var item: Array<string> = [];
            item.push("icon_FolderClosed_dark");
            item.push("icon_FolderOpen_dark");
            item.push("icon_PanRight");
            item.push("icon_PanUp");
            item.push("profeb_16");
            item.push("icon_point16");
            item.push("water_plane16");
            item.push("particle_16x");
            item.push("zzw_16x");
            item.push("skill_16x");

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
        private loadTempOne(name: string, bfun: Function): void {
            var tempImg = makeImage()
            HierarchyListPanel.imgBaseDic[name] = tempImg;
            tempImg.onload = () => {
                bfun();
            }
            tempImg.url = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png"
            tempImg.src = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png"

        }
        public update(t: number): void {
            super.update(t);

        }
        public changeFileName($vo: FolderName): void {

            if ($vo.folderMeshVo && $vo.ui) {

                var name: string = $vo.folderMeshVo.ossListFile.name
                var rect: Rectangle = new Rectangle()
                rect.x = $vo.ui.x + this.left;
                rect.y = $vo.ui.y + this.top;
                rect.x += 30;
                rect.y += 0;
                rect.width = name.length * 8
                rect.height = 20


                var receet: TextMetrics = editscene.ChangeNameModel.getInstance().getTextMetrics(name, 14)
                rect.width = receet.width + 20


                editscene.ChangeNameModel.getInstance().changeName(rect, name, (value: string) => {

                    $vo.folderMeshVo.ossListFile.name = value;

                    $vo.makeData()
                    console.log($vo)
                })




            }
        }
        private makeFileFloadMenu($evt: MouseEvent): void {
            var $rightMenuEvet: menutwo.MenuTwoEvent = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp: any = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY)

            var menuA: Array<MenuListData> = new Array();
            menuA.push(new MenuListData("删除文件", "1"));
            menuA.push(new MenuListData("重命名", "2"));
            menuA.push(new MenuListData("查找文件", "3"));

            temp.menuXmlItem = menuA;
            temp.info = {};
            temp.info.bfun = (value: any, evt: InteractiveEvent) => { this.menuBfun(value, evt) }
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        }
        private menuBfun(value: any, evt: InteractiveEvent): void {
            switch (value.key) {
                case "1":
                    if (this.selectFolderMeshVo) {
                        this.deleFile(EditorModel.getInstance().fileItem, this.selectFolderMeshVo.folderMeshVo)
                        Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA))
                        this.refrishFolder();

                    }
                    break
                case "2":

                    this.changeFileName(this.selectFolderMeshVo)
                    break
                case "3":

                    var pathurl: string = Pan3d.Scene_data.fileRoot + this.selectFolderMeshVo.folderMeshVo.ossListFile.url
                    Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), pathurl.replace(Pan3d.Scene_data.ossRoot, ""))

                    break
                default:

                    break
            }
        }
        public deleFile(item: Array<FolderMeshVo>, vo: FolderMeshVo): void {
            var idx: number = item.indexOf(vo)
            if (idx == -1) {
                console.log("没找到需要到子目录找")
            } else {
                item.splice(idx, 1)

                switch (vo.ossListFile.type) {
                    case HierarchyNodeType.Prefab:
                        MainEditorProcessor.edItorSceneManager.removeDisplay(vo.dis);
                        break
                    case HierarchyNodeType.Particle:
                        MainEditorProcessor.edItorSceneManager.removeDisplay(vo.dis);
                        break
                    case HierarchyNodeType.Role:
                        MainEditorProcessor.edItorSceneManager.removeMovieDisplay(<Display3dMovie>(vo.dis));
                        break
                    default:
                        break

                }
             
                this.clearTemp(vo)
            }
            this.refrishFolder();
        }


        protected itemMouseUp(evt: InteractiveEvent): void {

            var $clikVo: FolderName
            for (var i: number = 0; i < this._uiItem.length; i++) {
                var $vo: FolderName = <FolderName>this._uiItem[i];
                if ($vo.ui == evt.target) {
                    $clikVo = $vo
                    if ((evt.x - this.left) - $vo.ui.x < 20) {
                        $vo.folderMeshVo.ossListFile.isOpen = !$vo.folderMeshVo.ossListFile.isOpen;
                        if ($vo.folderMeshVo.ossListFile.isOpen) {
                        } else {
                            this.clearChildern($vo.folderMeshVo)   //将要关闭
                        }
                    }
                    $vo.folderMeshVo.needDraw = true;
                }
            }
            if ($clikVo) {
                this.hidefileItemBg(EditorModel.getInstance().fileItem);
                $clikVo.folderMeshVo.ossListFile.treeSelect = true


                EditorModel.getInstance().selectItem = [$clikVo.folderMeshVo];

                this.showXyzMove();
            }
            this.refrishFolder();
            this.resize()

        }
        private showMeshView(value: TooXyzPosData, $vo: FolderMeshVo): void {
            let propanle = prop.PropModel.getInstance().propPanle
            var _combineReflectionView = new CombineReflectionView(propanle);
            var A: PropertyMeshView = new PropertyMeshView(propanle)
            A.data = value;
            _combineReflectionView.addView(A);
 
          

            switch ($vo.ossListFile.type) {
                case HierarchyNodeType.Prefab:
                    if ((<ModelSprite>$vo.dis).prefab) {
                        var B: filelist.PrefabMeshView = new filelist.PrefabMeshView(propanle)
                        B.data = (<ModelSprite>$vo.dis).prefab;
                        _combineReflectionView.addView(B)
                    } else {
                        console.log("还没准备好")
                    }
                    break
                case HierarchyNodeType.Role:
                    console.log((<left.MaterialRoleSprite>$vo.dis).roleStaticMesh)
                    if ((<left.MaterialRoleSprite>$vo.dis).roleStaticMesh) {
                        var C: filelist.RoleMeshView = new filelist.RoleMeshView(propanle);
                        C.data = (<left.MaterialRoleSprite>$vo.dis).roleStaticMesh;
                        _combineReflectionView.addView(C);
                    } else {
                        console.log("还没准备好")
           
                    }
                    break
                case HierarchyNodeType.SKILL:
                    if ((<maineditor.SkillSpriteDisplay>$vo.dis).skillStaticMesh) {
                        var D: filelist.SkillMeshView = new filelist.SkillMeshView(propanle);
                        D.data = (<maineditor.SkillSpriteDisplay>$vo.dis).skillStaticMesh;
                        _combineReflectionView.addView(D);
                    } else {
                        console.log("还没准备好")

                    }
                    break

                case HierarchyNodeType.Particle:
                    if ($vo.dis) {
                        var E: filelist.FileMeshView = new filelist.FileMeshView(propanle);
                        E.data = $vo.ossListFile.url
                        _combineReflectionView.addView(E);
                    } else {
                        console.log("还没准备好")

                    }

                    break
                default:
                    break

            }
            _combineReflectionView.type = "物件"
            prop.PropModel.getInstance().showOtherMeshView(_combineReflectionView);

        }
        private showXyzMove(): void {
            var disItem: Array<Display3D> = []
            var selctprefab: FolderMeshVo
            for (var i: number = 0; i < EditorModel.getInstance().selectItem.length; i++) {
                var vo: FolderMeshVo = EditorModel.getInstance().selectItem[i]
                vo.ossListFile.treeSelect = true
                disItem.push(vo.dis)
                selctprefab = vo
            }
            var data: TooXyzPosData = TooXyzPosData.getBase(disItem)
            this.showMeshView(data, selctprefab)


            Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.MAKE_DTAT_ITEM_TO_CHANGE), data)
        }

        private hidefileItemBg(arr: Array<FolderMeshVo>): void {
            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].ossListFile.treeSelect = false;
                this.hidefileItemBg(arr[i].childItem);
            }
        }
        private clearChildern($folderMeshVo: FolderMeshVo): void {
            if ($folderMeshVo.childItem) {
                for (var i: number = 0; i < $folderMeshVo.childItem.length; i++) {
                    var $vo: FolderMeshVo = $folderMeshVo.childItem[i];
                    $vo.cellPos.x = -1000
                    this.clearChildern($vo)
                }
            }
        }

        private isCompelet: boolean
        protected makeItemUiList(): void {
            this._baseRender.mask = this._uiMask
            if (!this.onRightMenuFun) {
                this.onRightMenuFun = ($evt: MouseEvent) => { this.onRightMenu($evt) };
            }
            document.addEventListener("contextmenu", this.onRightMenuFun)
            if (!this.onKeyDownFun) {
                this.onKeyDownFun = ($evt: KeyboardEvent) => { this.onKeyDown($evt) };
            }
            document.addEventListener(MouseType.KeyDown, this.onKeyDownFun)
            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) };
            }
            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);

            this.loadBaseSceneUrl()
        }
        private onKeyDownFun: any;
        private onKeyDown($evt: KeyboardEvent): void {
            if (EditorModel.getInstance().selectItem && EditorModel.getInstance().selectItem.length == 1) {
                var selectVo: FolderMeshVo = EditorModel.getInstance().selectItem[0]
                var idex: number = EditorModel.getInstance().fileItem.indexOf(selectVo)
                if ($evt.ctrlKey) {
                    switch ($evt.keyCode) {
                        case KeyboardType.Up:
                            if (idex > 0) {
                                EditorModel.getInstance().fileItem.splice(idex, 1)
                                EditorModel.getInstance().fileItem.splice(idex - 1, 0, selectVo)
                            }
                            console.log("向上")
                            break
                        case KeyboardType.Down:
                            if (idex < EditorModel.getInstance().fileItem.length - 2) {
                                EditorModel.getInstance().fileItem.splice(idex, 1)
                                EditorModel.getInstance().fileItem.splice(idex + 1, 0, selectVo)
                            }
                            console.log("向下")
                            break

                    }
                }
                this.refrishFolder();
            }

        }


        public addRender($uiRender: UIRenderComponent): void {
            super.addRender($uiRender)
            //这里的监听和之前有冲突之前添加过的 需要优化，暂时没问题
            for (var i: number = 0; this._uiItem && i < this._uiItem.length; i++) {
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Down, this.itemMouseUp, this);
            }
        }
        private loadBaseSceneUrl(): void {
            ModuleEventManager.dispatchEvent(new editscene.EditSceneEvent(editscene.EditSceneEvent.EDITE_SCENE_UI_LOAD_COMPLETE));
        }
        private onRightMenuFun: any
        public onRightMenu($evt: MouseEvent): void {
            $evt.preventDefault();
            var $slectUi: UICompenent = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
            if ($slectUi) {
                if ($slectUi.parent instanceof HierarchyListPanel) {
                    var vo: FolderName = this.getItemVoByUi($slectUi);
                    if (vo) {
                        this.selectFolderMeshVo = vo
                        this.makeFileFloadMenu($evt)
                    }
                }
            }


        }
        private selectFolderMeshVo: FolderName
        private getItemVoByUi(ui: UICompenent): FolderName {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].ui == ui) {
                    return <FolderName>this._uiItem[i];
                }
            }
            return null
        }


        private wirteItem(childItem: Array<any>): Array<FolderMeshVo> {
            var $item: Array<FolderMeshVo> = new Array
            for (var i: number = 0; childItem && i < childItem.length; i++) {

                var $vo: FolderMeshVo = new FolderMeshVo;
                $vo.ossListFile = new OssListFile;

                $vo.ossListFile.name = childItem[i].name;
                $vo.ossListFile.url = childItem[i].url


                $vo.ossListFile.type = childItem[i].type;
                $vo.ossListFile.treeSelect = childItem[i].treeSelect;;
                $vo.cellPos = new Vector2D()



                this.showTemp($vo);


                switch ($vo.ossListFile.type) {
                    case HierarchyNodeType.Prefab:
                        var prefabSprite = new ModelSprite();
                        prefabSprite.setPreFabUrl(childItem[i].url);
                        $vo.dis = prefabSprite;

                        MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);
                        break
                    case HierarchyNodeType.Particle:
                        var lyfSprite = new LyfSpriteDisplay();
                        lyfSprite.addLyfByUrl(childItem[i].url);
                        $vo.dis = lyfSprite;

                        MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);
                        break
                    case HierarchyNodeType.Role:
                        var roleSprite = new left.MaterialRoleSprite();
                        roleSprite.setRoleZwwUrl(childItem[i].url)
                        $vo.dis = roleSprite;
                        MainEditorProcessor.edItorSceneManager.addMovieDisplay(roleSprite);
                        break
                    case HierarchyNodeType.SKILL:
                        var skillsprite = new maineditor.SkillSpriteDisplay();
                        skillsprite.addSkillByUrl(childItem[i].url)

                        $vo.dis = skillsprite;
                        MainEditorProcessor.edItorSceneManager.addDisplay(skillsprite);

                  
                        break
                    default:
                        break
                }


                $vo.dis.x = childItem[i].x;
                $vo.dis.y = childItem[i].y;
                $vo.dis.z = childItem[i].z;

                $vo.dis.scaleX = childItem[i].scaleX;
                $vo.dis.scaleY = childItem[i].scaleY;
                $vo.dis.scaleZ = childItem[i].scaleZ;
                $vo.dis.rotationX = childItem[i].rotationX;
                $vo.dis.rotationY = childItem[i].rotationY;
                $vo.dis.rotationZ = childItem[i].rotationZ;




                $vo.childItem = this.wirteItem(childItem[i].children);
                $item.push($vo)
            }

            return $item

        }
        public inputZzwToScene(temp: any): void {
     

            var role: left.MaterialRoleSprite = new left.MaterialRoleSprite();
            role.setRoleZwwUrl(temp.url)
            MainEditorProcessor.edItorSceneManager.addMovieDisplay(role);
          //  pack.RoleChangeModel.getInstance().changeRoleModel(temp.url, role)



            var $vo: FolderMeshVo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            $vo.dis = role

 

            $vo.ossListFile.name = temp.name;
            $vo.ossListFile.url = temp.url;
            $vo.ossListFile.type = HierarchyNodeType.Role;
            $vo.ossListFile.treeSelect = false;
            $vo.cellPos = new Vector2D();

            this.showTemp($vo);

            EditorModel.getInstance().fileItem.push($vo);
            this.isCompelet = true;
            this.refrishFolder();
            this.resize()

        }
        public inputLyfToScene(temp: any): void {


            var lyfSprite: LyfSpriteDisplay = new LyfSpriteDisplay();
            lyfSprite.addLyfByUrl(temp.url)
            MainEditorProcessor.edItorSceneManager.addDisplay(lyfSprite);


            var $vo: FolderMeshVo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            $vo.dis = lyfSprite

            MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);

            $vo.ossListFile.name = temp.name;
            $vo.ossListFile.url = temp.url;
            $vo.ossListFile.type = HierarchyNodeType.Particle;
            $vo.ossListFile.treeSelect = false;
            $vo.cellPos = new Vector2D();

            this.showTemp($vo);

            EditorModel.getInstance().fileItem.push($vo);
            this.isCompelet = true;
            this.refrishFolder();
            this.resize()

        }
        public inputSkillToScene(temp: any): void {


            var skillSprite: SkillSpriteDisplay = new SkillSpriteDisplay();
            skillSprite.addSkillByUrl(temp.url)
            MainEditorProcessor.edItorSceneManager.addDisplay(skillSprite);


            var $vo: FolderMeshVo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            $vo.dis = skillSprite

            MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);

            $vo.ossListFile.name = temp.name;
            $vo.ossListFile.url = temp.url;
            $vo.ossListFile.type = HierarchyNodeType.SKILL;
            $vo.ossListFile.treeSelect = false;
            $vo.cellPos = new Vector2D();

            this.showTemp($vo);

            EditorModel.getInstance().fileItem.push($vo);
            this.isCompelet = true;
            this.refrishFolder();
            this.resize()

        }


        public inputPrefabToScene(temp: any): void {


            var $url: string = temp.url


            var $vo: FolderMeshVo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;


            var $mode = new ModelSprite();

            $mode.setPreFabUrl($url)
            $vo.dis = $mode


            if (temp.scale) {
                $vo.dis.x = temp.pos.x;
                $vo.dis.y = temp.pos.y;
                $vo.dis.z = temp.pos.z;
            }
            if (temp.scale) {
                $vo.dis.scaleX = temp.scale.x;
                $vo.dis.scaleY = temp.scale.y;
                $vo.dis.scaleZ = temp.scale.z;
            }
            if (temp.rotation) {
                $vo.dis.rotationX = temp.rotation.x;
                $vo.dis.rotationY = temp.rotation.y;
                $vo.dis.rotationZ = temp.rotation.z;
            }
            MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);

            $vo.ossListFile.name = temp.name;
            $vo.ossListFile.url = temp.url;
            $vo.ossListFile.type = HierarchyNodeType.Prefab;
            $vo.ossListFile.treeSelect = false;
            $vo.cellPos = new Vector2D();

            this.showTemp($vo);

            EditorModel.getInstance().fileItem.push($vo);
            this.isCompelet = true;
            this.refrishFolder();
            this.resize()

        }
        private makeModelSprite(dis: ModelSprite, prefab: pack.PrefabStaticMesh): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + prefab.objsurl, LoadManager.XML_TYPE,
                ($modelxml: string) => {
                    dis.readTxtToModel($modelxml);
                });
            pack.PackMaterialManager.getInstance().getMaterialByUrl(prefab.textureurl, ($materialTree: materialui.MaterialTree) => {
                dis.material = $materialTree;
            })

         
        }


        public clearSceneAll(): void {
            this.moveListTy =0
            while (EditorModel.getInstance().fileItem.length) {
                this.deleFile(EditorModel.getInstance().fileItem, EditorModel.getInstance().fileItem[0])
            }
        }
        private _sceneProjectVo: SceneProjectVo
        public readMapFile(mapUrl: string): void {
            AppData.mapOpenUrl = mapUrl
            localStorage.setItem("mapurl", mapUrl);
            this.clearSceneAll()

            LoadManager.getInstance().load(Scene_data.fileRoot + mapUrl, LoadManager.BYTE_TYPE,
                ($dtstr: ArrayBuffer) => {
                    var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray($dtstr);
                    var $fileObj: any = JSON.parse($byte.readUTF());
                    this._sceneProjectVo = new SceneProjectVo($fileObj)
                    var $item: Array<FolderMeshVo> = this.wirteItem($fileObj.list)
                    for (var i: number = 0; i < $item.length; i++) {
                        EditorModel.getInstance().fileItem.push($item[i]);
                    }

                    this.isCompelet = true;
                    this.refrishFolder();
                    this.resize();



                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_SCENE_POJECT_MESH_VIEW), this._sceneProjectVo)

                 //  this.addTempRole();

                  //  this.addBasrole()

                });


        }
        private addBasrole(): void {
   
            let webmd5Sprite = new md5list.Md5MoveSprite();

            webmd5Sprite.setMd5url("2/body.md5mesh", "2/stand.md5anim", "white.jpg")

            MainEditorProcessor.edItorSceneManager.addSpriteDisplay(webmd5Sprite);

            console.log(webmd5Sprite)
        }
       
    

        public selectModelEvet(tempItem: Array<FolderMeshVo>, isshift: boolean = false): void {

            if (tempItem.length) {
                this.hidefileItemBg(EditorModel.getInstance().fileItem);
                EditorModel.getInstance().addSelctItem(tempItem, isshift);

                this.showXyzMove()
                this.refrishFolder();
                this.resize()
            }
        }
        //  public mapOpenUrl: string
        public saveMap(): void {
            // EditorModel.getInstance().fileItem=[]

            //  var tempObj: any = { list: this.getWillSaveItem(EditorModel.getInstance().fileItem) };

            var tempObj: any = this._sceneProjectVo.getSaveObj()
            tempObj.list = this.getWillSaveItem(EditorModel.getInstance().fileItem);
            tempObj.version = pack.FileOssModel.version;



            var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray();
            var $fileUrl: string = Pan3d.Scene_data.fileRoot + AppData.mapOpenUrl;
            $byte.writeUTF(JSON.stringify(tempObj))

            var $file: File = new File([$byte.buffer], "scene.map");
            var pathurl: string = $fileUrl.replace(Pan3d.Scene_data.ossRoot, "");

            pack.FileOssModel.upOssFile($file, pathurl, () => {

                console.log("上传完成")

            })


        }
        private getWillSaveItem(item: Array<FolderMeshVo>): Array<any> {
            var $arr: Array<any> = []
            for (var i: number = 0; i < item.length; i++) {
                var $obj: any = {};
                $obj.type = item[i].ossListFile.type
                $obj.name = item[i].ossListFile.name
                $obj.url = item[i].ossListFile.url
                $obj.x = item[i].dis.x
                $obj.y = item[i].dis.y
                $obj.z = item[i].dis.z
                $obj.scaleX = item[i].dis.scaleX
                $obj.scaleY = item[i].dis.scaleY
                $obj.scaleZ = item[i].dis.scaleZ
                $obj.rotationX = item[i].dis.rotationX
                $obj.rotationY = item[i].dis.rotationY
                $obj.rotationZ = item[i].dis.rotationZ

                $obj.data = item[i].ossListFile.name
                if (item[i].childItem) {
                    $obj.childItem = this.getWillSaveItem(item[i].childItem)
                }
                $arr.push($obj)
            }
            if ($arr.length) {
                return $arr
            } else {
                return null
            }



        }
        protected changeScrollBar(): void {
            super.changeScrollBar()

            this.refrishFolder()
        }
        public resize(): void {
            if (this.isCompelet) {
                this.contentHeight = this.getItemDisNum(EditorModel.getInstance().fileItem) * 20;

            }
            super.resize()

            for (var i: number = 0; i < this.cellBgItem.length; i++) {
                this.cellBgItem[i].width = this.pageRect.width-20

            }

        }

        private refrishFolder(): void {
            if (this.isCompelet) {

                this.listTy = 0 + this.moveListTy 
                this.disChiendren(EditorModel.getInstance().fileItem, 10);
                var moveTy: number = this._uiMask.y
                this.moveAllTy(EditorModel.getInstance().fileItem, moveTy)

                while (this.cellBgItem.length) {
                    this.removeChild(this.cellBgItem.pop());
                }
                 this.showSelectBg(EditorModel.getInstance().fileItem)
            }


        }
        private cellBgItem: Array<UICompenent> = []
        private showSelectBg(arr: Array<FolderMeshVo>): void {

            for (var i: number = 0; arr && i < arr.length; i++) {
                if (arr[i].ossListFile.isOpen) {
                    this.showSelectBg(arr[i].childItem)
                }
                if (arr[i].ossListFile.treeSelect) {
                    var ui: UICompenent = <UICompenent>this.addChild(this._baseMidRender.getComponent("e_select_cell_bg"));
                    ui.y = arr[i].cellPos.y;
                    ui.x = 1
                    ui.width = this.pageRect.width-2
                    ui.height = 20

                    this.cellBgItem.push(ui);
                }

            }
          //  this._baseMidRender.applyObjData()

        }
        private moveAllTy(arr: Array<FolderMeshVo>, ty: number = 0): void {
            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].cellPos.y += ty;

                if (arr[i].ossListFile.isOpen) {
                    this.moveAllTy(arr[i].childItem, ty)
                }
            }

        }
        //获取显示数量
        private getItemDisNum(arr: Array<FolderMeshVo>): number {
            var num: number = 0
            for (var i: number = 0; arr && i < arr.length; i++) {
                num++
                if (arr[i].ossListFile.isOpen) {
                    num += this.getItemDisNum(arr[i].childItem)
                }
            }
            return num
        }
        private listTy: number
        private disChiendren(arr: Array<FolderMeshVo>, tx: number = 0): void {
            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].cellPos.x = tx;
                arr[i].cellPos.y = this.listTy
                arr[i].uiScale = 0.5;
                this.listTy += 20;
                if (arr[i].ossListFile.isOpen) {
                    this.disChiendren(arr[i].childItem, tx + 20)
                }
            }

        }



    }
}