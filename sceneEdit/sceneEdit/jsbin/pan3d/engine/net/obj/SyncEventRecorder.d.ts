declare module Pan3d {
    class SyncEventRecorder extends SyncEvent {
        /**
         * 用于监听下标变化
         */
        private _events_value;
        /**
         * 用于监听字符下标变化
         */
        private _events_str_values;
        /**
         * 用于触发多下标单回调的情况
         */
        private _events_mask;
        /**
         * 用于事件回调
         */
        private _events_callback;
        protected _uint32_values_len: number;
        protected _uint32_values_buffer: DataView;
        protected _str_values_len: number;
        protected _str_values: Array<string>;
        protected _guid: string;
        /**
         * 从模式下更新事件触发后产生
         * 回调格式  this._after_update(obj:GuidObject,flags:number,intMask:UpdateMask,strMask:UpdateMask):void
         */
        protected _after_update: Function;
        private static addListens_mask;
        private static tmpIntMask;
        private static tmpStrMask;
        private _tmpBinlog;
        guid: string;
        constructor();
        /**
         * 重置整个对象,下标清零
         */
        Reset(): void;
        private clearValues;
        protected checkIntSize(index: number): void;
        protected checkStrSize(index: number): void;
        private OnEventSyncBinLog;
        /**
         * 监听对象在下标变化
         * @param index 下标值
         * @param callback 回调格式function(binlog:BinLogStru):void
         */
        AddListen(index: number, callback: Function): void;
        /**
         *  监听对象在下标变化
         * @param baseIndex 下标基础
         * @param callback 回调指针
         * @param arg 下标基础之后的列表
         */
        AddListens(baseIndex: number, callback?: Function, ...arg: any[]): void;
        /**
         * 移除监听对象在下标变化
         * @param index 下标值
         * @param callback 回调格式function(binlog:BinLogStru):void
         */
        removeListene(index: number, callback?: Function): void;
        /**
         *  移除监听对象在下标变化，列表集合
         * @param baseIndex 下标基础
         * @param callback 回调指针
         * @param arg 下标基础之后的列表
         */
        removeListenes(baseIndex: number, callback?: Function, ...arg: any[]): void;
        /**
         * 监听对象在下标变化
         * @param index 下标值
         * @param callback 回调格式function(binlog:BinLogStru):void
         */
        AddListenString(index: number, callback: Function): void;
        /**
         * 移除监听对象在下标变化
         * @param index 下标值
         * @param callback 回调格式function(binlog:BinLogStru):void
         */
        removeListeneString(index: number, callback?: Function): void;
        GetDouble(index: number): number;
        GetUInt32(index: number): number;
        GetInt32(index: number): number;
        GetUInt16(index: number, offset: number): number;
        GetInt16(index: number, offset: number): number;
        GetFloat(index: number): number;
        GetByte(index: number, offset: number): number;
        GetUInt8(index: number, offset: number): number;
        GetBit(index: number, offset: number): boolean;
        SetBit(index: number, offset: number, flag: boolean): void;
        GetStr(index: number): string;
        SetDouble(index: number, value: number): void;
        AddDouble(index: number, value: number): void;
        SubDouble(index: number, value: number): void;
        SetUInt32(index: number, value: number): void;
        AddUInt32(index: number, value: number): void;
        SubUInt32(index: number, value: number): void;
        SetInt32(index: number, value: number): void;
        AddInt32(index: number, value: number): void;
        SubInt32(index: number, value: number): void;
        SetUInt16(index: number, offset: number, value: number): void;
        AddUInt16(index: number, offset: number, value: number): void;
        SubUInt16(index: number, offset: number, value: number): void;
        SetInt16(index: number, offset: number, value: number): void;
        AddInt16(index: number, offset: number, value: number): void;
        SubInt16(index: number, offset: number, value: number): void;
        SetFloat(index: number, v: number): void;
        SetByte(index: number, offset: number, value: number): void;
        AddByte(index: number, offset: number, value: number): void;
        SubByte(index: number, offset: number, value: number): void;
        SetStr(index: number, val: string): void;
        private ReadValues;
        private ReadStringValues;
        /**
         * 数字下标创建包掩码
         * @param mask
         */
        private GetCreateMask;
        /**
         * 字符串创建包掩码
         * @param mask
         */
        private GetCreateStringMask;
        private ApplyAtomicBinLog;
        /**
         * 将binlog的操作实施到对象，并且如果就主模式，转换binlog得到
         * 这个函数会把转
         * @param binlog
         */
        private ApplyBinLog;
        private _afterUpdateIntObj;
        private _afterUpdateStrObj;
        clearAfterUpdateObj(): void;
        ReadFrom(flags: number, bytes: Pan3dByteArray, evFilter?: SyncEventFilter, applyNew?: boolean): boolean;
        onBaseCreated(): void;
        GetHashCode(): number;
        Equals(o: SyncEventRecorder): Boolean;
        DeleteThis(): void;
        dispose(): void;
    }
}
