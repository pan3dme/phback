declare module inputres {
    import Pan3dByteArray = Pan3d.Pan3dByteArray;
    class SceneRes extends Pan3d.SceneRes {
        bfun: Function;
        readScene(): void;
        private saveImgToSever;
        private dataURLtoFile;
        private readChangeBuff;
        private saveObjDataToSever;
        private needRefrishArr;
        private getPerentPath;
        private addNeedReedRerishDic;
        reFrishArrByOney(): void;
        fileRoot: string;
        scale: number;
        private upOssFile;
        readObj($srcByte: Pan3dByteArray): void;
        readImg(): void;
    }
    class ImputGameResModel {
        private static _instance;
        static getInstance(): ImputGameResModel;
        private sceneRes;
        inputSceneFile($file: File, $fileroot: string): void;
        private setMapByteMesh;
        private isMapH5File;
        private getMainPic;
        private getNameByPath;
        private makePerfabToSever;
    }
}
