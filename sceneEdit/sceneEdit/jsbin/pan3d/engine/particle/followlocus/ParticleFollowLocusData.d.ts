declare module Pan3d {
    class ParticleFollowLocusData extends ParticleData {
        _fenduanshu: number;
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: Pan3dByteArray): void;
        uploadGpu(): void;
        protected pushToGpu(): void;
        initVcData(): void;
        regShader(): void;
    }
}
