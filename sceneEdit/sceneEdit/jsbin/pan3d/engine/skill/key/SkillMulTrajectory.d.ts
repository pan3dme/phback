declare module Pan3d {
    class SkillMulTrajectory extends SkillTrajectory implements IMulBind {
        activeList: Array<Object3D>;
        currentPosList: Array<Vector3D>;
        pathMul: SkillMulPath;
        update(t: number): void;
        getSunType(): number;
        addToRender(): void;
        setMulPlayData($activeList: Array<Object3D>, $target: Object3D, $removeCallFun: Function, types?: number): void;
        getMulSocket(ary: Array<Vector3D>): void;
    }
}
