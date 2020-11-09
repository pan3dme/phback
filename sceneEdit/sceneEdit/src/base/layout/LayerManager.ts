module win {
    import InteractiveEvent = Pan3d.InteractiveEvent
    import Vector2D = Pan3d.Vector2D
    import Rectangle = Pan3d.Rectangle;
 
    import UICompenent = Pan3d.UICompenent
    import Scene_data = Pan3d.Scene_data

    export class GameUIInstance {
        public constructor() {
        }

 

        public static uiContainer: Sprite;

        public static layoutBottom: Sprite;

        public static layoutTop: Sprite;

        //public static var txt:TextInput;

    }

    export class LayerManager {
        private static _instance: LayerManager;
        public static getInstance(): LayerManager {
            if (!this._instance) {
                this._instance = new LayerManager();
            }
            return this._instance;
        }

        public children: Array<Panel>;
     
        public initData(): void {
            this.children = [];
        }
        
        public addPanel($panel: Panel, $level: number, $isOnly: boolean = false): void {
            $panel.layer = $level;

            if ($isOnly) {
                for (var i: number = this.children.length - 1; i >= 0; i--) {
                    if (this.children[i].layer == $level) {
                        this.removePanel(this.children[i])
                    }
                }

            }
            var index: number = this.children.indexOf($panel);
            if (index == -1) {
                this.children.push($panel);
                this.children.sort(function (aa: Panel, bb: Panel): number {
                    return aa.layer - bb.layer;
                })
            }
        }
        public removePanel($panel: Panel): void {
            var index: number = this.children.indexOf($panel);
            if (index != -1) {
                this.children.splice(index, 1);
            }
        }
     
        public update(): void {
            Pan3d.Scene_data.context3D.setDepthTest(false);
            for (var i: number = 0; this.children&& i < this.children.length; i++) {
                this.children[i].update()
            }
        }
        public resize(): void {
            for (var i: number = 0; this.children&& i < this.children.length; i++) {
                this.children[i].resize()
            }
        }
        public getObjectsUnderPoint(evt: Vector2D): UICompenent {
            for (var i: number = this.children.length - 1; i >= 0; i--) {
                var temp: UICompenent = this.children[i].getObjectsUnderPoint(evt);
                if (temp  ) {

                    return temp
                }
            }

            return null


        }
        public static isHideMouseEvent: boolean
        public mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean  //true为有UI对象 flash为没有
        {
            if (LayerManager.isHideMouseEvent) {
                return
            }
            var tf: boolean = false;
            for (var i: number = this.children.length - 1; i >= 0; i--) {
                if (!tf) {
                    tf = this.children[i].mouseEvetData(evt, point);
                }
            }
            var $uistageTemp: boolean = Scene_data.uiStage.interactiveEvent(evt);
            if (!tf) {
                Scene_data.uiBlankStage.interactiveEvent(evt);
                return $uistageTemp;
            } else {
                return true
            }

        
     
        }
    }
}

