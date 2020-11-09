declare module Pan3d {
    class SyncEvent {
        static OBJ_OPT_NEW: number;
        static OBJ_OPT_DELETE: number;
        static OBJ_OPT_UPDATE: number;
        static OBJ_OPT_BINLOG: number;
        static OBJ_OPT_U_GUID: number;
        static OPT_SET: number;
        static OPT_UNSET: number;
        static OPT_ADD: number;
        static OPT_SUB: number;
        static TYPE_UINT32: number;
        static TYPE_UINT16: number;
        static TYPE_UINT8: number;
        static TYPE_BIT: number;
        static TYPE_UINT64: number;
        static TYPE_INT32: number;
        static TYPE_STRING: number;
        static TYPE_INT16: number;
        static TYPE_FLOAT: number;
        static TYPE_DOUBLE: number;
        static ATOMIC_OPT_RESULT_NO: number;
        static ATOMIC_OPT_RESULT_TRY: number;
        static ATOMIC_OPT_RESULT_OK: number;
        static ATOMIC_OPT_RESULT_FAILED: number;
        static tmpValueBytes: Pan3dByteArray;
        constructor();
        static init(): void;
    }
}
