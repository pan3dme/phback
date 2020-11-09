module prop {
    import UICompenent = Pan3d.UICompenent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import LabelTextFont = Pan3d.LabelTextFont
    import TextAlign = Pan3d.TextAlign

    export class ComboBoxUi extends TextLabelUI {


        public constructor(w: number = 128, h: number = 30) {
            super(w, h);
        }
        protected initView(): void {
            this.ui.addEventListener(InteractiveEvent.Down, this.butClik, this);
        }
 
        public destory(): void {
    
            this.ui.removeEventListener(InteractiveEvent.Down, this.butClik, this);
            super.destory()
        }
        public set text(value: string) {
            LabelTextFont.writeSingleLabel(this.ui.uiRender.uiAtlas, this.ui.skinName, value, 26, TextAlign.LEFT, "#ffffff", "#27262e");
 
        }
        protected butClik(evt: InteractiveEvent): void {
            this.dispatchEvent(evt);
        }

       


    }
}