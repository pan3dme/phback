module xyz {
    import Shader3D = Pan3d.Shader3D
    import Display3D = Pan3d.Display3D;
    import ProgrmaManager = Pan3d.ProgrmaManager
    import TextureManager = Pan3d.TextureManager
    import UIManager = Pan3d.UIManager;
    import TextureRes = Pan3d.TextureRes;
    import Matrix3D = Pan3d.Matrix3D
    import Scene_data = Pan3d.Scene_data;
    import MathUtil = Pan3d.MathUtil
    import LineDisplaySprite = Pan3d.LineDisplaySprite
    import TooRotationDisplay3DSprite = cctv.TooRotationDisplay3DSprite


    export class TooRotationLevel extends TooBaseModelLevel {
        private _roundA: TooRotationDisplay3DSprite;
        private _roundB: TooRotationDisplay3DSprite;
        private _roundC: TooRotationDisplay3DSprite;
 

        constructor(value: MoveScaleRotationLevel) {
            super(value);

            this._roundA = new TooRotationDisplay3DSprite();
            this._roundB = new TooRotationDisplay3DSprite();
            this._roundC = new TooRotationDisplay3DSprite();

    

            this._roundA.colorVect = new Vector3D(1, 0, 0);
            this._roundB.colorVect = new Vector3D(0, 1, 0);
            this._roundC.colorVect = new Vector3D(0, 0, 1);


        }
        public isHit(mouseVect2d: Vector2D): void {


            this.testHitTemp(this._roundA, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(1, 0, 0)]);
            this.testHitTemp(this._roundB, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 1, 0)]);
            this.testHitTemp(this._roundC, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 0, 1)]);


        }

        public onMouseDown(mouseVect2d: Vector2D): void {
      
            if (TooMathHitModel.testHitModel(this._roundA, this._scene, mouseVect2d)) {
                this.selectId = 1;
            } else if (TooMathHitModel.testHitModel(this._roundB, this._scene, mouseVect2d)) {
                this.selectId = 2;
            } else if (TooMathHitModel.testHitModel(this._roundC, this._scene, mouseVect2d)) {
                this.selectId = 3;
            }
            if (this.selectId) {
                var a: Vector3D, b: Vector3D, c: Vector3D
                switch (this.selectId) {
                    case 1:
                        a = new Vector3D(0, -100, +50)
                        b = new Vector3D(0, -100, -50)
                        c = new Vector3D(0, 100, +50)
                        break
                    case 2:
                        a = new Vector3D(-100, 0, +50)
                        b = new Vector3D(-100, 0, -50)
                        c = new Vector3D(+100, 0, +50)
                        break
                    case 3:
                        a = new Vector3D(-100, +50, 0)
                        b = new Vector3D(-100, -50, 0)
                        c = new Vector3D(+100, +50, 0)
                        break;
                    default:
                        break
                }
                console.log("旋转轴", this.selectId)
                this.showYaix(a, b, c)
                this.lastDis = this.testInfo(this._linePosinA, this._linePosinB, mouseVect2d)
            }
           
        }
        private showYaix(a: Vector3D, b: Vector3D, c: Vector3D): void {
            var scene: Pan3d.SceneManager = this._scene
            var mat: Matrix3D = scene.cam3D.cameraMatrix.clone();
            var viewMatrx3D: Matrix3D = scene.viewMatrx3D.clone();
            mat.append(viewMatrx3D);

            var _xyzMoveData: TooXyzPosData = this.parent.xyzMoveData;
            a = _xyzMoveData.modeMatrx3D.transformVector(a)
            b = _xyzMoveData.modeMatrx3D.transformVector(b)
            c = _xyzMoveData.modeMatrx3D.transformVector(c)

            var $triNrm: Vector3D = Vector3D.calTriNormal(a, b, c, true);//获取平面法线

            var centen2d: Vector2D = TooMathHitModel.math3DWorldtoDisplay2DPos(_xyzMoveData.modeMatrx3D.position, mat, scene.cam3D.cavanRect) 
            var outPos2d: Vector2D = TooMathHitModel.math3DWorldtoDisplay2DPos($triNrm.add(_xyzMoveData.modeMatrx3D.position), mat, scene.cam3D.cavanRect)

   

            this._linePosinA = centen2d;
            this._linePosinB = outPos2d;

      
        }
        
        private _linePosinA: Vector2D //屏幕上垂直A点 ;
        private _linePosinB: Vector2D //屏幕上垂直B点;
        public onMouseUp(mouseVect2d: Vector2D): void {
 
            this.selectId = 0;
            this.lastDis = null
 
 
        }
        private lastDis: number

        private testInfo(A: Vector2D, B: Vector2D, C: Vector2D): number {
            var a: Vector2D = new Vector2D(0, 0);
            var b: Vector2D = new Vector2D(-1, 1);
            var c: Vector2D = new Vector2D(10, 10);

            a = A
            b = B
            c = C
 
            var r: number = Math.atan2(b.y - a.y, b.x - a.x)
 
            var m: Matrix3D = new Matrix3D()
            m.appendRotation(90-(r * 180 / Math.PI) , Vector3D.Z_AXIS);

            var d: Vector3D  = m.transformVector(new Vector3D(c.x, c.y, 0));
            return d.x

        }
        public onMouseMove(mouseVect2d: Vector2D): boolean {

            var isTrue: boolean //是否有执行
            if (this.selectId > 0) {
       
                var dis: number =this.testInfo(this._linePosinA, this._linePosinB, mouseVect2d)
                if (!isNaN(this.lastDis)) {
                    var addRotation: number = dis - this.lastDis
                    var _xyzMoveData: TooXyzPosData = this.parent.xyzMoveData;
                    var $m: Matrix3D = new Matrix3D;
                    $m.appendRotation(_xyzMoveData.rotationX, Vector3D.X_AXIS)
                    $m.appendRotation(_xyzMoveData.rotationY, Vector3D.Y_AXIS)
                    $m.appendRotation(_xyzMoveData.rotationZ, Vector3D.Z_AXIS)

                    var $addM: Matrix3D = new Matrix3D()
                    switch (this.selectId) {
                        case 1:
                            $addM.appendRotation(addRotation, Vector3D.X_AXIS)
                            break
                        case 2:
                            $addM.appendRotation(-addRotation, Vector3D.Y_AXIS)
                            break
                        case 3:
                            $addM.appendRotation(addRotation, Vector3D.Z_AXIS)
                            break;
                        default:
                            break
                    }
                    $m.prepend($addM)

                    var outVec3d: Vector3D = $m.toEulerAngles();
                 //   console.log(outVec3d)
                    _xyzMoveData.rotationX = outVec3d.x
                    _xyzMoveData.rotationY = outVec3d.y
                    _xyzMoveData.rotationZ = outVec3d.z
                    isTrue = true

                } else {
                    console.log("开始")
                }
                this.lastDis = dis
            }
            return isTrue
        }
       


 

        public update(): void {
            super.update()

            this.posMatrix.identity()
            if (this.parent.xyzMoveData) {

            
                var perentM: Matrix3D = this.parent.xyzMoveData.modeMatrx3D.clone()


                perentM = new Matrix3D;
                perentM.appendRotation(this.parent.xyzMoveData.rotationX, Vector3D.X_AXIS);
                perentM.appendRotation(this.parent.xyzMoveData.rotationY, Vector3D.Y_AXIS);
                perentM.appendRotation(this.parent.xyzMoveData.rotationZ, Vector3D.Z_AXIS);
                perentM.appendTranslation(this.parent.xyzMoveData.x, this.parent.xyzMoveData.y, this.parent.xyzMoveData.z);



                var dis: number = Vector3D.distance(perentM.position, this._scene.cam3D);
                dis = this._scene.cam3D.cameraMatrix.transformVector(perentM.position).z
                perentM.prependScale(dis / 80, dis / 80, dis / 80);


                this.posMatrix.append(perentM);
            }
     

             
 
            this._roundA.posMatrix = this.posMatrix.clone();
 

            this._roundB.posMatrix = this.posMatrix.clone();
            this._roundB.posMatrix.prependRotation(90, Vector3D.Z_AXIS);

            this._roundC.posMatrix = this.posMatrix.clone();
            this._roundC.posMatrix.prependRotation(-90, Vector3D.Y_AXIS);

     
            Scene_data.context3D.renderContext.enable(Scene_data.context3D.renderContext.CULL_FACE);
            Scene_data.context3D.renderContext.cullFace(Scene_data.context3D.renderContext.BACK);

  
            Scene_data.context3D.setWriteDepth(true);
            Scene_data.context3D.setDepthTest(true);


            this._roundA.update();
             this._roundB.update();
             this._roundC.update();
 




        }



    }
}