declare module Pan3d {
    class SkillTrajectory extends SkillKey implements IBind {
        active: Object3D;
        target: Object3D;
        data: SkillTrajectoryTargetKeyVo;
        protected _currentPos: Vector3D;
        rotationMatrix: Matrix3D;
        protected _socketMaxrix: Matrix3D;
        protected _currentTargetPos: Vector3D;
        endParticle: CombineParticle;
        protected path: SkillPath;
        constructor();
        update(t: number): void;
        reset(): void;
        endPlayFun(e?: BaseEvent): void;
        setCurrentPos(): boolean;
        addToRender(): void;
        getSocket(socketName: string, resultMatrix: Matrix3D): void;
        getSunType(): number;
        setInfo(obj: SkillKeyVo): void;
        setPlayData($active: Object3D, $target: Object3D, $removeCallFun: Function, types?: number, $bloodFun?: Function): void;
        destory(): void;
    }
}
