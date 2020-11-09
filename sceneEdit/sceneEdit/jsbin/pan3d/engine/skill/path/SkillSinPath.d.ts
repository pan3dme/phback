declare module Pan3d {
    class SkillSinPath extends SkillPath {
        private alltime;
        private lastTime;
        protected basePos: Vector3D;
        add(): void;
        update(t: number): void;
        setApplyPos($offset: Vector3D): void;
        getOffset(ypos: number): Vector3D;
        reset(): void;
    }
    class SkillCosPath extends SkillSinPath {
        getOffset(ypos: number): Vector3D;
    }
}
