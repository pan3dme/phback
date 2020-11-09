declare module Pan3d {
    class Module {
        constructor();
        getModuleName(): string;
        /**
        * 注册的Processor的集合
        * 请注意：返回为Processor的实例数组
        * @return
        *
        */
        protected listProcessors(): Array<Processor>;
        /**
             * processor字典
             */
        private processorMap;
        /**
        * 注册所有的Processor
        */
        private registerProcessors;
        /**
        * 注册Processor
        * @param $processor
        */
        private registerProcessor;
        /**
        * module字典
        */
        static moduleMap: Object;
        /**
        * 注册Module
        * @param $module
        */
        static registerModule($module: Module): void;
    }
}
