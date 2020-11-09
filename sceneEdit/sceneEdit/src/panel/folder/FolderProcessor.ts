module folder {
    import BaseEvent = Pan3d.BaseEvent;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import Vector2D = Pan3d.Vector2D;
    import Rectangle = Pan3d.Rectangle;
    import UIManager = Pan3d.UIManager;
    import UIData = Pan3d.UIData;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Scene_data = Pan3d.Scene_data;
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import UIConatiner = Pan3d.UIConatiner
    import Panel = win.Panel
    import FileListPanel = filelist.FileListPanel
    import BaseFolderWindow = basefolderwin.BaseFolderWindow
    import OssFolderPanel = ossfolder.OssFolderPanel;



    export class FolderEvent extends BaseEvent {
        public static SHOW_FOLDER_PANEL: string = "SHOW_FOLDER_PANEL";
        public static EDITSCENE_RESET_SIZE: string = "EDITSCENE_RESET_SIZE";
        public static RESET_FOLDE_WIN_SIZE: string = "RESET_FOLDE_WIND_SIZE";
        public static LIST_DIS_ALL_FILE: string = "LIST_DIS_ALL_FILE";
        public static LIST_OSS_FOLDER_FILE: string = "LIST_OSS_FOLDER_FILE";

       // public data: any

        public posv2d: Vector2D;
        public comboxData: Array<any>;
        public comboxFun: Function


    }
    export class FolderModule extends Module {
        public getModuleName(): string {
            return "FolderModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new FolderProcessor()];
        }
    }

    export class FolderProcessor extends BaseProcessor {
        public getName(): string {
            return "FolderProcessor";
        }
        private _folderPanel: OssFolderPanel

        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof FolderEvent) {
                var _folderEvent: FolderEvent = <FolderEvent>$event;
                if (_folderEvent.type == FolderEvent.SHOW_FOLDER_PANEL) {

                    if (!this._baseFolderWindow) {
                        this._baseFolderWindow = new BaseFolderWindow()
                    }
                    this.addUIContainer(this._baseFolderWindow);

                    if (!this._folderPanel) {
                        this._folderPanel = new OssFolderPanel();
                    }
                    this.addUIContainer(this._folderPanel);



                    if (!this._fileListPanel) {
                        this._fileListPanel = new FileListPanel();
                    }
                    this.addUIContainer(this._fileListPanel);
                    if (this.fristRect) {
                        this._baseFolderWindow.setRect(this.fristRect)
                    }
                }
                if (_folderEvent.type == FolderEvent.EDITSCENE_RESET_SIZE) {
                    if (this._baseFolderWindow) {
                        this._baseFolderWindow.setRect(_folderEvent.data)
                    } else {
                        this.fristRect = _folderEvent.data
                    }
                }
                if (_folderEvent.type == FolderEvent.LIST_DIS_ALL_FILE) {
                    this._fileListPanel.refrishPath(String(_folderEvent.data));
                }
                if (_folderEvent.type == FolderEvent.LIST_OSS_FOLDER_FILE) {
                    this._folderPanel.fileOssFolderDic(String(_folderEvent.data));
                }
                if (_folderEvent.type == FolderEvent.RESET_FOLDE_WIN_SIZE) {
                    this.resetFolderWinSize();
                }

            }
        }
        private resetFolderWinSize(): void {
            var $perentWinRect: Rectangle = this._baseFolderWindow.getPageRect().clone();

       
            var A: Rectangle = $perentWinRect.clone();
            A.x = 0;
            A.y += 13;
            A.width = $perentWinRect.width * this._baseFolderWindow.percentNum +5
            A.height -= 18;
            this._folderPanel.setRect(A);

 
            var B: Rectangle = $perentWinRect.clone() 
            B.x = $perentWinRect.width * this._baseFolderWindow.percentNum
            B.y = $perentWinRect.y + 40;
            B.width = $perentWinRect.width * (1 - this._baseFolderWindow.percentNum)
            B.height -= 43;
 
            this._fileListPanel.setRect(B);
        }
        private fristRect: Rectangle
        private folderPanel: win.Panel;
        private addOtherPanel(): void {
            win.LayerManager.getInstance().addPanel(new Panel, 200)
        }
        private addUIContainer(value: UIConatiner): void {
            if (!this.folderPanel) {
                this.folderPanel = new Panel()
                this.folderPanel.x = 0
                this.folderPanel.y = 0
                this.folderPanel.width = 450
                this.folderPanel.height = 250
                win.LayerManager.getInstance().addPanel(this.folderPanel, 200)
                // this.addOtherPanel()
            }
            this.folderPanel.addUIContainer(value)

            //   layout.LayerManager.getInstance().mainTab.addUIContainer(value);
            //  UIManager.getInstance().addUIContainer(value);
        }


        private _fileListPanel: FileListPanel
        private _baseFolderWindow: BaseFolderWindow
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new FolderEvent(FolderEvent.SHOW_FOLDER_PANEL),
                new FolderEvent(FolderEvent.RESET_FOLDE_WIN_SIZE),
                new FolderEvent(FolderEvent.EDITSCENE_RESET_SIZE),
                new FolderEvent(FolderEvent.LIST_DIS_ALL_FILE),
                new FolderEvent(FolderEvent.LIST_OSS_FOLDER_FILE),

            ];
        }
    }

}