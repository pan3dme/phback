declare module layapan_me {
    class OverrideSkillTrajectory extends Pan3d.SkillTrajectory {
        skill: OverrideSkill;
        reset(): void;
        addToRender(): void;
        endPlayFun(e?: Pan3d.BaseEvent): void;
        setInfo(obj: Pan3d.SkillKeyVo): void;
    }
}
