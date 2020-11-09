module xyz {
    import Object3D = Pan3d.Object3D
    import Vector3D = Pan3d.Vector3D;
  

    export class TooObjectHitBox extends Object3D {
        public beginx: number;
        public beginy: number;
        public beginz: number;
        public endx: number;
        public endy: number;
        public endz: number;
        public id: number

        public pointVec: Array<Vector3D>;

        constructor($x: number = 0, $y: number = 0, $z: number = 0) {
            super($x, $y, $z);
            this.beginx = -10;
            this.beginy = -10;
            this.beginz = -10;

            this.endx = 10
            this.endy = 10
            this.endz = 10
        }

    }

}