declare module Pan3d {
    class ParticleLocusballData extends ParticleBallData {
        protected _posAry: Array<number>;
        protected _angleAry: Array<number>;
        protected _tangentAry: Array<number>;
        protected _tangentSpeed: number;
        getParticle(): Display3DParticle;
        initBasePos(): void;
        initSpeed(): void;
        setAllByteInfo($byte: Pan3dByteArray): void;
    }
}
