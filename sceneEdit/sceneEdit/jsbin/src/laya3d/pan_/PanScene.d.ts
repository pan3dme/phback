/**
* name
*/
declare module lou16.me {
    import CombineParticle = Pan3d.CombineParticle;
    class PanScene extends maineditor.EdItorSceneManager {
        static MODE_2D: number;
        static MODE_3D: number;
        protected _camDistance: number;
        camDistance: number;
        private _showGrid;
        showGrid: boolean;
        private _cameraMode;
        cameraMode: number;
        readonly is2D: boolean;
        protected _buffManager: PanBuffManager;
        constructor();
        private _sceneCamScale;
        update(): void;
        resetViewMatrx3D(): void;
        private updateFocus;
        playSkillByChar(char: SceneChar, fileName: string, effectName: string, completeFun?: Function, hitPosLis?: Array<Vector3D>): void;
        playTrajectoryByChar(char: SceneChar, target: SceneChar, fileName: string, effectName: string, completeFun?: Function): void;
        addParticle(v: string, scale: number, callback: Function): void;
        removeParticle(v: CombineParticle): void;
        flyText(type: number, data: any, isbottom?: boolean): void;
        /**显示buff*/
        showBuff(types: number[], pos?: Vector3D): BuffTitleMesh;
        /**移除buff*/
        removeBuff(buff: BuffTitleMesh): void;
        private _isStat;
        private _speedR;
        private _rangeX;
        private _speedD;
        private _rangeD;
        addFocueEvent(v?: boolean): void;
        removeFocueEvent(): void;
        private onMouseWheel;
        private _lastX;
        private _lastZ;
        private _lastRotationX;
        private _lastRotationY;
        private _lastMousePos;
        private _isMouseDown;
        private onMouseDown;
        private onMouseUp;
        private _isRightMouseDown;
        private onRightMouseDown;
        private onRightMouseUp;
        private onMouseMove;
        resize(): void;
        reset(): void;
    }
}
