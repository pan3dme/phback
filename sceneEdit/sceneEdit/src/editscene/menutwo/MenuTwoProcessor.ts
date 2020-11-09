module menutwo {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import Vector2D = Pan3d.Vector2D;
    import UIManager = Pan3d.UIManager;
    import UIData = Pan3d.UIData;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Scene_data = Pan3d.Scene_data;
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import UIAtlas = Pan3d.UIAtlas
    import UIConatiner = Pan3d.UIConatiner

    import UIPanel = win.UIPanel
    import Panel = win.Panel

    export class MenuTwoEvent extends BaseEvent {
        public static SHOW_RIGHT_MENU: string = "SHOW_RIGHT_MENU"; 
        public static SHOW_COMBOX_MENU: string = "SHOW_COMBOX_MENU"; 
        public posv2d: Vector2D;
        public comboxData: Array<any>;
        public comboxFun: Function
    }
    export class MenuTwoModule extends Module {
        public getModuleName(): string {
            return "MenuTwoModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MenuTwoProcessor()];
        }
    }

    export class MenuTwoProcessor extends BaseProcessor {
        public getName(): string {
            return "MenuTwoProcessor";
        }
        private _MenuTwoPanel: MenuTwoPanel
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MenuTwoEvent) {
                var $materialEvent: MenuTwoEvent = <MenuTwoEvent>$event;
               
                if ($materialEvent.type == MenuTwoEvent.SHOW_RIGHT_MENU) {
 
                    this.showMenuPanel($materialEvent.data);
                }

                if ($materialEvent.type == MenuTwoEvent.SHOW_COMBOX_MENU) {
                    console.log("有键菜单")

                    this.showComboBoxMenuPanel($materialEvent);
                }

              
            }
        }
        private _comboBoxMenuPanel: ComboTwoBoxMenu
        private showComboBoxMenuPanel(evt: MenuTwoEvent): void {
            if (!this._comboBoxMenuPanel) {
                this._comboBoxMenuPanel = new ComboTwoBoxMenu()
            }
            var posv2d: Vector2D = evt.posv2d;
            console.log("posv2d", posv2d)
            this._comboBoxMenuPanel.left = posv2d.x 
            this._comboBoxMenuPanel.top = posv2d.y  
            this._comboBoxMenuPanel.showComboBoxList(evt.comboxData, evt.comboxFun)
            this.addUIContainer(this._comboBoxMenuPanel);

        }
 
        private showMenuPanel(value: any): void {
            if (!this._MenuTwoPanel) {
                this._MenuTwoPanel = new MenuTwoPanel()
            }
            var posv2d: Vector2D = value.mouse;
            this._MenuTwoPanel.left = posv2d.x / UIData.Scale;
            this._MenuTwoPanel.top = posv2d.y / UIData.Scale;
            this.addUIContainer(this._MenuTwoPanel);
            this._MenuTwoPanel.initMenuData(value)
            this._MenuTwoPanel.showMainUi()
            Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
        }
        private topMenuPanel: Panel;
        private addUIContainer(value: UIConatiner): void {
     
            if (!this.topMenuPanel) {
                this.topMenuPanel = new Panel()
                win.LayerManager.getInstance().addPanel(this.topMenuPanel,200)
            }
            this.topMenuPanel.addUIContainer(value)
        }
        private removeUIContainer(value: UIConatiner): void {
            if (this.topMenuPanel) {
                this.topMenuPanel.removeUIContainer(value)
            }

        }
        public onMouseDown($evt: InteractiveEvent): void {

       
        
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
 
                new MenuTwoEvent(MenuTwoEvent.SHOW_RIGHT_MENU),
                new MenuTwoEvent(MenuTwoEvent.SHOW_COMBOX_MENU),
              
            ];
        }
    }

}