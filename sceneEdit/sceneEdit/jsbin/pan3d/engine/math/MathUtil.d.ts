declare module Pan3d {
    class MathUtil {
        /**
         * 2D坐标转换成3D坐标，当然要给一个相离镜头的深度
         * @param $point  2d位置是场景的坐标，
         * @param $depht  默认深度为500,
         * @return  3D的坐标
         *
         */
        static mathDisplay2Dto3DWorldPos($point: Vector2D, $depht?: number): Vector3D;
        static getGroundPanelPos($evt: any): Vector3D;
        private static gettempPos;
        static math3DWorldtoDisplay2DPos($pos: Vector3D): Vector2D;
        static pointToLine2dDis(point1: Vector2D, point2: Vector2D, out: Vector2D): number;
        static argbToHex(a: number, r: number, g: number, b: number): number;
        static hexToArgb(expColor: number): Vector3D;
        /**
     *
     * @param linePoint_a  线起点
     * @param linePoint_b  线结点
     * @param planePoint  构成面的三个点
     * @return 交点坐标
     *
     */
        static getLinePlaneInterectPointByTri(linePoint_a: Vector3D, linePoint_b: Vector3D, planePoint: Array<Vector3D>): Vector3D;
        /**
         * 空间一条射线和平面的交点
         * @param linePoint_a  过直线的一点
         * @param linePoint_b  过直线另一点
         * @param planePoint   过平面一点
         * @param planeNormal  平面的法线
         * @return
         *
         */
        private static getLineAndPlaneIntersectPoint;
        static lookAt(eyePos: Vector3D, lookAt: Vector3D): Matrix3D;
        static MathCam(_Cam: Camera3D): void;
        private getCamData;
    }
}
