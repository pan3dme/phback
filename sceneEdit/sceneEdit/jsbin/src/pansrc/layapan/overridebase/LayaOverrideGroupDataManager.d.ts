declare module layapan_me {
    class LayaGroupRes extends Pan3d.GroupRes {
        constructor();
        scene: LayaOverride2dSceneManager;
        readParticle(): void;
    }
    class LayaOverrideGroupDataManager extends Pan3d.GroupDataManager {
        scene: LayaOverride2dSceneManager;
        getGroupData($url: string, $fun: Function): void;
    }
}
