declare module materialui {
    class MaterialModel {
        private static _instance;
        static getInstance(): MaterialModel;
        makePanle(): void;
        selectMaterialUrl(url: string): void;
        private getMenuXml;
        private getMathListData;
        private getV2CListData;
        private getTextureListData;
        private getOtherListData;
        mekeMaterialRightMenu($evt: MouseEvent): void;
        private menuBfun;
        private onTempNode;
        private dataURLtoFile;
        MakeTempWebMaterialTree($temp: MaterialTree, $info: any): void;
        upMaterialTreeToWeb($temp: MaterialTree, $info: any, $url: string): void;
        selectFileById(value: number): void;
    }
}
