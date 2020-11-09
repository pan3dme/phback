declare module layapan_me {
    import SkillData = Pan3d.SkillData;
    class OverrideSkill extends Pan3d.Skill {
        skillManager: LayaOverride2dSkillManager;
        baseName: string;
        constructor($skillManager?: LayaOverride2dSkillManager);
        skillComplete(): void;
        setData($data: any, $skillData: SkillData): void;
        setKeyAry(): void;
    }
}
