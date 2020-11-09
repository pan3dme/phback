declare module Pan3d {
    class SkillKey {
        time: number;
        particle: CombineParticle;
        removeCallFun: Function;
        constructor();
        addToRender(): void;
        setInfo(obj: SkillKeyVo): void;
        reset(): void;
        destory(): void;
    }
}
