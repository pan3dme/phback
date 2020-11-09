declare module filelist {
    import MetaDataView = prop.MetaDataView;
    class SkillMeshView extends MetaDataView {
        private _skillStaticMesh;
        getView(): Array<any>;
        skillmeshUrl: string;
        eventKey(value: string): void;
        intervalTm: number;
        actionname: number;
        filename: string;
        roleurl: string;
        skillurl: string;
        data: any;
        private mashSkillActionInfo;
        categoryClikUp(value: string): void;
        private isSaveNow;
        private lastTm;
        private saveTm;
        saveToSever(): void;
    }
}
