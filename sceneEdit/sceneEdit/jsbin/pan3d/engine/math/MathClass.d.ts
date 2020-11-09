declare module Pan3d {
    class MathClass {
        constructor();
        static getCamView(_Cam: Camera3D, _focus_3d: Object3D): Float32Array;
        static SetShock: boolean;
        private static camOffSetShock;
        static updateVp(): void;
        static MathCam(_Cam: Camera3D): void;
        static viewBoxVecItem: Array<Vector3D>;
        static lastViewScale: Vector2D;
        static GetViewHitBoxData($far: number): void;
        static GetViewHitBoxDataCopy($dis: number): void;
        private static gettempPos;
        static mathmidpoint(a: any, b: any, t: number): void;
        static drawbezier(_array: Array<any>, _time: number): Object;
        static math_distance(x1: number, y1: number, x2: number, y2: number): number;
        static math_angle(x1: number, y1: number, x2: number, y2: number): number;
        static easeIn(t: number, b: number, c: number, d: number): number;
        static easeOut(t: number, b: number, c: number, d: number): number;
        static easeInOut(t: number, b: number, c: number, d: number): number;
        /**
         * 2D坐标转换成3D坐标，当然要给一个相离镜头的深度
         * @param $stage3DVO 为stage3d的坐标信息
         * @param $point  2d位置是场景的坐标，
         * @param $depht  默认深度为500,
         * @return  3D的坐标
         *
         */
        static mathDisplay2Dto3DWorldPos($stage3DVO: Rectangle, $point: Vector2D, $depht?: number): Vector3D;
    }
}
