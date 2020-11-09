declare module Pan3d {
    class Display3DFacetParticle extends Display3DParticle {
        private _lifeVisible;
        private _resultUvVec;
        constructor();
        readonly facetdata: ParticleFacetData;
        creatData(): void;
        update(): void;
        reset(): void;
        setVc(): void;
        setVa(): void;
        updateRotaionMatrix(): void;
        updateUV(): void;
    }
}
