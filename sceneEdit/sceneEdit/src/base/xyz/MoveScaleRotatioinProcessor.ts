module xyz {
    import BaseEvent = Pan3d.BaseEvent;
    import Vector3D = Pan3d.Vector3D;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import UIManager = Pan3d.UIManager;
    import SceneManager = Pan3d.SceneManager
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite;
    import MouseType = Pan3d.MouseType
    import Matrix3D = Pan3d.Matrix3D
    import MathUtil = Pan3d.MathUtil
    import Object3D = Pan3d.Object3D
    import Quaternion = Pan3d.Quaternion
    import UICompenent = Pan3d.UICompenent
    import UIConatiner = Pan3d.UIConatiner
    import Display3D = Pan3d.Display3D
    import KeyboardType = Pan3d.KeyboardType

    export class MoveScaleRotatioinEvent extends BaseEvent {
        public static INIT_MOVE_SCALE_ROTATION: string = "INIT_MOVE_SCALE_ROTATION";  
        public static INIT_UICONTAINER_TO_XYZ: string = "INIT_UICONTAINER_TO_XYZ";  //设置Panel
        public static MAKE_DTAT_ITEM_TO_CHANGE: string = "MAKE_DTAT_ITEM_TO_CHANGE";  
        public static CLEAR_XYZ_MOVE_DATA: string = "CLEAR_XYZ_MOVE_DATA";  

    }
    export class MoveScaleRotatioinModule extends Module {
        public getModuleName(): string {
            return "MoveScaleRotatioinModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MoveScaleRotatioinProcessor()];
        }
    }

    export class MoveScaleRotatioinProcessor extends BaseProcessor {
        public getName(): string {
            return "MoveScaleRotatioinProcessor";
        }
        public uiContainer: UIConatiner
        private moveScaleRotationLevel: MoveScaleRotationLevel
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MoveScaleRotatioinEvent) {
                switch ($event.type) {
                    case MoveScaleRotatioinEvent.INIT_MOVE_SCALE_ROTATION:
                        this.moveScaleRotationLevel = new MoveScaleRotationLevel()
                        this.selectScene = $event.data;
                        this.selectScene.addDisplay(this.moveScaleRotationLevel);
                        this.addEvents();

             
                        break
                    case MoveScaleRotatioinEvent.INIT_UICONTAINER_TO_XYZ:
 
                        this.uiContainer = $event.data
                        break;
                    case MoveScaleRotatioinEvent.MAKE_DTAT_ITEM_TO_CHANGE:
                       // this.moveScaleRotationLevel.xyzMoveData = this.makeBaseData();
                        this.moveScaleRotationLevel.xyzMoveData = $event.data
                        break;
                    case MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA:
                        this.moveScaleRotationLevel.xyzMoveData = null;
                        break;
                    default:
                        break;
                }

            }
        }
        private makeBaseData(): TooXyzPosData {
            var a: Display3D = new Display3D();
            a.x = 0;
            a.y = 0;
            a.z = 0;
            a.rotationX = 0;
            a.rotationY = 0;
            a.rotationZ = 0;
            return   TooXyzPosData.getBase([a]);
        }
        private mouseInfo: MouseVO = new MouseVO;
        private selectScene: SceneManager

        private onMouseWheelFun: any;
        private onMouseDownFun: any;
        private onMouseMoveFun: any;
        private onMouseUpFun: any;
        private onKeyDownFun: any;
        private onKeyUpFun: any;
        private addEvents(): void {
            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) };
                this.onMouseDownFun = ($evt: MouseEvent) => { this.onMouseDown($evt) };
                this.onMouseMoveFun = ($evt: MouseEvent) => { this.onMouseMove($evt) };
                this.onMouseUpFun = ($evt: MouseEvent) => { this.onMouseUp($evt) };
                this.onKeyDownFun = ($evt: KeyboardEvent) => { this.onKeyDown($evt) };
                this.onKeyUpFun = ($evt: KeyboardEvent) => { this.onKeyUp($evt) };
            }
            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.addEventListener(MouseType.MouseDown, this.onMouseDownFun);
            document.addEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.addEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.addEventListener(MouseType.KeyDown, this.onKeyDownFun)
            document.addEventListener(MouseType.KeyUp, this.onKeyUpFun)

            document.addEventListener("contextmenu", (event: any) => {
                event.preventDefault();
            });
        }
        private removeEvents(): void {
            document.removeEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.removeEventListener(MouseType.MouseDown, this.onMouseDownFun);
            document.removeEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.removeEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.removeEventListener(MouseType.KeyDown, this.onKeyDownFun)
            document.removeEventListener(MouseType.KeyUp, this.onKeyUpFun)
        }
        private selectVec: Vector3D;
        private getCamData(tempMatrix3D: Matrix3D): Object3D {
            var $Minvert: Matrix3D = tempMatrix3D.clone();
            $Minvert.invert();
            var $motherAct: Object3D = new Object3D
            $motherAct.x = -$Minvert.position.x;
            $motherAct.y = -$Minvert.position.y;
            $motherAct.z = -$Minvert.position.z;
            return $motherAct;

        }
        private get isCanToDo(): boolean { //false为可以操作
            return AppData.sceneEidtType == 1;
          
        }
        private A: Matrix3D = new Matrix3D;
        private B: Matrix3D = new Matrix3D;
        private C: Matrix3D = new Matrix3D;
        private baseCamData: Object3D;
        private disMatrix3D: Matrix3D = new Matrix3D;


       

        private onMouseMove($e: MouseEvent): void {
            if (!this.isCanToDo) {
                return
            }
            this.moveScaleRotationLevel.onMouseMove($e);
            if ($e.altKey) {
                switch ($e.buttons) {
                    case 4:
                        if (this.baseCamData) {
                            var nx: number = -($e.x - this.mouseInfo.last_mouse_x);
                            var ny: number = -($e.y - this.mouseInfo.last_mouse_y)
                            var $m: Matrix3D = this.B.clone();
                            var $Cinvert: Matrix3D = this.C.clone();
                            $Cinvert.invert();
                            $m.appendRotation(nx, Vector3D.Y_AXIS)
                            $m.append(this.C);
                            $m.appendRotation(ny, Vector3D.X_AXIS)
                            $m.append($Cinvert);
                            $m.append(this.disMatrix3D)
                            var obj: Object3D = this.getCamData($m)
                            this.selectScene.cam3D.x = -obj.x;
                            this.selectScene.cam3D.y = -obj.y;
                            this.selectScene.cam3D.z = -obj.z;
                            this.selectScene.cam3D.rotationX = this.baseCamData.rotationX + ny;
                            this.selectScene.cam3D.rotationY = this.baseCamData.rotationY + nx;

                            MathUtil.MathCam(this.selectScene.cam3D)

                        }

                        break;
                    default:
                        break;
                }
            } else {
                switch ($e.buttons) {
                    case 4:
                        if (!this.cancalAltKey) {  //防止刚才是中键锁定旋转，忽然跳转到中键盘移动
                            var $v: Vector3D = this.mouseHitInWorld3D(new Vector2D($e.x, $e.y));
                            this.selectScene.cam3D.x = this.mouseInfo.oldPosx + (this._middleMoveVe.x - $v.x);
                            this.selectScene.cam3D.y = this.mouseInfo.oldPosy + (this._middleMoveVe.y - $v.y);
                            this.selectScene.cam3D.z = this.mouseInfo.oldPosz + (this._middleMoveVe.z - $v.z);
                            MathUtil.MathCam(this.selectScene.cam3D)
                        }
      

                        break;
                    case 2:
                        this.selectScene.cam3D.rotationX = this.mouseInfo.old_rotation_x - ($e.y - this.mouseInfo.last_mouse_y);
                        this.selectScene.cam3D.rotationY = this.mouseInfo.old_rotation_y - ($e.x - this.mouseInfo.last_mouse_x);
                        MathUtil.MathCam(this.selectScene.cam3D)
                        break;
                    default:
                      //  console.log($e.buttons)
                        break;
                }
            }

        }

        private mouseHitInWorld3D($p: Vector2D): Vector3D {

            var stageHeight: number = this.selectScene.cam3D.cavanRect.width;
            var stageWidth: number = this.selectScene.cam3D.cavanRect.height;
            var $v: Vector3D = new Vector3D();
            $v.x = $p.x - stageWidth / 2;
            $v.y = stageHeight / 2 - $p.y;
            $v.z = 100 * 2;
            var $m: Matrix3D = new Matrix3D;
 
            $m.appendRotation(- this.selectScene.cam3D.rotationX, Vector3D.X_AXIS);
            $m.appendRotation(- this.selectScene.cam3D.rotationY, Vector3D.Y_AXIS);
            return $m.transformVector($v);
        }


        private middleMovetType: boolean //是否按下中键
        private _middleMoveVe: Vector3D
        private onMouseDown($e: MouseEvent): void {
            if (!this.isCanToDo) {
                return
            }

            this.moveScaleRotationLevel.onMouseDown($e);

            this.middleMovetType = ($e.button == 1);

            this.mouseInfo.last_mouse_x = $e.x;
            this.mouseInfo.last_mouse_y = $e.y;

            this.mouseInfo.oldPosx = this.selectScene.cam3D.x;
            this.mouseInfo.oldPosy = this.selectScene.cam3D.y;
            this.mouseInfo.oldPosz = this.selectScene.cam3D.z;

            this.mouseInfo.old_rotation_x = this.selectScene.cam3D.rotationX;
            this.mouseInfo.old_rotation_y = this.selectScene.cam3D.rotationY;
 

            switch ($e.button) {
                case 0:
                    break;
                case 1:
               

                    if ($e.altKey) {
                        this.cancalAltKey = true //设置如果是中建移动，ALT取消后，不执行中键移动
                    } else {
                        this.cancalAltKey = false
                    }

                    this._middleMoveVe = this.mouseHitInWorld3D(new Vector2D($e.x, $e.y)); //中键按下的3D坐标
                    this.selectVec = new Vector3D(0, 0, 0);
                    if (this.moveScaleRotationLevel.xyzMoveData) {
                        this.selectVec.x = this.moveScaleRotationLevel.xyzMoveData.x;
                        this.selectVec.y = this.moveScaleRotationLevel.xyzMoveData.y;
                        this.selectVec.z = this.moveScaleRotationLevel.xyzMoveData.z;
                    }
                    this.baseCamData = this.getCamData(this.selectScene.cam3D.cameraMatrix);
                    this.baseCamData.rotationX = this.selectScene.cam3D.rotationX;
                    this.baseCamData.rotationY = this.selectScene.cam3D.rotationY;

                    this.A.identity();
                    this.B.identity();
                    this.C.identity();

                    this.A = this.selectScene.cam3D.cameraMatrix.clone();
                    this.B.appendTranslation(-this.selectVec.x, -this.selectVec.y, -this.selectVec.z);
                    var $q: Quaternion = new Quaternion;
                    $q.fromMatrix(this.selectScene.cam3D.cameraMatrix);
                    this.C = $q.toMatrix3D();
                    this.disMatrix3D = this.A.clone();
                    var $Binvert: Matrix3D = this.B.clone();
                    $Binvert.invert();
                    this.disMatrix3D.prepend($Binvert);

                    break;
                default:
                    break;
            }

        }

        private onMouseUp($e: MouseEvent): void {
            if (!this.isCanToDo) {
                return
            }
 
            this.moveScaleRotationLevel.onMouseUp($e);
        }
        private onKeyDown($e: KeyboardEvent): void {
            if (!this.isCanToDo) {
                return
            }
            switch ($e.keyCode) {
                case KeyboardType.W:
                    this.moveScaleRotationLevel._statceType = TooMathMoveUint.MOVE_XYZ
                    break;
                case KeyboardType.E:
                    this.moveScaleRotationLevel._statceType = TooMathMoveUint.MOVE_ROUTATION
                    break;
                case KeyboardType.R:
                    this.moveScaleRotationLevel._statceType = TooMathMoveUint.MOVE_SCALE
                    break;
                case KeyboardType.Q:
                    this.moveScaleRotationLevel.xyzMoveData = null
                    break;

                default:
                    break
            }
        }
        private cancalAltKey: boolean
        private onKeyUp($e: KeyboardEvent): void {
            if (!this.isCanToDo) {
                return
            }
            if ($e.keyCode==4) {
                this.cancalAltKey=true
            }
 
        }

        public onMouseWheel($evt: MouseWheelEvent): void {
            if (!this.isCanToDo) {
                return
            }

            if ($evt.x > AppData.centenPanel.x && $evt.x < AppData.rightPanel.x) {
                var $slectUi: UICompenent = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
                if (!$slectUi) {
                    var $p: Vector3D = this.getCamForntPos($evt.wheelDelta * 0.1)
                    this.selectScene.cam3D.x = $p.x;
                    this.selectScene.cam3D.y = $p.y;
                    this.selectScene.cam3D.z = $p.z;

                    MathUtil.MathCam(this.selectScene.cam3D)
                }
            }


        }
        private getCamForntPos(dis: number): Vector3D {

            var $p: Vector3D = new Vector3D(0, 0, dis);
            var $m: Matrix3D = new Matrix3D;
            $m.appendRotation(-this.selectScene.cam3D.rotationX, Vector3D.X_AXIS);
            $m.appendRotation(-this.selectScene.cam3D.rotationY, Vector3D.Y_AXIS);
            $p = $m.transformVector($p);
            $p.x = this.selectScene.cam3D.x + $p.x;
            $p.y = this.selectScene.cam3D.y + $p.y;
            $p.z = this.selectScene.cam3D.z + $p.z;
            return $p
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MoveScaleRotatioinEvent(MoveScaleRotatioinEvent.INIT_MOVE_SCALE_ROTATION),
                new MoveScaleRotatioinEvent(MoveScaleRotatioinEvent.INIT_UICONTAINER_TO_XYZ),
                new MoveScaleRotatioinEvent(MoveScaleRotatioinEvent.MAKE_DTAT_ITEM_TO_CHANGE),
                new MoveScaleRotatioinEvent(MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA),
            ];
        }
    }
}