declare module lou16.me {
    import CharTitleUiVo = Pan3d.CharTitleUiVo;
    import baseMeshVo = Pan3d.baseMeshVo;
    class BuffTitleUiVo extends CharTitleUiVo {
        private _buffTitleMesh;
        makeData(): void;
        update(): void;
    }
    class BuffTitleMesh extends baseMeshVo {
        private _num;
        needDraw: boolean;
        destory(): void;
        buffarr: Array<number>;
    }
    class PanBuffManager {
        static TYPE_TRAP: number;
        static TYPE_BREAK: number;
        static TYPE_ARMOR: number;
        static TYPE_MOCKERY: number;
        static TYPE_MOCKERY_HP: number;
        private _scene;
        private _buffDis2DUI;
        constructor($scene: maineditor.EdItorSceneManager);
        getCharTitleMeshVo(value: Array<number>): BuffTitleMesh;
    }
}
