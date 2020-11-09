declare module Pan3d {
    class SkillEffect extends SkillKey {
        active: Object3D;
        addToRender(): void;
        protected onPlayCom(event?: Event): void;
    }
}
