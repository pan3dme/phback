module xyz {
    import Shader3D = Pan3d.Shader3D
    import Display3D = Pan3d.Display3D;
    import ProgrmaManager = Pan3d.ProgrmaManager
    import TextureManager = Pan3d.TextureManager
    import UIManager = Pan3d.UIManager;
    import TextureRes = Pan3d.TextureRes;
    import Matrix3D = Pan3d.Matrix3D
    import Scene_data = Pan3d.Scene_data;
    import LineDisplaySprite = Pan3d.LineDisplaySprite


    export class TooMoveLevel extends TooBaseModelLevel {
        private _boxA: TooJianTouDisplay3DSprite;
        private _boxB: TooJianTouDisplay3DSprite;
        private _boxC: TooJianTouDisplay3DSprite;
        private _lineA: TooLineTri3DSprite
        private _lineB: TooLineTri3DSprite
        private _lineC: TooLineTri3DSprite
 
        constructor(value: MoveScaleRotationLevel) {
            super(value);
            
            this._boxA = new TooJianTouDisplay3DSprite();
            this._boxB = new TooJianTouDisplay3DSprite();
            this._boxC = new TooJianTouDisplay3DSprite();

            this._lineA = new TooLineTri3DSprite();
            this._lineB = new TooLineTri3DSprite();
            this._lineC = new TooLineTri3DSprite();

            this._boxA.colorVect = new Vector3D(1, 0, 0);
            this._boxB.colorVect = new Vector3D(0, 1, 0);
            this._boxC.colorVect = new Vector3D(0, 0, 1);
 

        }
        public isHit(mouseVect2d: Vector2D): void {

      
            this.testHitTemp(this._boxA, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(1, 0, 0)]);
            this.testHitTemp(this._boxB, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 1, 0)]);
            this.testHitTemp(this._boxC, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 0, 1)]);

        
        }
 

     

        public onMouseDown(mouseVect2d: Vector2D): void {

            if (TooMathHitModel.testHitModel(this._boxA, this._scene, mouseVect2d)) {
                this.selectId = 1;
            } else if (TooMathHitModel.testHitModel(this._boxB, this._scene, mouseVect2d)) {
                this.selectId = 2;
            } else if (TooMathHitModel.testHitModel(this._boxC, this._scene, mouseVect2d)) {
                this.selectId = 3;
            }
            if (this.selectId > 0) {
                var A: Vector3D = new Vector3D(0, 0, 0)
                var B: Vector3D;
                var C: Vector3D;

                switch (this.selectId) {
                    case 1:
                        B = new Vector3D(100, 0, 0);
                        C = new Vector3D(0, 0, 100);
                        break
                    case 2:
                        B = new Vector3D(100, 0, 0);
                        C = new Vector3D(0, 100, 0);
                        break
                    case 3:
                        B = new Vector3D(0, 0, 100);
                        C = new Vector3D(0, 100, 0);
                        break
                    default:
                        break
                }
                A = this.parent.xyzMoveData.modeMatrx3D.transformVector(A);
                B = this.parent.xyzMoveData.modeMatrx3D.transformVector(B);
                C = this.parent.xyzMoveData.modeMatrx3D.transformVector(C);
                this.pointItem = [A, B, C];

                this.lastMatrix3d = this.parent.xyzMoveData.modeMatrx3D.clone()
                this.lastMousePosV3d = this.getMouseHitPanelPos(mouseVect2d)
            }
        
        }
        private lastMatrix3d: Matrix3D
        private pointItem: Array<Vector3D>
        public onMouseUp(mouseVect2d: Vector2D): void {
            this.lastMousePosV3d = null;
            this.selectId = 0;
        }
        private getMouseHitPanelPos(mouseVect2d: Vector2D): Vector3D {
            var clik3dVect: Vector3D = TooMathHitModel.getCamFontDistent(this._scene, mouseVect2d, 100); //鼠标前面的3D坐标
            var cam3d: Vector3D = new Vector3D(this._scene.cam3D.x, this._scene.cam3D.y, this._scene.cam3D.z)
            var pos: Vector3D = Pan3d.MathUtil.getLinePlaneInterectPointByTri(cam3d, clik3dVect, this.pointItem);

            var $m: Matrix3D = this.lastMatrix3d.clone()
            $m.invert()
            pos = $m.transformVector(pos)

            return pos
        }
        private lastMousePosV3d: Vector3D;
        public onMouseMove(mouseVect2d: Vector2D): boolean {
            var isTrue: boolean //是否有执行
            if (this.selectId > 0) {
                if (this.lastMousePosV3d) {
 
                    var pos: Vector3D= this.getMouseHitPanelPos(mouseVect2d)
                    var addPos: Vector3D = new Vector3D()
  
                    switch (this.selectId) {
                        case 1:
                            addPos.x = pos.x - this.lastMousePosV3d.x
                            isTrue = true
                            break
                        case 2:
                            addPos.y = pos.y - this.lastMousePosV3d.y
                            isTrue = true
                           break
                        case 3:
                            addPos.z = pos.z - this.lastMousePosV3d.z
                            isTrue = true
                            break
                        default:
                            isTrue = false
                            break
                    }
                    var $m: Matrix3D = this.lastMatrix3d.clone()
                    $m.prependTranslation(addPos.x, addPos.y, addPos.z)
                    var pos: Vector3D = $m.position
                    this.parent.xyzMoveData.x = pos.x
                    this.parent.xyzMoveData.y = pos.y
                    this.parent.xyzMoveData.z = pos.z
 
                }
              
            }
            return isTrue
        }
        private getMouseHitPos(mouseVect2d: Vector2D): Vector3D {
            var pos: Vector3D = TooMathHitModel.getCamFontDistent(this._scene, mouseVect2d, 100);

            var A: Vector3D = new Vector3D(0, 0, 0)
            var B: Vector3D;
            var C: Vector3D;

            switch (this.selectId) {
                case 1:
                    B = new Vector3D(1, 0, 0);
                    C = new Vector3D(0, 0,1);
                    break
                case 2:
                    B = new Vector3D(0, 1, 0);
                    C = new Vector3D(0, 0, 1);
                    break
                case 3:
                    B = new Vector3D(0, 0, 1);
                    C = new Vector3D(1, 0, 0);
                    break
                default:
                    break
            }
            return Vector3D.getPointPedalInPlane(pos, A, B, C)

        }


     
        public update(): void {
            super.update()
 
            var line50: number = 20;;
  
            if (this.parent.xyzMoveData) {
                this.posMatrix.identity()
                var perentM: Matrix3D = this.parent.xyzMoveData.modeMatrx3D.clone()


                perentM = new Matrix3D;
                perentM.appendRotation(this.parent.xyzMoveData.rotationX, Vector3D.X_AXIS);
                perentM.appendRotation(this.parent.xyzMoveData.rotationY, Vector3D.Y_AXIS);
                perentM.appendRotation(this.parent.xyzMoveData.rotationZ, Vector3D.Z_AXIS);
                perentM.appendTranslation(this.parent.xyzMoveData.x, this.parent.xyzMoveData.y, this.parent.xyzMoveData.z)



                var dis: number = Vector3D.distance(perentM.position, this._scene.cam3D);
                dis = this._scene.cam3D.cameraMatrix.transformVector(perentM.position).z
                perentM.prependScale(dis / 80, dis / 80, dis / 80);

         
                this.posMatrix.append(perentM);
            }

          // this.posMatrix.identityScale()
       

               //this.modelItem[i].x = M.position.x;
               // this.modelItem[i].y = M.position.y;
               // this.modelItem[i].z = M.position.z;

               // var ro: Vector3D = M.toEulerAngles();
               // this.modelItem[i].rotationX = ro.x * 180 / Math.PI;
               // this.modelItem[i].rotationY = ro.y * 180 / Math.PI;
               // this.modelItem[i].rotationZ = ro.z * 180 / Math.PI;
        

            this._boxA.posMatrix = this.posMatrix.clone();
            this._boxA.posMatrix.prependTranslation(line50, 0, 0);
         

            this._boxB.posMatrix = this.posMatrix.clone();
            this._boxB.posMatrix.prependTranslation(0, line50, 0);
            this._boxB.posMatrix.prependRotation(90, Vector3D.Z_AXIS);

                ;
            this._boxC.posMatrix = this.posMatrix.clone();
            this._boxC.posMatrix.prependTranslation(0, 0, line50);
            this._boxC.posMatrix.prependRotation(-90, Vector3D.Y_AXIS);

            this._lineA.posMatrix = this.posMatrix.clone();


            this._lineB.posMatrix = this.posMatrix.clone();
            this._lineB.posMatrix.prependRotation(90, Vector3D.Z_AXIS);

            this._lineC.posMatrix = this.posMatrix.clone();
            this._lineC.posMatrix.prependRotation(-90, Vector3D.Y_AXIS);
         


            Scene_data.context3D.cullFaceBack(false);
            Scene_data.context3D.setWriteDepth(true);
            Scene_data.context3D.setDepthTest(true);


            this._boxA.update();
            this._boxB.update();
            this._boxC.update();

            this._lineA.update();
            this._lineB.update();
            this._lineC.update();

      
            

        }



    }
}