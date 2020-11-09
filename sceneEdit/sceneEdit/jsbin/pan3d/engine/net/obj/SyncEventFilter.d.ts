/**
     * 用于记录所有的同步事件，目前最常用于ui重绘
     * 记录时，先通过testRecorder验证是否是关心的对象，
     * 再调用push将所关心的的binlog用自定义的格式记录下来
     * 现在使用的格式为(数量-short,(index-short,oldValue-unumber)...)
     * 通过pop可以得到当前队列中的所有符合条件的事件消息，并调用相应的处理函数
     * @author linbc
     */
declare module Pan3d {
    class SyncEventFilter extends SyncEvent {
        /**
             * 标识为是个新对象
             */
        static EV_NEW: number;
        /**
         * 标识为对象消失
         */
        static EV_DEL: number;
        /**
         * 对象整型下标发生变化
         */
        static EV_UPDATE_I: number;
        /**
         * 对象字符串下标发生变化
         */
        static EV_UPDATE_S: number;
        private _opening;
        private _curObj;
        private _curEventCount;
        private _eventObjs;
        private _eventParams;
        open(): void;
        /**
         * 关闭对象事件管理
         */
        close(): void;
        /**
         * 初始化
         */
        SyncEventFilter(): void;
        beginPush(obj: GuidObject): Boolean;
        /**
         * 有始有终嘛，修改binlog数量,或者移除符合条件，但是没有记录到事件的对象ID
         */
        endPush(): void;
        private writeParam;
        pushDelete(): void;
        pushNew(): void;
        pushUpdateMask(typ: number, mask: UpdateMask): void;
        /**
         * 对象更新调用该接口进行数据插入,相应的会记录成UI可以理解的数据格式
         * @param binlog
         *
         */
        pushBinlog(binlog: BinLogStru): void;
        /**
         * 开始读之先，置一下，数组的位置
         *
         */
        beginPop(): void;
        /**
         * 开始弹出一个对象的事件,返回空的时候就是没有对象
         * @param params
         * @return 对象的guid
         *
         */
        pop(params: Array<number>): string;
        /**
         * 读完了，清空一下数据
         *
         */
        endPop(): void;
        Clear(): void;
    }
}
