declare module Pan3d {
    class ParticleModelData extends ParticleData {
        _maxAnimTime: number;
        _depthMode: number;
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: Pan3dByteArray): void;
        initVcData(): void;
        uploadGpu(): void;
        regShader(): void;
        setFloat32Vec(key: string, ary: Array<number>): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
    }
}
