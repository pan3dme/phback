declare module scene2d_me {
    class AppDataArpg {
        static mainChar: Pan3d.SceneChar;
        static sceneStagePos: Pan3d.Vector2D;
        static lockMainChar: boolean;
        static math3dto2Darpg($p: Pan3d.Vector3D): Pan3d.Vector2D;
        static getScene2DBy3Dpostion($v3d: Pan3d.Vector3D): Pan3d.Vector2D;
        private static triItem;
        static math2Dto3DGroundarpg($p: Pan3d.Vector2D): Pan3d.Vector3D;
        private static math2dto3Darpg;
        private static _vpMatrixInver;
        static refrishPos($vec: Pan3d.Vector2D): void;
        static resetSelfPosCenter(): void;
    }
}
