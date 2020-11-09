/**
* name
*/
declare module layapan_me {
    import MeshData = Pan3d.MeshData;
    import GroupRes = Pan3d.GroupRes;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material;
    import MaterialBaseParam = Pan3d.MaterialBaseParam;
    import Skill = Pan3d.Skill;
    class LayaSceneBaseChar extends Pan3d.Display3dMovie {
        private _avatar;
        _visible: boolean;
        changeColor: Array<number>;
        constructor();
        alpha: number;
        private _alpha;
        updateMaterialMesh($mesh: MeshData): void;
        skillVo: Skill;
        protected _walkPath: Array<Vector3D>;
        playSkill($skill: Skill): void;
        setMaterialTextureAlpha($material: Material, $mp?: MaterialBaseParam): void;
        private static alphaShader;
        private makeAlphaShader;
        visible: boolean;
        setAvatar(num: number): void;
        shadow: boolean;
        update(): void;
        protected getSceneCharAvatarUrl(num: number): string;
        protected getSceneCharWeaponUrl(num: number, $suffix?: string): string;
        isPlaying(): boolean;
        protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void;
        removeStage(): void;
        px: number;
        py: number;
        pz: number;
        addSkinMeshParticle(): void;
    }
}
