declare module Pan3d {
    class Display3dBatchMovie extends Display3dMovie {
        batchNum: number;
        batchPos: Array<Movie3D>;
        constructor();
        fileScale: number;
        addSun($obj: Movie3D): void;
        setVcMatrix($mesh: MeshData): void;
        setLightProbeVc($material: Material): void;
        setVa($mesh: MeshData): void;
        addStage(): void;
        removeStage(): void;
    }
    class Movie3D extends Object3D {
        private _shadow;
        posData: Array<number>;
        retinueShadowFix: Vector3D;
        target: Vector3D;
        hasReach: boolean;
        shadow: boolean;
        _fileScale: number;
        fileScale: number;
        scale: number;
        x: number;
        y: number;
        z: number;
        add(): void;
        remove(): void;
    }
}
