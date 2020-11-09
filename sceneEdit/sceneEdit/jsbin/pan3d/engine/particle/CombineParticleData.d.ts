declare module Pan3d {
    class CombineParticleData extends ResCount {
        maxTime: number;
        dataAry: Array<ParticleData>;
        destory(): void;
        getCombineParticle(): CombineParticle;
        setDataByte(byte: Pan3dByteArray): void;
        private getParticleDataType;
    }
}
