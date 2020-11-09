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


    export class TooBaseModelLevel extends Display3D {
 

        public parent: MoveScaleRotationLevel;

        constructor(value: MoveScaleRotationLevel) {
            super();
            this.parent = value
     

        }
        public isHit(mouseVect2d: Vector2D): void {


        
        }
        public selectId: number;



        public onMouseDown(mouseVect2d: Vector2D): void {

           
        }
        public onMouseUp(mouseVect2d: Vector2D): void {
      
        }
   
        public onMouseMove(mouseVect2d: Vector2D): void {
            
        }
        public testHitTemp(display3D: any, v2d: Vector2D, vec: Array<Vector3D>): void {
            var hit: number = TooMathHitModel.testHitModel(display3D, this._scene, v2d);
            display3D.colorVect = hit ? vec[0] : vec[1];

        }
        public update(): void {
            
            this.posMatrix.identity();
            var dis: number = this.parent.lookLenToFocu / 100;
            this.posMatrix.appendScale(dis, dis, dis);



        }



    }
}