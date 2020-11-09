module materialui {

    import BaseEvent = Pan3d.BaseEvent;
    import Vector2D = Pan3d.Vector2D;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import UIManager = Pan3d.UIManager;
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import KeyboardType = Pan3d.KeyboardType;
    import Scene_data = Pan3d.Scene_data;
    import MouseType = Pan3d.MouseType;
    import UICompenent = Pan3d.UICompenent;
    import UIConatiner = Pan3d.UIConatiner;
    import Rectangle = Pan3d.Rectangle
    import UIAtlas = Pan3d.UIAtlas;

    import Panel = win.Panel
    import LayerManager = win.LayerManager

    export class MaterialEvent extends BaseEvent {
        public static INIT_MATERIA_PANEL: string = "INIT_MATERIA_PANEL"; //
        public static SHOW_MATERIA_PANEL: string = "SHOW_MATERIA_PANEL"; //
 
        public static SAVE_MATERIA_PANEL: string = "SAVE_MATERIA_PANEL"; //
        public static SELECT_MATERIAL_NODE_UI: string = "SELECT_MATERIAL_NODE_UI"; //
        public static COMPILE_MATERIAL: string = "COMPILE_MATERIAL"; //
 
        public static INUPT_NEW_MATERIAL_FILE: string = "CLEAR_MATERIAL_ALL_UI"; //
  
 
 

    }
    export class MaterialModule extends Module {
        public getModuleName(): string {
            return "MaterialModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MaterialProcessor()];
        }
    }

    export class MaterialProcessor extends BaseProcessor {
        public getName(): string {
            return "MaterialProcessor";
        }
        private baseWindow: win.BaseWindow;
        private lastMaterialUrl: string;

        public constructor() {
            super();
    
        }

 
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MaterialEvent) {
                var $materialEvent: MaterialEvent = <MaterialEvent>$event;
                if ($materialEvent.type == MaterialEvent.INIT_MATERIA_PANEL) {
            

                    MaterialModel.getInstance().makePanle();
                    AppData.stagePos = new Vector2D();
                    BaseMaterialNodeUI.baseUIAtlas = new UIAtlas();
                    BaseMaterialNodeUI.baseUIAtlas.setInfo("pan/marmoset/uilist/baseui.txt", "pan/marmoset/uilist/baseui.png", () => { this.loadConfigCom() });

                   // this.baseWindow = new win.BaseWindow()
                }
                if ($materialEvent.type == MaterialEvent.SHOW_MATERIA_PANEL) {
                    this.lastMaterialUrl = $materialEvent.data

                   // AppData.centenPanel.addUIContainer(this.baseWindow)
                    LayerManager.getInstance().addPanel(MaterialCtrl.getInstance().bgwinPanel, 1)
                    LayerManager.getInstance().addPanel(MaterialCtrl.getInstance().nodeUiPanel, 2)
                    LayerManager.getInstance().addPanel(MaterialCtrl.getInstance().linePanel, 3);
                    editscene.EditTopMenuPanel.getInstance().makeTextureTopMenu();

                    ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA))
                    ModuleEventManager.dispatchEvent(new materialleft.MaterialLeftEvent(materialleft.MaterialLeftEvent.SHOW_MATERIAL_LEFT_PANEL));
            

                    MaterialModel.getInstance().selectMaterialUrl(this.lastMaterialUrl)
                  
           

                    this.addEvents()
               
                }
                
                if ($materialEvent.type == MaterialEvent.SAVE_MATERIA_PANEL) {
                    this.saveMateriaPanel()
                }

                if ($materialEvent.type == MaterialEvent.SELECT_MATERIAL_NODE_UI) {
                    this.selectNodeUi($materialEvent.data)
                }
                if ($materialEvent.type == MaterialEvent.COMPILE_MATERIAL) {
                    MaterialCompile.getInstance().compile(MaterialCtrl.getInstance().nodeList, this.baseMaterialTree)

                    this.changeLeftMeshView()

                
                }
                if ($materialEvent.type == MaterialEvent.INUPT_NEW_MATERIAL_FILE) {
                    this.clearAllMaterialUi($materialEvent.data);
                }


            }
            if ($event instanceof MEvent_Material_Connect) {

                var $mevent_Material_Connect: MEvent_Material_Connect = <MEvent_Material_Connect>$event;
                if ($mevent_Material_Connect.type == MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_STARTDRAG) {
                    this.startDragLine($mevent_Material_Connect.itemNode);
                }
                if ($mevent_Material_Connect.type == MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_STOPDRAG) {
                    this.stopDragLine($mevent_Material_Connect.itemNode);
                }
                if ($mevent_Material_Connect.type == MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_REMOVELINE) {
                    this.removeLine($mevent_Material_Connect.line);
                }
                if ($mevent_Material_Connect.type == MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_DOUBLUELINE) {

                    this.setConnetLine($mevent_Material_Connect.startNode, $mevent_Material_Connect.endNode);
                }


            }


        }
        private changeLeftMeshView(): void {

            this._materialTree = new MaterialTree()
            this._materialTree.data = MaterialCtrl.getInstance().getObj()
            this._materialTree.url = this.lastMaterialUrl
            MaterialModel.getInstance().MakeTempWebMaterialTree(this._materialTree, this.getMakeProgemePrame())
           

    
        }
        private onMouseWheelFun: any;
        private onMouseFun: any;
        private onMouseMoveFun: any;
        private onMouseUpFun: any;
        private onKeyDownFun: any;
        private onKeyUpFun: any;
        private onRightMenuFun: any;

        private get hasStage(): boolean { //false为可以操作
            return AppData.sceneEidtType == 2;
         
        }

        private addEvents(): void {

            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) };
                this.onMouseFun = ($evt: MouseEvent) => { this.onMouse($evt) };
                this.onMouseMoveFun = ($evt: MouseEvent) => { this.onMouseMove($evt) };
                this.onMouseUpFun = ($evt: MouseEvent) => { this.onMouseUp($evt) };
                this.onKeyDownFun = ($evt: KeyboardEvent) => { this.onKeyDown($evt) };
                this.onKeyUpFun = ($evt: KeyboardEvent) => { this.onKeyUp($evt) };
                this.onRightMenuFun = ($evt: MouseEvent) => { this.onRightMenu($evt) };
            }
  

            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.addEventListener(MouseType.MouseDown, this.onMouseFun );
            document.addEventListener(MouseType.MouseMove, this.onMouseMoveFun );
            document.addEventListener(MouseType.MouseUp, this.onMouseUpFun );
            document.addEventListener(MouseType.KeyDown, this.onKeyDownFun )
            document.addEventListener(MouseType.KeyUp, this.onKeyUpFun)
            document.addEventListener("contextmenu", this.onRightMenuFun)
   
 
        }
        public onRightMenu($evt: MouseEvent): void {
           
            $evt.preventDefault();

          

            if (!this.hasStage) {
                return
            }

            if (!AppData.centenPanel.rect.isHitByPoint($evt.x, $evt.y)) {
                return;
            }


            MaterialModel.getInstance().mekeMaterialRightMenu($evt);
            /*

            var $rightMenuEvet: rightmenu.RightMenuEvent = new rightmenu.RightMenuEvent(rightmenu.RightMenuEvent.SHOW_RIGHT_MENU);
            $rightMenuEvet.posv2d = new Vector2D($evt.clientX, $evt.clientY);
            ModuleEventManager.dispatchEvent($rightMenuEvet);

            */
        }
        private removeEvents(): void {
            document.removeEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.removeEventListener(MouseType.MouseDown, this.onMouseFun);
            document.removeEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.removeEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.removeEventListener(MouseType.KeyDown, this.onKeyDownFun)
            document.removeEventListener(MouseType.KeyUp, this.onKeyUpFun)
        }

        private clearAllMaterialUi($materailTree: MaterialTree): void {
            var $containerList: Array<UIConatiner> = MaterialCtrl.getInstance().nodeUiPanel._containerList

            var $len: number = $containerList.length
            for (var i: number = ($len - 1); i >= 0; i--) {
                var $temp: BaseMaterialNodeUI = <BaseMaterialNodeUI>$containerList[i]
                if ($temp.name) {
                    this.delUI($temp);
                }
            }

            this.stageMoveTx(new Vector2D(-AppData.stagePos.x, - AppData.stagePos.y))
            MtlUiData.Scale = 1;

            MaterialCtrl.getInstance().initData();
            this.baseMaterialTree = $materailTree;
            MaterialViewBuildUtils.getInstance().setData($materailTree.data);
            this.resetMaterialListUi()
            left.ModelShowModel.getInstance().modelSprite.material = $materailTree
        }
        private resetMaterialListUi(): void {

            var $containerList: Array<UIConatiner> = MaterialCtrl.getInstance().nodeUiPanel._containerList
            var $len: number = $containerList.length
            var $rect: Rectangle
            for (var i: number = 0; i < $len; i++) {
                var $ui: BaseMaterialNodeUI = <BaseMaterialNodeUI>$containerList[i]
                if ($ui.name) {
                    var temp: Rectangle = new Rectangle($ui.x, $ui.y, $ui.x + $ui.width, $ui.y + $ui.height)
                    if ($rect) {
                        $rect.x = Math.min($rect.x, temp.x)
                        $rect.y = Math.min($rect.y, temp.y)
                        $rect.width = Math.max($rect.width, temp.x)
                        $rect.height = Math.max($rect.height, temp.y)
                    } else {
                        $rect = new Rectangle(temp.x, temp.y, temp.x, temp.y)
                    }
                }
            }
            if ($rect) {
                var pageRect: Rectangle = new Rectangle()
                pageRect.x = AppData.centenPanel.rect.x;
                pageRect.y = AppData.centenPanel.rect.y+15;
                pageRect.width = AppData.centenPanel.rect.width;
                pageRect.height = AppData.centenPanel.rect.height-40;

                $rect.width = ($rect.width - $rect.x)+180
                $rect.height = ($rect.height - $rect.y)+200
                //重新载入的材质适配到可显示位置
 

                var scaleNum: number = (Math.min(pageRect.width / $rect.width, pageRect.height / $rect.height))
                scaleNum = Math.min(scaleNum, 0.8)
                scaleNum = Math.max(scaleNum, 0.5)
                MtlUiData.Scale = scaleNum;

 

                var tureXY: Vector2D = new Vector2D();
                tureXY.x = -$rect.x + pageRect.x / MtlUiData.Scale;
                tureXY.y = -$rect.y + pageRect.y / MtlUiData.Scale;


                tureXY.x += (pageRect.width / MtlUiData.Scale - $rect.width) / 2
                tureXY.y += (pageRect.height / MtlUiData.Scale - $rect.height) / 2

             
      
                this.stageMoveTx(tureXY)
      
            }
        }


        private _materialTree: MaterialTree;
        private saveMateriaPanel(): void {
           
            this._materialTree = new MaterialTree()
            this._materialTree.data = MaterialCtrl.getInstance().getObj()
         
            console.log(this.baseMaterialTree);

            if (this.baseMaterialTree.shaderStr) {
                MaterialModel.getInstance().upMaterialTreeToWeb(this._materialTree, this.getMakeProgemePrame(), this.lastMaterialUrl)
            } else {
                alert("选编译才能保存上传")
            }
 

        }
        private getMakeProgemePrame(): any { //获取着色器参数
            var obj: any = {};
            obj.useNormal = this.baseMaterialTree.useNormal
            obj.hasTime = this.baseMaterialTree.hasTime
            obj.timeValue = this.baseMaterialTree.timeValue
            obj.writeZbuffer = this.baseMaterialTree.writeZbuffer
            obj.zbuff = this.baseMaterialTree.zbuff
            obj.blendMode = this.baseMaterialTree.blendMode
            obj.showurl = this.baseMaterialTree.showurl
            obj.backCull = this.baseMaterialTree.backCull

            obj.texList = this.baseMaterialTree.texList
            obj.constList = this.baseMaterialTree.constList
            obj.shaderStr = this.baseMaterialTree.shaderStr
            obj.laterTextureurl = this.baseMaterialTree.laterTextureurl;
 
            obj.fcData = this.baseMaterialTree.fcData.toString()
            obj.paramAry = this.baseMaterialTree.shader.paramAry;
            
 
            return obj
        }

        private selectNodeUi($nodeUi: BaseMaterialNodeUI): void {
            var $containerList: Array<UIConatiner> = MaterialCtrl.getInstance().nodeUiPanel._containerList

            for (var i: number = 0; i < $containerList.length; i++) {
                var $temp: BaseMaterialNodeUI = <BaseMaterialNodeUI>$containerList[i]
                if ($temp) {
                    $temp.select = Boolean($nodeUi == $temp);
                }

            }
        }
        public setConnetLine($startItem: ItemMaterialUI, $endItem: ItemMaterialUI): void {
            MaterialCtrl.getInstance().lineContainer.addConnentLine($startItem, $endItem);
        }
        public removeLine($line: MaterialNodeLineUI): void {
            MaterialCtrl.getInstance().lineContainer.removeLine($line);
        }
        public startDragLine($node: ItemMaterialUI): void {
            MaterialCtrl.getInstance().lineContainer.startLine($node);
        }

        public stopDragLine($node: ItemMaterialUI): void {
            MaterialCtrl.getInstance().lineContainer.stopLine($node);
        }



        private openMaterialPanel(): void {

        }



        private loadConfigCom(): void {

            this.readMaterialTree()

        }
        private baseMaterialTree: MaterialTree
        private readMaterialTree(): void {
            MaterialViewBuildUtils.getInstance().addFun = (ui: BaseMaterialNodeUI) => { MaterialCtrl.getInstance().addNodeUI(ui) };
            var id: number = Number(getUrlParam("id"));
        }

        public onKeyDown($evt: KeyboardEvent): void {
            if (!this.hasStage) {
                return
            }
            AppData.altKey = $evt.altKey
            switch ($evt.keyCode) {
        
                case KeyboardType.Delete:
                    var $selectUi: BaseMaterialNodeUI = this.getSelUI();
                    if ($selectUi) {
                        if (!($selectUi instanceof ResultNodeUI)) {
                            this.delUI($selectUi);
                        }
                    }
                    break
                case KeyboardType.S:
                    if ($evt.altKey) {
                      

                    }
                    break
                case KeyboardType.C:
                    if ($evt.altKey) {
           
                    } else {
                        var $selectUi: BaseMaterialNodeUI = this.getSelUI();
                        if ($selectUi) {
                            $selectUi.nodeTree.paramName = this.getCanUseParamName()
                            switch ($selectUi.nodeTree.type) {
                                case NodeTree.TEX:
                                case NodeTree.TEX3D:
                                case NodeTree.TEXCUBE:
                                case NodeTree.VEC3:
                                case NodeTree.VEC2:
                                case NodeTree.FLOAT:
                                    if ($selectUi.nodeTree.type) {
                                        $selectUi.nodeTree.isDynamic = !$selectUi.nodeTree.isDynamic;
                                        $selectUi.showDynamic();
                                    }
                                    break
                                default:
                                    console.log("不可以设置为动态")
                                    break
                            }

                     
                        }
                    }
                    break
                case KeyboardType.O:
                    //ModuleEventManager.dispatchEvent(new left.LeftEvent(left.LeftEvent.SHOW_LEFT_PANEL));

                    break
                case KeyboardType.Z:

                    MtlUiData.Scale += 0.1
                    UIManager.getInstance().resize();

                    break
                default:
                    break
            }

        }
        private delUI($ui: BaseMaterialNodeUI): void {

            MaterialCtrl.getInstance().removeUI($ui)
            $ui.removeAllNodeLine();

            MaterialCtrl.getInstance().nodeUiPanel.removeUIContainer($ui)

        }
        private getCanUseParamName(): string
        {
            var tempItem: Array<string>=[]
            var $containerList: Array<UIConatiner> = MaterialCtrl.getInstance().nodeUiPanel._containerList
            for (var i: number = 0; i < $containerList.length; i++) {
                var $temp: BaseMaterialNodeUI = <BaseMaterialNodeUI>$containerList[i]
                if ($temp && $temp.nodeTree.isDynamic) {
                    tempItem.push($temp.nodeTree.paramName)
                }
            }
            return "param" + tempItem.length;
        }

        private getSelUI(): BaseMaterialNodeUI {
            var $containerList: Array<UIConatiner> = MaterialCtrl.getInstance().nodeUiPanel._containerList
            for (var i: number = 0; i < $containerList.length; i++) {
                var $temp: BaseMaterialNodeUI = <BaseMaterialNodeUI>$containerList[i]
                if ($temp && $temp.select) {
                    return $temp
                }
            }
            return null;
        }

        public onKeyUp($evt: KeyboardEvent): void {
            AppData.altKey = $evt.altKey
        }
        private _isMidelMouse: boolean
        private onMouse($e: MouseEvent): void {
            if (!this.hasStage) {
                return
            }
            if ($e.type == MouseType.MouseDown) {
                if ($e.button == 1) {
                    this._isMidelMouse = true
                    this.mouseXY = new Vector2D($e.x, $e.y)
                }
            }


        }
        private onMouseMove($e: MouseEvent): void {
            if (!this.hasStage) {
                return
            }
            if (this._isMidelMouse) {
                var $txy: Vector2D = new Vector2D($e.x - this.mouseXY.x, $e.y - this.mouseXY.y)
                $txy.x /= MtlUiData.Scale;
                $txy.y /= MtlUiData.Scale;

                this.stageMoveTx($txy)
                this.mouseXY = new Vector2D($e.x, $e.y);
            }

        }
        private onMouseUp($e: MouseEvent): void {
            if (!this.hasStage) {
                return
            }
            this._isMidelMouse = false
        }
        private mouseXY: Vector2D;
        public onMouseWheel($evt: MouseWheelEvent): void {
            if (!this.hasStage) {
                return
            }

            if ($evt.x > AppData.centenPanel.x && $evt.x < AppData.rightPanel.x) {
                var $slectUi: UICompenent = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
                if (!$slectUi || $slectUi.parent instanceof BaseMaterialNodeUI || $slectUi.parent instanceof MaterialCavasPanel) {
                    this.changeScalePanle($evt)
                } 
            }


        }
        private changeScalePanle($evt: MouseWheelEvent): void {

            var $v2d: Vector2D = new Vector2D(($evt.x - AppData.stagePos.x), ($evt.y - AppData.stagePos.y))
            var tx: number = $evt.x / MtlUiData.Scale
            var ty: number = $evt.y / MtlUiData.Scale
            var $oldScale: number = MtlUiData.Scale

            var $addScale: number = $evt.wheelDelta > 0 ? +0.1 : -0.1;
            MtlUiData.Scale += $addScale;

            MtlUiData.Scale = Math.max(0.5, MtlUiData.Scale);
            MtlUiData.Scale = Math.min(MtlUiData.Scale, 1.2);

            var $se: number = (MtlUiData.Scale - $oldScale);
            this.stageMoveTx(new Vector2D(-tx * $se / MtlUiData.Scale, -ty * $se / MtlUiData.Scale))
        }


        private stageMoveTx($txy: Vector2D): void {
            AppData.stagePos.x += $txy.x;
            AppData.stagePos.y += $txy.y;

            var $containerList: Array<UIConatiner> = MaterialCtrl.getInstance().nodeUiPanel._containerList
            for (var i: number = 0; i < $containerList.length; i++) {
                var $uiConatiner: UIConatiner = $containerList[i];
                if ($uiConatiner instanceof BaseMaterialNodeUI) {
                    $uiConatiner.left += $txy.x;
                    $uiConatiner.top += $txy.y;
                    $uiConatiner.uiScale = MtlUiData.Scale;
                }

            }
            win.LayerManager.getInstance().resize()

        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MaterialEvent(MaterialEvent.INIT_MATERIA_PANEL),
                new MaterialEvent(MaterialEvent.SHOW_MATERIA_PANEL),
                new MaterialEvent(MaterialEvent.SELECT_MATERIAL_NODE_UI),
                new MaterialEvent(MaterialEvent.SAVE_MATERIA_PANEL),
                new MaterialEvent(MaterialEvent.COMPILE_MATERIAL),
                new MaterialEvent(MaterialEvent.INUPT_NEW_MATERIAL_FILE),
                new MEvent_Material_Connect(MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_STARTDRAG),
                new MEvent_Material_Connect(MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_STOPDRAG),
                new MEvent_Material_Connect(MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_REMOVELINE),
                new MEvent_Material_Connect(MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_DOUBLUELINE),

            ];
        }
    }
}