declare module Pan3d {
    class Unit extends GuidObject {
        path: Array<Vector2D>;
        sceneChar: SceneChar;
        uintGuid: number;
        isMain: boolean;
        private originalRotation;
    }
}
