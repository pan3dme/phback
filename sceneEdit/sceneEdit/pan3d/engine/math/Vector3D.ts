module Pan3d {
    export class Vector3D {
        x: number = 0;
        y: number = 0;
        z: number = 0;
        w: number = 1;
        public static X_AXIS: Vector3D = new Vector3D(1, 0, 0);
        public static Y_AXIS: Vector3D = new Vector3D(0, 1, 0);
        public static Z_AXIS: Vector3D = new Vector3D(0, 0, 1);
        constructor($x: number = 0, $y: number = 0, $z: number = 0, $w: number = 1) {
            this.x = $x;
            this.y = $y;
            this.z = $z;
            this.w = $w;
        }

        public normalize(): void {
            var le: number = this.length;
            if (le == 0) {
                return;
            }
            this.scaleBy(1 / le);
        }

        public get length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }

        public scaleBy(value: number): void {
            this.x *= value;
            this.y *= value;
            this.z *= value;
            this.w *= value;
        }
        public divideScalar(value: number): void {
            if (value != 0) {
                this.x = this.x / value;
                this.y = this.y / value;
                this.z = this.z / value;
            } else {
                this.x = 0;
                this.y = 0;
                this.z = 0;
            }


        }
        public distanceToSquared(v: Vector3D): number {
            return Vector3D.distance(this, v)

        }
        public scaleByW(): void {
            this.x *= this.w;
            this.y *= this.w;
            this.z *= this.w;
        }

        public add(value: Vector3D): Vector3D {
            return new Vector3D(this.x + value.x, this.y + value.y, this.z + value.z);
        }

        public subtract(value: Vector3D): Vector3D {
            return new Vector3D(this.x - value.x, this.y - value.y, this.z - value.z);
        }

        public addByNum($x: number, $y: number, $z: number, $w: number = 0): void {
            this.x += $x;
            this.y += $y;
            this.z += $z;
            this.w += $w;
        }

        public setTo($x: number, $y: number, $z: number): void {
            this.x = $x;
            this.y = $y;
            this.z = $z;
        }

        public setByte(byte: Pan3dByteArray): void {
            this.x = byte.readFloat();
            this.y = byte.readFloat();
            this.z = byte.readFloat();
        }

        public cross(value: Vector3D): Vector3D {
            return new Vector3D(this.y * value.z - this.z * value.y,
                this.z * value.x - this.x * value.z,
                this.x * value.y - this.y * value.x);
        }

        public dot(value: Vector3D): number {
            return this.x * value.x + this.y * value.y + this.z * value.z;
        }

        public clone(): Vector3D {
            return new Vector3D(this.x, this.y, this.z);
        }

        public static distance(v1: any, v2: any): number {
            var x1: number = v1.x - v2.x;
            var y1: number = v1.y - v2.y;
            var z1: number = v1.z - v2.z;
            return Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1);
        }

        public toString(): String {
            return "Vector3D(" + String(this.x) + "," + String(this.y) + "," + String(this.z) + "," + String(this.w) + ")";
        }

        public static dotMulVector(a: Vector3D, b: Vector3D): number {
            return a.x * b.x + a.y * b.y + a.z * b.z;
        }

        public static getNrmByTwoVect(v0: Vector3D, v1: Vector3D): Vector3D {
            var nrm3d: Vector3D = v1.subtract(v0)
            nrm3d.normalize()
            return nrm3d
        }
            
        public static calTriNormal(v0: Vector3D, v1: Vector3D, v2: Vector3D, isNormallize: boolean = false): Vector3D {
            var p1: Vector3D = v1.subtract(v0)
            var p2: Vector3D = v2.subtract(v1)
            var nrmVec: Vector3D = p1.cross(p2)
            if (isNormallize) {
                nrmVec.normalize();
            }
            return nrmVec;
        }

		/**
		 *  根据三个点确定的平面球 另外一点在面的垂足 
		 * @param targetPoint
		 * @param a
		 * @param b
		 * @param c
		 * @return 
		 * 
		 */
        public static   getPointPedalInPlane(targetPoint: Vector3D, a: Vector3D, b: Vector3D, c: Vector3D): Vector3D {
            var planeNomal: Vector3D = this.calTriNormal(a, b, c, true);
            var plane: Array<Vector3D> = [];
            plane.push(a, b, c);
            return this.getProjPosition(planeNomal, targetPoint, plane);
        }
		/**
		 * p点在三角形b确定的平面内的投影坐标点 
		 * @param bNomal
		 * @param p
		 * @param b
		 * @return 
		 * 
		 */
        public static getProjPosition(bNomal: Vector3D, targetPoint: Vector3D, bTriPlane: Array<Vector3D>): Vector3D {
            var checkPoint: Vector3D = targetPoint;
            var pedal: number = (bNomal.x * (bTriPlane[0].x - checkPoint.x) + bNomal.y * (bTriPlane[0].y - checkPoint.y) + bNomal.z * (bTriPlane[0].z - checkPoint.z)) / (bNomal.x * bNomal.x + bNomal.y * bNomal.y + bNomal.z * bNomal.z);
            var pedalVector3d: Vector3D = new Vector3D(checkPoint.x + pedal * bNomal.x, checkPoint.y + pedal * bNomal.y, checkPoint.z + pedal * bNomal.z);
            return pedalVector3d;
        }

    }
}