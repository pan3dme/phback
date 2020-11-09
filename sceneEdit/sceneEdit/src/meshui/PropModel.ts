module prop {
    import UIConatiner = Pan3d.UIConatiner

 
    export class PropModel {

        private static _instance: PropModel;
        public static getInstance(): PropModel {
            if (!this._instance) {
                this._instance = new PropModel();
            }
            return this._instance;
        }
        public resize(): void {
            if (this.metaDataView) {
 
                this.metaDataView.width = Pan3d.Scene_data.stageWidth - this.propPanle.x;
            }

        }
        public constructor() {
            this.propPanle = new UiMeshSprite();
            this.propPanle.x = 500
            this.propPanle.y = 100;
            AppData.rightPanel.addChild(this.propPanle)

        }
        public propPanle: UiMeshSprite;
        private metaDataView: MetaDataView;
        private lastNodel: materialui.BaseMaterialNodeUI;
        public hidePanel(): void {
            if (this.metaDataView) {
                this.metaDataView.destory()
                this.metaDataView = null;
            }
            this.lastNodel = null
        }
        public showTextureUiPanel($ui: materialui.BaseMaterialNodeUI): void {
            if (this.lastNodel != $ui) {
                var propPanle: prop.UiMeshSprite = prop.PropModel.getInstance().propPanle
                var tempView: MetaDataView
                if ($ui instanceof materialui.ConstVec3NodeUI) {
                    tempView= new Vec3PropMeshPanel(propPanle);
                } else if ($ui instanceof materialui.ConstVec2NodeUI) {
                    tempView= new Vec2PropMeshPanel(propPanle);
                } else if ($ui instanceof materialui.ConstFloatNodeUI) {
                    tempView = new FloatPropMeshPanel(propPanle);
                } else if ($ui instanceof materialui.TimeNodeUI) {
                    tempView = new NodeTimePropPanel(propPanle);
                } else if ($ui instanceof materialui.PannerNodeUI) {
                    tempView= new PannerPropPanel(propPanle);
                } else if ($ui instanceof materialui.TextureSampleNodeUI) {
                    tempView= new TexturePropMeshPanel(propPanle);
                } else if ($ui instanceof materialui.Texture3DNodeUI) {
                    tempView= new Texture3DMeshPanel(propPanle);
                } else if ($ui instanceof materialui.TextureCubeNodeUI) {
                    tempView = new TextureCubeMeshPanel(propPanle);
                } else if ($ui instanceof materialui.ResultNodeUI) {
                    tempView = new OpPropMeshPanel(propPanle);
                } else if ($ui instanceof materialui.MathFunNodeUI) {
                    tempView = new MathFunMeshPanel(propPanle);
                } else {
                    tempView= new SciencePropMeshPanel(propPanle)
                }
                this.lastNodel = $ui;
                tempView.data = $ui;
                tempView.type = "材质";
                this.showOtherMeshView(tempView);

              
            }
        }
        private clearOladMeshView(): void {
            if (this.metaDataView) {
                this.metaDataView.destory();
                this.metaDataView = null;
                this.lastNodel = null;
            }
        }
        public showOtherMeshView(value: MetaDataView): void {
            if (this.metaDataView != value) {
                this.clearOladMeshView()
            }
            this.metaDataView = value;
            this.metaDataView.top=25
            this.metaDataView.refreshViewValue();
            this.resize();

            let rightPanel = <editscene.MainRightPanel>AppData.rightPanel;
            rightPanel.mainRightBaseWin.pushViewToTab(this.metaDataView );

        }
      
    }
}