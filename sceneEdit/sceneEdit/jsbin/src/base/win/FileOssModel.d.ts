declare module pack {
    class FileVo {
        name: string;
        path: string;
        suffix: string;
        isFolder: boolean;
        select: boolean;
        static PREFAB: string;
        static MATERIAL: string;
        static JPG: string;
        static PNG: string;
        static TXT: string;
        static OBJS: string;
        static MAP: string;
        static LYF: string;
        static ZZW: string;
        static SKILL: string;
        static MD5ANIM: string;
        static MD5MESH: string;
        meshStr(str: string): void;
        static meshObj(value: any): FileVo;
    }
    class FileOssModel {
        private static waitItem;
        static ossWrapper: OSS.Wrapper;
        private static oneByOne;
        private static saveDicfileGropFun;
        private static indexFileName;
        private static getDicByUrl;
        private static getPerentPath;
        static getDisByOss($dir: string, bfun: Function): void;
        static isMustUseOssGetDic: boolean;
        static getFolderArr($dir: string, bfun: Function): void;
        private static getTempOss;
        private static waitOssWrapper;
        private static getWarpperByUrl;
        static makeOssWrapper(bfun: Function): void;
        static makeOssWrapperCopy(bfun: Function): void;
        static deleFile($filename: string, $bfun?: Function): void;
        private static uploadFile;
        static copyFile(toUrl: string, srcoueUrl: string, $bfun?: Function): void;
        static WEB_SEVER_EVENT_AND_BACK(webname: string, postStr: string, $bfun?: Function): void;
        static webseverurl: string;
        private static isPostWeboffwx;
        private static waitItemUpFile;
        static version: number;
        static upOssFile(file: File, $fileUrl: string, $bfun?: Function): void;
        private static oneByOneUpFile;
        static upTempFileToOss(bfun: Function): void;
    }
}
