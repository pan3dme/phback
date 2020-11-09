declare module Pan3d {
    class Object3D extends EventDispatcher {
        protected _x: number;
        protected _y: number;
        protected _z: number;
        rx: number;
        ry: number;
        rz: number;
        protected _scaleX: number;
        protected _scaleY: number;
        protected _scaleZ: number;
        protected _rotationX: number;
        protected _rotationY: number;
        protected _rotationZ: number;
        posMatrix: Matrix3D;
        constructor($x?: number, $y?: number, $z?: number);
        toStringout(): String;
        x: number;
        y: number;
        z: number;
        scale: number;
        scaleX: number;
        scaleY: number;
        scaleZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
        px: number;
        py: number;
        pz: number;
        updateMatrix(): void;
        updateRotationMatrix(): void;
    }
}
