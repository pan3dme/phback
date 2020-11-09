declare module Pan3d {
    class BinLogStru extends SyncEvent {
        private static _pool;
        static malloc(): BinLogStru;
        static free(ptr: BinLogStru): void;
        _opt: number;
        _typ: number;
        _index: number;
        _atomic_opt: number;
        _value_u32_buffer: DataView;
        _value_dbe: number;
        _value_str: string;
        _callback_index: number;
        _old_value_u32_buffer: DataView;
        _old_value_dbe: number;
        _old_value_str: string;
        BinLogStru(): void;
        opt: number;
        index: number;
        offset: number;
        typ: number;
        atomic_opt: number;
        callback_idx: number;
        uint32: number;
        int32: number;
        bit: number;
        old_int32: number;
        uint16: number;
        int16: number;
        byte: number;
        double: number;
        float: number;
        str: string;
        old_str: string;
        value: number;
        old_value: number;
        Clear(): void;
        ReadFrom(bytes: Pan3dByteArray): Boolean;
        WriteTo(bytes: Pan3dByteArray): void;
        clone(): BinLogStru;
    }
}
