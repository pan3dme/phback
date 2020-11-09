declare module Pan3d {
    class ParticleBoneData extends ParticleData {
        _maxAnimTime: number;
        getParticle(): Display3DParticle;
        destory(): void;
        meshData: MeshData;
        animData: AnimData;
        objScale: number;
        setAllByteInfo($byte: Pan3dByteArray): void;
        initVcData(): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
        private readFrameQua;
        uploadGpu(): void;
        private uploadMesh;
        regShader(): void;
    }
}
