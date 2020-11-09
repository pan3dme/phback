declare module pack {
    class PackMaterialManager {
        private static _instance;
        static getInstance(): PackMaterialManager;
        constructor();
        private dic;
        private loadDic;
        replaceMaterialByUrl($url: string): void;
        private makeRoleShader;
        outShader($str: string): void;
        makeMaterialShaderByByte($byte: Pan3d.Pan3dByteArray, $url: string, Met?: materialui.MaterialTree): materialui.MaterialTree;
        getMaterialByUrl($url: string, bfun: Function): void;
        private makeConstList;
        private makeFc;
        private loadTextureRes;
        private makeTextList;
    }
}
