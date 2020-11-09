declare module Pan3d {
    class StringIndexer {
        protected _indexerExp: Array<RegExp>;
        protected _objs: Array<Array<GuidObject>>;
        protected _evFilter: Array<SyncEventFilter>;
        constructor();
        /**
         * 根据正则表达式返回加入的索引，并返回索引编号 如: create("^i\d+") 代表所有的物品
         * @param exp
         * @return
         */
        createIndex(exp: string): number;
        /**
         * 根据正则表达式返回索引
         * @param exp 正则表达式
         * @return 返回索引,如果返回-1就是没找到
         */
        getIndex(exp: string): number;
        /**
         * 释放正则表达式的索引的内容
         * 暂时不支持运行过程中增加和删除索引
         * @param exp
         */
        releaseIndex(exp: string): void;
        /**
         * 根据传入的字符串，验证符合哪个索引
         * @param obj
         * @return
         */
        private test;
        /**
         * 插入对象，遍历所有的正则表达式，如果符合则会插入
         * @param obj
         */
        insert(obj: GuidObject): void;
        /**
         * 根据对象的GUID移除所在的索引
         * @param guid
         */
        remove(guid: string): void;
        /**
         * 根据正则表达式查询对象集合
         * @param exp
         * @return
         */
        query(exp: string): Array<GuidObject>;
        /**
         * 根据索引编号返回所有的对象集合
         * @param indexTyp
         * @return
         */
        get(indexTyp: number): Array<GuidObject>;
        /**
         * 传入对象去匹索引器
         * @param obj
         * @return
         */
        matchObject(obj: GuidObject): SyncEventFilter;
        /**
         * 根据对象筛选的集合触发相应的事件
         * @param exp
         * @param f
         */
        filter(exp: string, f: SyncEventFilter): void;
        Clear(): void;
    }
}
