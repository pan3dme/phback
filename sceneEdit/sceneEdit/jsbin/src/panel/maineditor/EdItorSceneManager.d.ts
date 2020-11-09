declare module maineditor {
    import FBO = Pan3d.FBO;
    import Matrix3D = Pan3d.Matrix3D;
    import SceneManager = layapan_me.LayaOverride2dSceneManager;
    class EdItorSceneManager extends SceneManager {
        constructor();
        fbo: FBO;
        private updateDepthTexture;
        renderToTexture($m?: Matrix3D): void;
        textureRes: Pan3d.TextureRes;
        update(): void;
        getGroundPos($mouse: Vector2D): Vector3D;
        playLyf($url: string, $pos: Pan3d.Vector3D, $r?: number): void;
    }
}
