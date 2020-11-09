declare module Pan3d {
    class TimeLineData {
        dataAry: Array<any>;
        maxFrameNum: number;
        beginTime: number;
        destory(): void;
        setByteData($byte: Pan3dByteArray): void;
        addKeyFrame(num: number): KeyFrame;
        private getByteDataTemp;
    }
}
