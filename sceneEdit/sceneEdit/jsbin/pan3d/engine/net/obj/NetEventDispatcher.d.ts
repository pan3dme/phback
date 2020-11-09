/**
* 事件分发器,由于本身事件数量肯定不会多
* 所以没有必要使用二分查找算法,直接遍历
* 事件ID与事件回调处于不同的数组，通过相同的数组下标关联
* @author linbc
*/
declare module Pan3d {
    class NetEventDispatcher {
        static KEY_TYPE_INT: number;
        static KEY_TYPE_STRING: number;
        static KEY_TYPE_INT_MASK: number;
        protected _event_key_type: number;
        protected _event_id_int: Array<number>;
        protected _event_id_str: Array<string>;
        protected _event_callback: Array<Function>;
        protected _event_id_int_mask: Array<UpdateMask>;
        protected _callback_index: number;
        private _event_index;
        constructor(type?: number);
        /**
         * 触发该事件的参数
         * @param param
         */
        private DispatchIndex;
        DispatchString(key: string, param: Object): void;
        DispatchInt(key: number, param: Object): void;
        DispatchIntMask(key: UpdateMask, param: Object): void;
        /**
         * 根据规则触发整数回调
         *
         * @param param
         * @param pred 回调格式 pred(index,binlog)->bool
         */
        Dispatch(param: Object, pred: Function): void;
        /**
         * 添加回调监听,监听ID手工指定
         * @param key	事件ID
         * @param f		回调函数闭包,可以支持一个参数(Object)
         */
        AddListenInt(key: number, f: Function): void;
        AddListenString(key: string, f: Function): void;
        AddListenIntMask(key: UpdateMask, f: Function): void;
        /**
         * 移除整型类的回调监听
         * @param key 	事件ID
         * @param f		回调函数闭包,可以支持一个参数(Object)，如果f为空，则移除所有
         */
        removeListenerInt(key: number, f?: Function): void;
        /**
         * 移除字符串类型的回调监听
         * @param key 	事件ID
         * @param f 回调函数闭包,可以支持一个参数(Object)，如果f为空，则移除所有
         */
        removeListenerString(key: string, f?: Function): void;
        /**
         * 移除多下标监听
         * @param key
         * @param f
         */
        removeListenerUpdateMask(key: UpdateMask, f?: Function): void;
        /**
         *  添加回调监听,事件ID自增后并返回
         * @param f	事件支持一个参数,Object
         */
        AddCallback(f: Function): number;
        /**
         * 清空所有已经注册的事件监听
         */
        Clear(): void;
    }
}
