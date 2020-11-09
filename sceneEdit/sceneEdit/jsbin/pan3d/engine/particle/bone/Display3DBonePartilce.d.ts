declare module Pan3d {
    class Display3DBoneShader extends Shader3D {
        static Display3DBoneShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        static shader_mat4: {
            viewMatrix3D: number;
            camMatrix3D: number;
            posMatrix3D: number;
        };
        getMat4Str(key: string): string;
        static getVcSize(): number;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class Display3DBonePartilce extends Display3DParticle {
        constructor();
        readonly modeldata: ParticleBoneData;
        creatData(): void;
        update(): void;
        private skipNum;
        setVc(): void;
        setVa(): void;
        resetVa(): void;
    }
}
