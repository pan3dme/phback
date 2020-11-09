declare module Pan3d {
    class Display3DBallPartilce extends Display3DParticle {
        constructor();
        readonly balldata: ParticleBallData;
        creatData(): void;
        setVa(): void;
        setVaCompress(): void;
        resetVa(): void;
        setVc(): void;
        updateWatchCaramMatrix(): void;
        updateAllRotationMatrix(): void;
        readonly particleBallData: ParticleBallGpuData;
    }
}
