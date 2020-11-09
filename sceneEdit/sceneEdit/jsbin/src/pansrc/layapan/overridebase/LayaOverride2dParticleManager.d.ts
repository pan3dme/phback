declare module layapan_me {
    import Shader3D = Pan3d.Shader3D;
    import Display3DParticle = Pan3d.Display3DParticle;
    import CombineParticle = Pan3d.CombineParticle;
    import Pan3dByteArray = Pan3d.Pan3dByteArray;
    import ParticleManager = Pan3d.ParticleManager;
    import TextureRes = Pan3d.TextureRes;
    class Frame3DParticleShader extends Shader3D {
        static Frame3DParticleShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class Frame3DParticle extends Display3DParticle {
        private shader;
        private beginTime;
        private static baseFrameObjData;
        constructor();
        updateTime(t: number): void;
        private objData;
        protected initData(): void;
        private speedTm;
        private picNum;
        private loop;
        private makeFrameParticle;
        static getFrameParticle(pathurl: string, fileBaseName: string, info: any): CombineParticle;
        private loadTexture;
        private frameTextureItem;
        _uvTextureRes: TextureRes;
        upToGpu(): void;
        update(): void;
    }
    class AtlasFrameVo {
        frame: any;
        sourceSize: any;
        spriteSourceSize: Pan3d.Vector2D;
        key: string;
        meshData(value: any): void;
    }
    class Frame3DAtlasShader extends Shader3D {
        static Frame3DAtlasShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class Frame3DAtlasParticle extends Display3DParticle {
        private shader;
        private beginTime;
        private static baseFrameObjData;
        constructor();
        updateTime(t: number): void;
        private objData;
        protected initData(): void;
        private timeLen;
        private loop;
        private frameScale;
        private isShow;
        private makeFrameParticle;
        private frameInfoItem;
        private LoadAtlas;
        static getFrameParticle(pathurl: string, fileBaseName: string, info: any): CombineParticle;
        _uvTextureRes: TextureRes;
        upToGpu(): void;
        update(): void;
        private uvchangeData;
    }
    class LayaOverride2dParticleManager extends ParticleManager {
        constructor();
        getParticleByte($url: string): CombineParticle;
        registerUrl($url: string): void;
        releaseUrl($url: string): void;
        addResByte($url: string, $data: Pan3dByteArray): void;
    }
}
