declare module layapan_me {
    import Display3dMovie = Pan3d.Display3dMovie;
    class LayaOverride2dSceneManager extends scene3d_me.OverrideSceneManager {
        private static sceneNum;
        constructor();
        shadowManager: LayaOverrideShadowManager;
        groupDataManager: LayaOverrideGroupDataManager;
        skillManager: LayaOverride2dSkillManager;
        particleManager: LayaOverride2dParticleManager;
        static initConfig(): void;
        update(): void;
        changeBloodManager($bloodManager: Pan3d.BloodManager): void;
        addMovieDisplay($display: Display3dMovie): void;
        loadSceneConfigCom(obj: any): void;
        playLyf($url: string, $pos: Pan3d.Vector3D, $r?: number): void;
        charPlaySkill($char: layapan_me.LayaSceneChar, $skillfile: string): void;
        protected onPlayCom(value: Pan3d.BaseEvent): void;
        cameraMatrix: Pan3d.Matrix3D;
        viewMatrx3D: Pan3d.Matrix3D;
        upFrame(): void;
    }
}
