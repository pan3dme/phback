module materialui {
    import ModuleEventManager = Pan3d.ModuleEventManager
    export class MaterialViewBuildUtils {

        private static _instance: MaterialViewBuildUtils;
        public static getInstance(): MaterialViewBuildUtils {
            if (!this._instance) {
                this._instance = new MaterialViewBuildUtils();
            }
            return this._instance;
        }
        public constructor() {

        }
        private _dataAry: Array<any>;
        private _uiVec: Array<BaseMaterialNodeUI>;
        public  addFun: Function;
        public setData(ary: Array<any>): void {
            BaseMaterialNodeUI.titleFrameId = 0;//重置id
            TextureSampleNodeUI.texture_pic_frame_ID = 0;//重置id
           // prop.PropModel.getInstance().hidePanel();//重置属性面板
            this._uiVec = new Array
            var ui: BaseMaterialNodeUI
            if (!ary) {

            } else {
                for (var i: number = 0; i < ary.length; i++) {
                    ui = this.getUI(ary[i].type);
                    ui.setData(ary[i].data);
                    ui.setInItemByData(ary[i].inAry);
                    ui.setOutItemByData(ary[i].outAry);
                    ui.nodeTree.id = ary[i].id;
                    this.addFun(ui);
                    this._uiVec.push(ui);
                }
               this. _dataAry = ary;
               this.drawLine();
            }



        }
  
        public drawLine(): void {
            for (var i: number = 0; i < this._dataAry.length; i++) {
                var inAry: Array<any> = this._dataAry[i].inAry;
                for (var j: number = 0; j < inAry.length; j++) {
                    if (!inAry[j].parentObj) {
                        continue;
                    }
                    var endNode: ItemMaterialUI = this.getUIbyID(this._dataAry[i].id, inAry[j].id, true);
                    var startNode: ItemMaterialUI = this.getUIbyID(inAry[j].parentObj.pid, inAry[j].parentObj.id, false);
                 
                    if (endNode.typets == MaterialItemType.UNDEFINE) {
                        endNode.changeType(startNode.typets);
       
                    }
      
                    var evt: MEvent_Material_Connect = new MEvent_Material_Connect(MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_DOUBLUELINE);
                    evt.startNode = startNode;
                    evt.endNode = endNode;
                    ModuleEventManager.dispatchEvent(evt);
            

                }
            }
        }
        public getUIbyID($pid: number, $id: number, $inout: boolean): ItemMaterialUI{
            var ui: BaseMaterialNodeUI = this.getNodeUI($pid);
            if($inout) {
                return ui.getInItem($id);
            }else{
                return ui.getOutItem($id);
            }
        }
        private getNodeUI($pid: number): BaseMaterialNodeUI {
            for (var i: number=0; i < this._uiVec.length; i++) {
                if (this._uiVec[i].nodeTree.id == $pid) {
                    return this._uiVec[i];
                }
            }
            return null;
        }
        public getUI(type: String): BaseMaterialNodeUI {
            var ui: BaseMaterialNodeUI;
            switch (type) {
                case NodeTree.OP:
                    ui = new ResultNodeUI();
                    break;
                case NodeTree.TEX:
                    ui = new TextureSampleNodeUI();
                    break;
                case NodeTree.TEX3D:
                    ui = new Texture3DNodeUI();
                    break;
                case NodeTree.TEXCUBE:
                    ui = new TextureCubeNodeUI();
                    break;
                case NodeTree.TEXCOORD:
                    ui = new TexCoordNodeUI();
                    break;
                case NodeTree.TEXCOORDLIGHT:
                    ui = new TexLightUvNodeUI();
                    break;
                case NodeTree.PANNER:
                    ui = new PannerNodeUI();
                    break;
                case NodeTree.SUB:
                    ui = new MathAddNodeUI;
                    break;
                case NodeTree.ADD:
                    ui = new MathAddNodeUI;
                    break;
                case NodeTree.MUL:
                    ui = new MathMulNodeUI;
                    break;
                case NodeTree.DIV:
                    ui = new MathDivNodeUI;
                    break;
                case NodeTree.SIN:
                    ui = new MathSinNodeUI;
                    break;
                case NodeTree.COS:
                    ui = new MathCosNodeUI;
                    break;
                case NodeTree.VEC3:
                    ui = new ConstVec3NodeUI;
                    break;
                case NodeTree.VEC2:
                    ui = new ConstVec2NodeUI;
                    break;
                case NodeTree.FLOAT:
                    ui = new ConstFloatNodeUI;
                    break;
                case NodeTree.FRESNEL:
                    ui = new FresnelNodeUI;
                    break;
                case NodeTree.TIME:
                    ui = new TimeNodeUI;
                    break;
                case NodeTree.NORMAL:
                    ui = new NormalNodeUI;
                    break;
                case NodeTree.FUN:
                    ui = new MathFunNodeUI;
                    break;
                    
                default:
                    break;
            }

            return ui;
        }

    }

}