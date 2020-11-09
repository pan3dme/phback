module colorview {
    import BaseEvent = Pan3d.BaseEvent;
    import Vector3D = Pan3d.Vector3D;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import UIManager = Pan3d.UIManager;
    export class ColorEvent extends BaseEvent {
        public static SHOW_COLOR_PANEL: string = "SHOW_COLOR_PANEL";  
        public static HIDE_COLOR_PANEL: string = "HIDE_COLOR_PANEL";  

        public bfun: Function;
        public v3dColor: Vector3D;
    }
    export class ColorModule extends Module {
        public getModuleName(): string {
            return "ColorModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new ColorProcessor()];
        }
    }

    export class ColorProcessor extends BaseProcessor {
        public getName(): string {
            return "ColorProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof ColorEvent) {
                var $colorEvent: ColorEvent = <ColorEvent>$event;

                if ($colorEvent.type == ColorEvent.SHOW_COLOR_PANEL) {
                    this.showColorPanel($colorEvent.v3dColor, $colorEvent.bfun);
                }
                if ($colorEvent.type == ColorEvent.HIDE_COLOR_PANEL) {
                    this.hideColorPanel();
                }
            }
        }

        private hideColorPanel(): void {
            if (this.colorPanel) {
                this.colorWinPanel.removeUIContainer(this.colorPanel);
                this.colorPanel = null;
            }
        }
 
        private showColorPanel($v3d: Vector3D, $bfun: Function): void {

            if (!this.colorWinPanel) {
                this.colorWinPanel = new win.Panel()
                win.LayerManager.getInstance().addPanel(this.colorWinPanel, 500);
            }
            if (!this.colorPanel) {
                this.colorPanel = new ColorPanel;
                this.colorPanel.load(() => {
                    this.colorPanel.initColor($v3d, $bfun);
                })
            }
            this.colorWinPanel.addUIContainer(this.colorPanel);
        }
        private colorWinPanel: win.Panel
 
        private colorPanel: ColorPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new ColorEvent(ColorEvent.SHOW_COLOR_PANEL),
                new ColorEvent(ColorEvent.HIDE_COLOR_PANEL),


            ];
        }
    }
}