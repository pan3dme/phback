declare module Pan3d {
    class Skill extends ResCount {
        protected skillVo: SkillVo;
        name: string;
        key: string;
        isDeath: boolean;
        keyAry: Array<SkillKey>;
        completeNum: number;
        src: boolean;
        active: Object3D;
        completeFun: Function;
        time: number;
        static MaxTime: number;
        targetFlag: number;
        targetShockFlag: number;
        trajectoryAry: Array<SkillTrajectory>;
        protected _skillData: SkillData;
        batterObj: any;
        tbSkillId: number;
        soundPlay: boolean;
        needSound: boolean;
        hasDestory: boolean;
        actionEnd: boolean;
        constructor();
        setData($data: any, $skillData: SkillData): void;
        getBloodTime(): number;
        play(): void;
        setKeyAry(): void;
        setendParticleRoation($vect3d: Vector3D): void;
        removeKey($key: SkillKey): void;
        /**强制移除技能 */
        removeSkillForce(): void;
        skillComplete(): void;
        reset(): void;
        update(t: number): void;
        updateTrajector(t: number): void;
        private getKeyTarget;
        private getShockTarget;
        private getSound;
        configFixEffect($active: Object3D, $completeFun?: Function, $posObj?: Array<Vector3D>): void;
        configTrajectory($active: Object3D, $target: Object3D, $completeFun?: Function, types?: number, $bloodFun?: Function): void;
        configMulTrajectory($activeList: Array<Object3D>, $active: Object3D, $target: Object3D, $completeFun?: Function): void;
        removeTrajectory($skilltra: SkillTrajectory): void;
        destory(): void;
    }
}
