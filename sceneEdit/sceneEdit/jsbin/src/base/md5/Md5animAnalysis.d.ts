declare module md5list {
    import Matrix3D = Pan3d.Matrix3D;
    import ObjectBone = Pan3d.ObjectBone;
    class Md5animAnalysis {
        allFrames: Array<Array<ObjectBone>>;
        framesok: Boolean;
        private _dir;
        private _hierarchyitem;
        private _hierarchy;
        private _baseframe;
        private _bounds;
        private _frame;
        bigArr: Array<string>;
        resultInfo: any;
        private loopKey;
        private boundsKey;
        private nameHeightKey;
        private interKey;
        private pos;
        /**
         * 包围盒最终数据
         */
        private _boundFrameAry;
        private _posFrameAry;
        private _interAry;
        addAnim(ini: String): Array<Array<Matrix3D>>;
        private setFrameToMatrix;
        private getW;
        private setRestult;
        private _pushhierarchyitem;
        private _pushbasefamer;
        _pushfamers(): void;
        _getsamplefamer(_framesample: Array<any>): Array<ObjectBone>;
        private getBoneFilterStr;
        private handleBigWord;
    }
}
