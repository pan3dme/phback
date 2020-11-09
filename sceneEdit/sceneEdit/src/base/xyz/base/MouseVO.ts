module xyz {
    import Object3D = Pan3d.Object3D
 

    export class MouseVO extends Object3D {
        public   _mouseDown: Boolean = false;
        public   last_mouse_x: number = 0;
        public   last_mouse_y: number = 0;
        
        public   oldPosx: number = 0;
        public   oldPosy: number = 0;
        public oldPosz: number = 0;

        public   old_rotation_x: number = 0;
        public old_rotation_y: number = 0;
 
  
    }
}