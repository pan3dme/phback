/***********************************************************************/
/*************** 本代码由协议工具自动生成，请勿手动修改 ****************/
/***********************************************************************/
declare module Pan3d {
    class both_sync_mstime {
        optcode: number;
        static param_count: number;
        static optname: string;
        private static input;
        /**
         * 服务器运行的毫秒数
         */
        mstime_now: number;
        /**
         * 自然时间
         */
        time_now: number;
        /**
         * 自然时间的服务器启动时间
         */
        open_time: number;
        /**
         从输入二进制流中读取结构体
         */
        static read(self: both_sync_mstime, bytes: Pan3dByteArray): void;
    }
    class both_sync_mstime_app {
        optcode: number;
        static param_count: number;
        static optname: string;
        private static input;
        /**
         * 服务器运行的毫秒数
         */
        mstime_now: number;
        /**
         * 自然时间
         */
        time_now: number;
        /**
         * 自然时间的服务器启动时间
         */
        open_time: number;
        /**
         从输入二进制流中读取结构体
         */
        static read(self: both_sync_mstime_app, bytes: Pan3dByteArray): void;
    }
}
