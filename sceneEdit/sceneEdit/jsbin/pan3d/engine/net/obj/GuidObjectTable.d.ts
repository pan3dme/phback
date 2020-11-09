declare module Pan3d {
    class GuidObjectTable extends SyncEvent {
        protected _objs: Object;
        private _newEvent;
        private _delEvent;
        protected _indexer: StringIndexer;
        protected _hashGUID: Function;
        protected _u_2_guid: Object;
        constructor();
        Get(k: string): GuidObject;
        /**
         * 索引器
         */
        readonly indexer: StringIndexer;
        /**
         * 创建对象
         * @param k
         * @return
         */
        CreateObject(k: string): GuidObject;
        /**
         * 释放对象
         * @param o
         */
        ReleaseObject(o: GuidObject): void;
        ReleaseKey(k: string): void;
        AttachObject(o: GuidObject): void;
        DetachObject(o: GuidObject): void;
        msgClientsubscription($byte: Pan3dByteArray): void;
        protected static applyBlock_tmp_obj: GuidObject;
        /**
         * 应用对象更新数据包
         * @param bytes
         */
        ApplyBlock(bytes: Pan3dByteArray): boolean;
        SearchObject(s: string, vec: Array<string>): void;
        ForEachObject(f: Function): void;
        /**
         * 调用远程创建对象，成功的时候回调
         * @param guid
         * @param cb function(o:GuidObject):void
         */
        RegisterCreateEvent(guid: string, cb: Function): void;
        /**
         * 调用远程删除对象,成功时回调
         * @param guid
         * @param cb function(o:GuidObject):void
         */
        RegisterReleaseEvent(guid: string, cb: Function): void;
        private _packet_pool;
        /**
         * 从池中分配新的数据包,如果没有包号就不要写入
         * @param optCode
         * @return
         */
        newPacket(optCode?: number): Pan3dByteArray;
        /**
         * 回收数据包到包池
         * @param pkt
         */
        freePacket(pkt: Pan3dByteArray): void;
        /**
         * 清理对象
         */
        clearObjs(): void;
        protected removeObject(guid: string, obj: GuidObject): void;
        dispose(): void;
    }
}
