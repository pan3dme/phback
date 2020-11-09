declare module Pan3d {
    class SceneBaseChar extends Display3dMovie {
        private _avatar;
        _visible: boolean;
        visible: boolean;
        setAvatar(num: number): void;
        update(): void;
        protected getSceneCharAvatarUrl(num: number): string;
        protected getSceneCharWeaponUrl(num: number, $suffix?: string): string;
    }
}
