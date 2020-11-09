declare module Pan3d {
    class AnimManager {
        private _dic;
        constructor();
        private static _instance;
        static getInstance(): AnimManager;
        getAnimData($url: string, $fun: Function): void;
        getAnimDataImmediate($url: string): AnimData;
        clearAnim($url: string): void;
        readData(byte: Pan3dByteArray, $url: any): AnimData;
        private readFrameData;
        private readFrameTypeData;
        private processFrame;
        frameToBone(frameData: Array<number>, hierarchyList: Array<ObjectBone>): Array<ObjectBaseBone>;
        private setFrameToMatrix;
        private getW;
    }
    class ObjectBaseBone {
        father: number;
        name: string;
        tx: number;
        ty: number;
        tz: number;
        tw: number;
        qx: number;
        qy: number;
        qz: number;
        qw: number;
    }
    class ObjectBone extends ObjectBaseBone {
        changtype: number;
        startIndex: number;
        matrix: Matrix3D;
        clone(): ObjectBone;
    }
}
