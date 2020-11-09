declare module Pan3d {
    class SkillVo {
        action: string;
        skillname: string;
        keyAry: Array<SkillKeyVo>;
        shockAry: Array<SkillShockVo>;
        types: number;
        bloodTime: number;
        static defaultBloodTime: number;
        sound: SkillKeyVo;
        setData($info: any): void;
        private getShockAry;
        private getFixEffect;
        private getTrajectoryDynamicTarget;
    }
    class SkillType {
        static TrajectoryDynamicTarget: number;
        static FixEffect: number;
        static TrajectoryDynamicPoint: number;
    }
}
