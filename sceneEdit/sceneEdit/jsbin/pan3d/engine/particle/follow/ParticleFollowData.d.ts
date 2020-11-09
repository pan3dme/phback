declare module Pan3d {
    class ParticleFollowData extends ParticleBallData {
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: Pan3dByteArray): void;
        regShader(): void;
    }
}
