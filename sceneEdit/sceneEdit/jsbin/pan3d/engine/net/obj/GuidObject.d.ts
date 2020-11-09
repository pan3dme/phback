declare module Pan3d {
    class GuidObject extends SyncEventRecorder {
        protected _ref: number;
        /**
            * 增加引用计数
            * @param r 计数变量,1/-1
            */
        add_ref(r: number): void;
        /**
            * 当引用计数小于等于0的时候就可以从对象表中被释放了
            */
        readonly ref: number;
        constructor(g?: string);
        getName(): string;
        getGuid(): string;
    }
}
