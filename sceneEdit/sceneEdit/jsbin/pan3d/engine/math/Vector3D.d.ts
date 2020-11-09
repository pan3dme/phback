declare module Pan3d {
    class Vector3D {
        x: number;
        y: number;
        z: number;
        w: number;
        static X_AXIS: Vector3D;
        static Y_AXIS: Vector3D;
        static Z_AXIS: Vector3D;
        constructor($x?: number, $y?: number, $z?: number, $w?: number);
        normalize(): void;
        readonly length: number;
        scaleBy(value: number): void;
        divideScalar(value: number): void;
        distanceToSquared(v: Vector3D): number;
        scaleByW(): void;
        add(value: Vector3D): Vector3D;
        subtract(value: Vector3D): Vector3D;
        addByNum($x: number, $y: number, $z: number, $w?: number): void;
        setTo($x: number, $y: number, $z: number): void;
        setByte(byte: Pan3dByteArray): void;
        cross(value: Vector3D): Vector3D;
        dot(value: Vector3D): number;
        clone(): Vector3D;
        static distance(v1: any, v2: any): number;
        toString(): String;
        static dotMulVector(a: Vector3D, b: Vector3D): number;
        static getNrmByTwoVect(v0: Vector3D, v1: Vector3D): Vector3D;
        static calTriNormal(v0: Vector3D, v1: Vector3D, v2: Vector3D, isNormallize?: boolean): Vector3D;
        /**
         *  根据三个点确定的平面球 另外一点在面的垂足
         * @param targetPoint
         * @param a
         * @param b
         * @param c
         * @return
         *
         */
        static getPointPedalInPlane(targetPoint: Vector3D, a: Vector3D, b: Vector3D, c: Vector3D): Vector3D;
        /**
         * p点在三角形b确定的平面内的投影坐标点
         * @param bNomal
         * @param p
         * @param b
         * @return
         *
         */
        static getProjPosition(bNomal: Vector3D, targetPoint: Vector3D, bTriPlane: Array<Vector3D>): Vector3D;
    }
}
