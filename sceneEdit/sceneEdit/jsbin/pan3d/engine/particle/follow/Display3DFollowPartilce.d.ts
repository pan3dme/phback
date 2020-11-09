declare module Pan3d {
    class Display3DFollowPartilce extends Display3DBallPartilce {
        private _bindMatrixAry;
        private _bindFlagAry;
        private flag;
        constructor();
        readonly followdata: ParticleFollowData;
        creatData(): void;
        onCreated(): void;
        setVc(): void;
        private initBingMatrixAry;
        updateBind(): void;
        updateMatrix(): void;
        updateAllRotationMatrix(): void;
        reset(): void;
        updateWatchCaramMatrix(): void;
    }
}
