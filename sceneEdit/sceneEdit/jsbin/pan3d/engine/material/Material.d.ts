declare module Pan3d {
    class Material extends ResCount {
        url: string;
        shaderStr: string;
        texList: Array<TexItem>;
        constList: Array<ConstItem>;
        hasTime: boolean;
        timeSpeed: number;
        blendMode: number;
        backCull: boolean;
        killNum: number;
        hasVertexColor: boolean;
        usePbr: boolean;
        useNormal: boolean;
        roughness: number;
        shader: Shader3D;
        writeZbuffer: boolean;
        hasFresnel: boolean;
        useDynamicIBL: boolean;
        normalScale: number;
        lightProbe: boolean;
        useKill: boolean;
        directLight: boolean;
        noLight: boolean;
        scaleLightMap: boolean;
        fogMode: number;
        fcNum: number;
        fcIDAry: Array<number>;
        hasParticleColor: boolean;
        locationDic: Object;
        fcData: Float32Array;
        sceneNumId: number;
        update(t: number): void;
        updateTime(t: number): void;
        updateCam(x: number, y: number, z: number): void;
        updateScene(): void;
        initFcData(): void;
        setCompileData(_compileData: any): void;
        setByteData(byte: Pan3dByteArray): void;
        private readConstLis;
        private readTexList;
        destory(): void;
    }
}
