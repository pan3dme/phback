declare module Pan3d {
    class GroupRes extends BaseRes {
        private _fun;
        dataAry: Array<GroupItem>;
        private _objDic;
        private _particleDic;
        private _materialDic;
        load(url: string, $fun: Function): void;
        loadComplete($byte: ArrayBuffer): void;
        private readNext;
        private readItem;
        initReg(): void;
        destory(): void;
    }
    class GroupItem extends Object3D {
        objUrl: string;
        materialUrl: string;
        particleUrl: string;
        materialInfoArr: Array<any>;
        isGroup: boolean;
        types: number;
    }
}
