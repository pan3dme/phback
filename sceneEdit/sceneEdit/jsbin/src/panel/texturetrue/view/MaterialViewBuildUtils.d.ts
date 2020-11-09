declare module materialui {
    class MaterialViewBuildUtils {
        private static _instance;
        static getInstance(): MaterialViewBuildUtils;
        constructor();
        private _dataAry;
        private _uiVec;
        addFun: Function;
        setData(ary: Array<any>): void;
        drawLine(): void;
        getUIbyID($pid: number, $id: number, $inout: boolean): ItemMaterialUI;
        private getNodeUI;
        getUI(type: String): BaseMaterialNodeUI;
    }
}
