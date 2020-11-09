declare module Pan3d {
    class GroundDataMesh {
        tx: number;
        ty: number;
        idBitmap: BitMapData;
        infoBitmap: BitMapData;
        sixurl: string;
        private mekeUseTexture;
        calibration(): void;
        static meshAllgroundData($byte: Pan3dByteArray): Array<GroundDataMesh>;
    }
    class TerrainDisplay3DSprite extends Display3DSprite {
        private groundShader;
        private baseSixteenRes;
        private idMapPicDataTexture;
        private infoMapPicDataTexture;
        constructor();
        update(): void;
        private upDataToDraw;
        setGrounDataMesh($groundDataMesh: GroundDataMesh): void;
    }
}
