declare class TpGame {
    static getArrByStr(str: String): Array<string>;
}
declare class ModuleList {
    constructor();
    private static getModuleList;
    /**
     * 启动所有模块
     */
    static startup(): void;
}
