declare module xyz {
    import Vector2D = Pan3d.Vector2D;
    import Matrix3D = Pan3d.Matrix3D;
    import Rectangle = Pan3d.Rectangle;
    import Display3D = Pan3d.Display3D;
    import SceneManager = Pan3d.SceneManager;
    class TooMathHitModel {
        private static getViewMatrx3D;
        static testHitModel(display3D: Display3D, scene: SceneManager, mouseV2: Vector2D): number;
        static getCamFontDistent(scene: SceneManager, mouseV2: Vector2D, $depht: number): Vector3D;
        static math3DWorldtoDisplay2DPos($pos: Vector3D, mat: Matrix3D, rect: Rectangle): Vector2D;
        static mathDisplay2Dto3DWorldPos($point: Vector2D, scene: SceneManager): Vector3D;
    }
}
