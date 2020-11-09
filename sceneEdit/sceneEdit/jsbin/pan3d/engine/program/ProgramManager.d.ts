declare module Pan3d {
    class ProgrmaManager extends ResGC {
        private static _instance;
        constructor();
        static getInstance(): ProgrmaManager;
        getProgram($str: string): Shader3D;
        registe($str: any, $shader3D: Shader3D): void;
        getMaterialProgram(key: String, shaderCls: any, $material: Material, paramAry?: any, parmaByFragmet?: boolean): Shader3D;
        outShader($str: string): void;
        gc(): void;
    }
}
