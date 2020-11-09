declare module Pan3d {
    class SkillData extends ResCount {
        data: any;
        private srcList;
        srcOutAry: Array<Skill>;
        addSrcSkill($skill: Skill): void;
        destory(): void;
        testDestory(): boolean;
    }
}
