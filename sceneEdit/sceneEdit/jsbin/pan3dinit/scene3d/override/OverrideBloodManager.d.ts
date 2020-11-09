declare module scene3d_me {
    class ExpTextJumpUiDrawAndRefreash256 extends Pan3d.ExpTextJumpUiDrawAndRefreash {
        protected drawTxtBydigitalAndtext($vo: Pan3d.TextJumpUiVo): number;
    }
}
declare module scene3d_me {
    class OverrideBloodManager extends Pan3d.BloodManager {
        static getInstance(): OverrideBloodManager;
        private _jumpText256_256;
        constructor();
        setExpJump256_256Num($textJumpUiVo: Pan3d.TextJumpUiVo): void;
    }
}
