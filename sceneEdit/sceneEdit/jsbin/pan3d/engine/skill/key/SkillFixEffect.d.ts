declare module Pan3d {
    class SkillBugBind implements IBind {
        bindMatrix: Matrix3D;
        getSocket(socketName: string, resultMatrix: Matrix3D): void;
        getSunType(): number;
    }
    class SkillFixEffect extends SkillEffect {
        pos: Vector3D;
        rotation: Vector3D;
        outPos: Vector3D;
        hasSocket: boolean;
        socket: string;
        setInfo(obj: SkillKeyVo): void;
        addToRender(): void;
    }
}
