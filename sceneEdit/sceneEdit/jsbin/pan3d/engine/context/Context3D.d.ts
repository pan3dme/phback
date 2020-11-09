declare module Pan3d {
    class GlReset {
        static saveBasePrarame(gl: WebGLRenderingContext): void;
        private static GlStencilTest;
        private static GlarrayBuffer;
        private static GlelementArrayBuffer;
        private static GlCullFace;
        private static GlDepthTest;
        private static GlfrontFace;
        private static Glglviewport;
        private static GlcullFaceModel;
        private static GldepthWriteMask;
        private static GlsFactor;
        private static GldFactor;
        private static Glprogram;
        static resetBasePrarame(gl: WebGLRenderingContext): void;
    }
    class Context3D {
        renderContext: WebGLRenderingContext;
        _contextSetTest: ContextSetTest;
        init($caves: HTMLCanvasElement): void;
        resetSize($width: number, $height: number): void;
        uploadBuff3D($jsData: any): WebGLBuffer;
        uploadBuff3DArrayBuffer($jsData: ArrayBuffer): WebGLBuffer;
        uploadBuff3DByBuffer($buffData: WebGLBuffer, $jsData: Array<number>): void;
        uploadIndexBuff3D($iStrData: Array<number>): WebGLBuffer;
        uploadIndexBuff3DByBuffer($iBuffer: WebGLBuffer, $iStrData: Array<number>): void;
        clearContext(): void;
        update(): void;
        updateFBO(fbo: FBO): void;
        setDepthTest(tf: boolean): void;
        setWriteDepth(tf: boolean): void;
        setBlendParticleFactors(type: number): void;
        setProgram($program: WebGLProgram): void;
        getLocation($program: WebGLProgram, $name: string): WebGLUniformLocation;
        /** ***************************setvc */
        setVcMatrix3fv($program: Shader3D, $name: string, $m: Float32Array): void;
        setVcMatrix4fv($program: Shader3D, $name: string, $m: Float32Array): void;
        setVpMatrix($program: Shader3D, $m: Float32Array): void;
        setVc4fv($program: Shader3D, $name: string, $m: any): void;
        setVc1fv($program: Shader3D, $name: string, $m: any): void;
        setVc3fv($program: Shader3D, $name: string, $m: any): void;
        setVc2fv($program: Shader3D, $name: string, $m: any): void;
        setVcFloat($program: Shader3D, $name: string, $m: any): void;
        setuniform1f($program: Shader3D, $name: string, a: number): void;
        /** ******************************************* end setvc */
        setuniform3f($program: Shader3D, $name: string, a: number, b: number, c: number): void;
        setVcMatrix4fvLocation($location: WebGLUniformLocation, $m: Float32Array): void;
        setVc2f($program: Shader3D, $name: string, a: number, b: number): void;
        setVcMatrix2fvLocation($location: WebGLUniformLocation, $m: Float32Array): void;
        setVc4fvLocation($location: WebGLUniformLocation, $m: Float32Array): void;
        setVa(dataId: number, dataWidth: number, dataBuffer: WebGLBuffer): void;
        pushVa(dataBuffer: WebGLBuffer): boolean;
        setVaOffset(dataId: number, dataWidth: number, stride: number, offset: number): void;
        clearVa(dataId: number): void;
        drawCall($iBuffer: WebGLBuffer, $numTri: number): void;
        drawLine($iBuffer: WebGLBuffer, $numTri: number): void;
        private setTextureNum;
        private setProgramNum;
        setRenderTexture($program: Shader3D, $name: string, $textureObject: WebGLTexture, $level: number, test?: boolean): void;
        setRenderTextureCube($program: WebGLProgram, $name: string, $textureObject: WebGLTexture, $level: number): void;
        updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, $img: any): void;
        getTexture($img: any, $wrap?: number, $filter?: number, $mipmap?: number): WebGLTexture;
        creatTexture($width: number, $height: number, $wrap?: number): WebGLTexture;
        createFramebuffer(): WebGLFramebuffer;
        deleteBuffer(buffer: WebGLBuffer): void;
        deleteTexture(texture: WebGLTexture): void;
        deleteShader(shader: Shader3D): void;
        cullFaceBack(tf: boolean): void;
        setCullFaceModel(value: number): void;
        clearTest(): void;
    }
    class FBO {
        width: number;
        height: number;
        frameBuffer: WebGLFramebuffer;
        depthBuffer: WebGLRenderbuffer;
        texture: WebGLRenderbuffer;
        color: Vector3D;
        constructor(w?: number, h?: number);
        resetSize(w: number, h: number): void;
        private makeSize;
    }
    class ContextSetTest {
        private _textureDic;
        private _program;
        vaAry: Array<boolean>;
        private _vabuffer;
        private _blendType;
        private _cullType;
        private _zbufferType;
        private _vpMatrix;
        testTexture($name: string, $textureObject: WebGLTexture): boolean;
        testProgram($program: WebGLProgram): boolean;
        testVa(dataBuffer: WebGLBuffer): boolean;
        clear(): void;
        testBlend($type: number): boolean;
        testCull($type: boolean): boolean;
        testZbuffer($type: boolean): boolean;
        testVp(): boolean;
    }
}
