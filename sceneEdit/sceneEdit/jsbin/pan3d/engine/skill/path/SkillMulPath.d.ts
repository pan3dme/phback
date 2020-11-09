declare module Pan3d {
    class SkillMulPath extends SkillPath {
        private skillMul;
        private currentPosAry;
        private alltime;
        private lastTime;
        private maxV3d;
        private allTimeList;
        resultAry: Array<Array<Array<number>>>;
        setInitCurrentPos(ary: Array<Vector3D>): void;
        private directAry;
        add(): void;
        setAllData(): void;
        update(t: number): void;
        setData($skillTrajectory: SkillTrajectory, $endFun: Function, $currentPos: Vector3D, $rotationMatrix: Matrix3D, $currentTargetPos: Vector3D): void;
        applyData(ary: Array<Vector3D>): void;
        reset(): void;
    }
}
