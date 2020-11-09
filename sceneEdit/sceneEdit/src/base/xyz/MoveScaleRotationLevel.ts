module xyz {
    import Display3D = Pan3d.Display3D
    import Matrix3D = Pan3d.Matrix3D
    import MathUtil = Pan3d.MathUtil
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite;
    import UIConatiner = Pan3d.UIConatiner;
    export class MoveScaleRotationLevel extends Display3D {
      
        private _tooMoveLevel: TooMoveLevel;
        private _tooRotationLevel: TooRotationLevel;
        private _tooScaleLevel: TooScaleLevel;
        public _statceType: number;
        public constructor() {
            super();
            this._statceType = TooMathMoveUint.MOVE_NULL
            this._tooMoveLevel = new TooMoveLevel(this);
            this._tooRotationLevel = new TooRotationLevel(this);
            this._tooScaleLevel = new TooScaleLevel(this)
       
        }
        public lookLenToFocu: number
        public update(): void {

            var focuV3d: Vector3D = new Vector3D
            if (this._xyzMoveData) {
                this._xyzMoveData.modeMatrx3D.identity()

                this._xyzMoveData.changeModelMatrix3d()

                //console.log(this._xyzMoveData.x, this._xyzMoveData.y, this._xyzMoveData.z)

                this.lookLenToFocu = Vector3D.distance(this._scene.cam3D, this._xyzMoveData);
             
            }
  
            switch (this._statceType) {
                case TooMathMoveUint.MOVE_XYZ:
                    this._tooMoveLevel.update()
                    break
                case TooMathMoveUint.MOVE_ROUTATION:
                    this._tooRotationLevel.update()
                    break
                case TooMathMoveUint.MOVE_SCALE:
                    this._tooScaleLevel.update()
                    break
                default:
                    break
            }
       

        }
        public addStage(): void {
            super.addStage()
            this._tooMoveLevel._scene = this._scene;
            this._tooRotationLevel._scene = this._scene;
            this._tooScaleLevel._scene = this._scene;
        }
        public   dataUpDate(): void {
        }
        private _xyzMoveData: TooXyzPosData
        public get xyzMoveData(): TooXyzPosData {
            return this._xyzMoveData ;
        }
        public set xyzMoveData(value: TooXyzPosData) {
            this._xyzMoveData = value;
            if (this._xyzMoveData == null) {
                this._statceType = TooMathMoveUint.MOVE_NULL
                return
            } else {
                this._statceType = TooMathMoveUint.MOVE_XYZ
            }
            this._xyzMoveData.modeMatrx3D = new Matrix3D;
            this._xyzMoveData.changeModelMatrix3d();
 
        }

        public onMouseMove($e: MouseEvent): void {
            var mouseVect2d: Vector2D = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y)
            if ($e.buttons == 0) {
                switch (this._statceType) {
                    case TooMathMoveUint.MOVE_XYZ:
                        this._tooMoveLevel.isHit(mouseVect2d)
                        break
                    case TooMathMoveUint.MOVE_ROUTATION:
                        this._tooRotationLevel.isHit(mouseVect2d)
                        break
                    case TooMathMoveUint.MOVE_SCALE:
                        this._tooScaleLevel.isHit(mouseVect2d)
                        break
                    default:
                        break
                }
            } else {
                if ($e.buttons == 1) {
                    var needUpData: boolean = false

                    switch (this._statceType) {
                        case TooMathMoveUint.MOVE_XYZ:
                            needUpData=   this._tooMoveLevel.onMouseMove(mouseVect2d)
                            break
                        case TooMathMoveUint.MOVE_ROUTATION:
                            needUpData = this._tooRotationLevel.onMouseMove(mouseVect2d)
                            break
                        case TooMathMoveUint.MOVE_SCALE:
                            needUpData = this._tooScaleLevel.onMouseMove(mouseVect2d)
                            break
                        default:
               
                            break
                    }
                    if (needUpData) {
                        this.upChange()
                    }
             
           
                }
            }
       
        }
        private upChange(): void {
            if (this.xyzMoveData) {
                this.xyzMoveData.upRootMatrix3DToItem()
                this.xyzMoveData.dataUpDate && this.xyzMoveData.dataUpDate();
    
            }
        }
        public onMouseUp($e: MouseEvent): void {
            var mouseVect2d: Vector2D = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y)
            switch (this._statceType) {
                case TooMathMoveUint.MOVE_XYZ:
                    this._tooMoveLevel.onMouseUp(mouseVect2d)
                    break
                case TooMathMoveUint.MOVE_ROUTATION:
                    this._tooRotationLevel.onMouseUp(mouseVect2d)
                    break
                case TooMathMoveUint.MOVE_SCALE:
                    this._tooScaleLevel.onMouseUp(mouseVect2d)
                    break
                default:
                    break
            }
        }
        public onMouseDown($e: MouseEvent): void {
            if (!this._xyzMoveData) {
                return
            }

            this._xyzMoveData.oldx = this._xyzMoveData.x
            this._xyzMoveData.oldy = this._xyzMoveData.y
            this._xyzMoveData.oldz = this._xyzMoveData.z

            this._xyzMoveData.oldscale_x = this._xyzMoveData.scaleX
            this._xyzMoveData.oldscale_y = this._xyzMoveData.scaleY
            this._xyzMoveData.oldscale_z = this._xyzMoveData.scaleZ

            this._xyzMoveData.oldangle_x = this._xyzMoveData.rotationX;
            this._xyzMoveData.oldangle_y = this._xyzMoveData.rotationY;
            this._xyzMoveData.oldangle_z = this._xyzMoveData.rotationZ;

            var mouseVect2d: Vector2D = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y)

            if ($e.button == 0) {
                switch (this._statceType) {
                    case TooMathMoveUint.MOVE_XYZ:
                        this._tooMoveLevel.onMouseDown(mouseVect2d)
                        break
                    case TooMathMoveUint.MOVE_ROUTATION:
                        this._tooRotationLevel.onMouseDown(mouseVect2d)
                        break
                    case TooMathMoveUint.MOVE_SCALE:
                        this._tooScaleLevel.onMouseDown(mouseVect2d)
                        break
                    default:
                        break
                }
            }

        }

    }

}



