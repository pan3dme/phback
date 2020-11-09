declare module maineditor {
    import Display3DSprite = Pan3d.Display3DSprite;
    class SkillSpriteDisplay extends Display3DSprite {
        constructor();
        updateMatrix(): void;
        private waitLoadUrl;
        addSkillByUrl($url: any): void;
        addStage(): void;
        skillStaticMesh: pack.SkillStatcMesh;
        private roleChar;
        private skipNum;
        private playNextSkill;
        private skillActionItem;
        private loadTempByUrl;
    }
}
