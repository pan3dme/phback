declare module Pan3d {
    class Camera3D extends Object3D {
        cameraMatrix: Matrix3D;
        private _distance;
        lookAtTarget: Object3D;
        private _astarRect;
        cavanRect: Rectangle;
        scene2dScale: number;
        sceneViewHW: number;
        offset: Vector3D;
        constructor();
        distance: number;
        lookAt($target: Object3D): void;
        private _midPos;
        private _scaleVec;
        astarRect: Rectangle;
        private lastFoucs3D;
        needChange: boolean;
        update(): void;
        readonly postion: Vector3D;
    }
}
