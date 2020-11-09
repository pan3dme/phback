module materialui {
    import UIRenderComponent = Pan3d.UIRenderComponent
    import FrameCompenent = Pan3d.FrameCompenent
    import Rectangle = Pan3d.Rectangle
    import LabelTextFont = Pan3d.LabelTextFont
    import UIManager = Pan3d.UIManager
    import TextAlign = Pan3d.TextAlign
    import UIPanel = win.UIPanel
    export class PanelContainer  {

        private uiRender: UIRenderComponent
        private labelRender: UIRenderComponent
        private panel: UIPanel
        public constructor($panel: UIPanel, $label: UIRenderComponent, $render: UIRenderComponent) {

            this.panel = $panel;
            this.labelRender = $label;
            this.uiRender = $render;

            if (!PanelContainer.strItem) {
                PanelContainer.strItem = new Array()
                //PanelContainer.strItem.push("out")
                //PanelContainer.strItem.push("rgb")
                //PanelContainer.strItem.push("r")
                //PanelContainer.strItem.push("g")
                //PanelContainer.strItem.push("b")
                //PanelContainer.strItem.push("a")
                //PanelContainer.strItem.push("rgba")
                //PanelContainer.strItem.push("UV")
                //PanelContainer.strItem.push("xy")
                //PanelContainer.strItem.push("alpha")
                //PanelContainer.strItem.push("coordinate")
                //PanelContainer.strItem.push("speed")
            }
     

        }
        public removeChild($ui: ItemMaterialUI): void
        {
            this.panel.removeChild($ui.pointframe);
            this.panel.removeChild($ui.labelframe);
            $ui.pointframe = null
            $ui.labelframe = null
            $ui.parent=null
        }
        public addChild($ui: ItemMaterialUI): void
        {
            if (!$ui.pointframe) {
                $ui.pointframe = this.panel.addEvntBut("a_point_frame", this.uiRender);
                $ui.labelframe = this.panel.addEvntBut("a_label_txt", this.labelRender);
                $ui.labelframe.width = $ui.labelframe.baseRec.width * 0.5
                $ui.labelframe.height = $ui.labelframe.baseRec.height * 0.5
                $ui.pointframe.data = $ui
            }
 
            var $labelKey = $ui.titleLabeltext
            var $textAlignStr: string 
            if ($ui.inOut) {
                $labelKey += "_left";
                $textAlignStr = TextAlign.LEFT;
            } else {
                $labelKey += "_right";
                $textAlignStr = TextAlign.RIGHT;
            }
            var $num: number = PanelContainer.strItem.indexOf($labelKey);
            if ($num == -1) {
                PanelContainer.strItem.push($labelKey)
                $num = PanelContainer.strItem.indexOf($labelKey);
                $ui.labelframe.goToAndStop($num)
                this.drawTextToName($ui.labelframe, $ui.titleLabeltext, $textAlignStr );
            }
            $ui.labelframe.goToAndStop($num)

  
            $ui.drawSp();


        }
        private static strItem: Array<string>

        private drawTextToName($ui: FrameCompenent, $str: string, isAlign: string): void {

            var $toRect: Rectangle = $ui.getSkinCtxRect()
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
 
            LabelTextFont.writeSingleLabelToCtx($ctx, $str, 24, 0, 5, isAlign);
            $ui.drawToCtx(BaseMaterialNodeUI.baseUIAtlas, $ctx)

        }
      
        
    }
}