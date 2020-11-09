declare module Pan3d {
    class Display3D extends Object3D {
        objData: ObjData;
        program: WebGLProgram;
        shader: Shader3D;
        beginTime: number;
        type: number;
        protected _onStage: boolean;
        sceneVisible: boolean;
        protected _hasDestory: boolean;
        _scene: Pan3d.SceneManager;
        constructor();
        update(): void;
        readonly onStage: boolean;
        addStage(): void;
        removeStage(): void;
        resize(): void;
        destory(): void;
    }
}
