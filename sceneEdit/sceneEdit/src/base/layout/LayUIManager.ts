module win {

    import Scene_data = Pan3d.Scene_data;
    import UIConatiner = Pan3d.UIConatiner;
    import UIStage = Pan3d.UIStage
    import UIRenderComponent = Pan3d.UIRenderComponent
    import TextAlign = Pan3d.TextAlign
    import UIManager = Pan3d.UIManager
    import InteractiveEvent = Pan3d.InteractiveEvent
    import ProgrmaManager = Pan3d.ProgrmaManager
    import MouseType = Pan3d.MouseType
    import Vector2D = Pan3d.Vector2D
    import MathClass = Pan3d.MathClass
    import TimeUtil = Pan3d.TimeUtil

    export class LayUIManager    {


        private _uiList: Array<UIRenderComponent>;
        public _containerList: Array<UIConatiner>;


        public get uiList():Array<UIRenderComponent> {
            return this._uiList
        } 

        public constructor() {

            this._uiList = []
            this._containerList = []

        }
 
   

        public addUI($ui: UIRenderComponent): void {
            var $id: number = 0
            for (var i: number = this._uiList.length - 1; i >= 0; i--) {
                if (this._uiList[i].sortnum <= $ui.sortnum) {
                    $id = i + 1
                    break
                }
            }

            this._uiList.splice($id, 0, $ui);
 
            $ui.rendering = true;
        }

        public removeUI($ui: UIRenderComponent): void {
            var index: number = this._uiList.indexOf($ui);
            $ui.rendering = false;
            if (index != -1) {
                this._uiList.splice(index, 1);
            }
        }

        public addUIContainer($container: UIConatiner): void {
            if ($container.hasStage) {
                return;
            }
            $container.perent = this;

            this._containerList.push($container);
            $container.resize();
            for (var i: number = 0; i < $container.renderList.length; i++) {
                this.addUI($container.renderList[i]);
            }
            $container.hasStage = true;
      

        }
        public removeAll(): void {
            while (this._containerList.length) {
                ////console.log("this._containerList.length",this._containerList.length)
                this.removeUIContainer(this._containerList[this._containerList.length - 1]);
            }
        }

        public removeUIContainer($container: UIConatiner): void {

            if (!$container.hasStage) {
                return;
            }

            var index: number = this._containerList.indexOf($container);
            $container.hasStage = false;
            $container.perent = null
            if (index != -1) {
                this._containerList.splice(index, 1);
            }
            for (var i: number = 0; i < $container.renderList.length; i++) {
                this.removeUI($container.renderList[i]);
            }
        }

        public hasWindowUI(): boolean {

            return false;
        }
        public removeNoInterfaceUI(): void {
            for (var i: number = (this._containerList.length - 1); i >= 0; i--) {
                if (!this._containerList[i].interfaceUI) { //非主界面的时候
                    this.removeUIContainer(this._containerList[i]);
                }
            }

        }

        public resize(): void {
            if (!this._uiList) {
                return;
            }
 
            for (var i: number = 0; i < this._uiList.length; i++) {
                this._uiList[i].resize();
            }

            for (var i: number = 0; i < this._containerList.length; i++) {
                this._containerList[i].resize();
            }
        }

        public upBgGroundZero(): void {
            for (var i: number = 0; i < this._uiList.length; i++) {
                if (this._uiList[i].container.layer == -1 || this._uiList[i].sortnum == -1) {
                    this._uiList[i].update();
                }
            }
        }

        public update(): void {
            for (var i: number = 0; i < this._uiList.length; i++) {
                if (this._uiList[i].container.layer >= 0 && this._uiList[i].sortnum != -1) {
                     this._uiList[i].update();
                }
            }
        }


        //private _touch: any;
        public regEvent($touce: any): void {
 

        }

        private onTouch($e: any): void {
            this.interactiveEvent($e);
        }

        private onMouse($e: any): void {
            this.interactiveEvent($e);

        }
        private lastSwipeDis: number;
        private lastSwipeRot: number;
        public interactiveEvent($e: any): void {

            var evt: InteractiveEvent;
            var point: Vector2D = new Vector2D();
            if ($e instanceof MouseEvent) {
                if ($e.type == MouseType.MouseDown) {
                    evt = new InteractiveEvent(InteractiveEvent.Down);
                } else if ($e.type == MouseType.MouseUp) {
                    evt = new InteractiveEvent(InteractiveEvent.Up);
                } else if ($e.type == MouseType.MouseMove) {
                    evt = new InteractiveEvent(InteractiveEvent.Move);
                } else if ($e.type == MouseType.MouseClick) {

                }
                //evt.x = $e.pageX;
                //evt.y = $e.pageY;

                point.x = $e.pageX;
                point.y = $e.pageY;

            } else {
                if ($e.type == MouseType.TouchStart) {
                    //$e.preventDefault();
                    evt = new InteractiveEvent(InteractiveEvent.Down);
                    if ($e.touches.length > 1) {
                        // evt = new InteractiveEvent(InteractiveEvent.PinchStart);
                        // this.lastSwipeDis = MathClass.math_distance($e.touches[0].clientX, $e.touches[0].clientY, $e.touches[1].clientX, $e.touches[1].clientY);
                        // this.lastSwipeRot = Math.atan2($e.touches[1].clientY - $e.touches[0].clientY, $e.touches[1].clientX - $e.touches[0].clientX);

                        point.x = $e.touches[$e.touches.length - 1].pageX;
                        point.y = $e.touches[$e.touches.length - 1].pageY;

                    } else {
                        point.x = $e.pageX;
                        point.y = $e.pageY;
                    }



                } else if ($e.type == MouseType.TouchEnd) {
                    //alert("touseend");
                    evt = new InteractiveEvent(InteractiveEvent.Up);
                    point.x = $e.changedTouches[0].pageX;
                    point.y = $e.changedTouches[0].pageY;

                } else if ($e.type == MouseType.TouchMove) {
                    //$e.preventDefault();
                    if ($e.touches.length > 1) {
                        evt = new InteractiveEvent(InteractiveEvent.Pinch);
                        evt.data = MathClass.math_distance($e.touches[0].clientX, $e.touches[0].clientY, $e.touches[1].clientX, $e.touches[1].clientY) / this.lastSwipeDis
                        evt.roation = (Math.atan2($e.touches[1].clientY - $e.touches[0].clientY, $e.touches[1].clientX - $e.touches[0].clientX) - this.lastSwipeRot) * 180 / Math.PI

                    } else {
                        evt = new InteractiveEvent(InteractiveEvent.Move);
                    }

                    point.x = $e.pageX;
                    point.y = $e.pageY;

                }
                if ($e.touches.length) {
                    for (var i: number = 0; i < $e.touches.length; i++) {

                        point.x = $e.touches[i].clientX;
                        point.y = $e.touches[i].clientY;
                    }
                }


            }
            ////console.log(point.x, point.y);
            this.mouseEvetData(evt, point)
        }
        private lastMousePos: Vector2D //用来存放按下去时的位置，
        public disMoveNnum(v2d: Vector2D, $num: number): boolean {
            return Vector2D.distance(v2d, this.lastMousePos) < $num
        }
        public mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean  //true为有UI对象 flash为没有
        {
            UIManager.cando = true;
            if (Scene_data.verticalScene) {
                evt.x = point.y;
                evt.y = Scene_data.stageHeight - point.x;
            } else {
                evt.x = point.x;
                evt.y = point.y;
            }

            var tf: boolean = false;
            if (!tf) {
                for (var i: number = this._uiList.length - 1; i >= 0; i--) {
                    if (this._uiList[i]) {
                        if (this._uiList[i] && this._uiList[i].interactiveEvent(evt)) {
                            tf = true;
                            break;
                        }
                    }
                }
            }

            return tf
            /*
        
  
            */


        }
 
  

        private lastTime: number = 0


    }
}