declare module Pan3d {
    class UIMask {
        protected _x: number;
        protected _y: number;
        protected _width: number;
        protected _height: number;
        absoluteX: number;
        absoluteY: number;
        absoluteWidth: number;
        absoluteHeight: number;
        objData: ObjData;
        program: WebGLProgram;
        shader: Shader3D;
        renderData: Array<number>;
        parent: UIConatiner;
        scale: number;
        level: number;
        constructor();
        protected initData(): void;
        applyAbsolutePoint(): void;
        testPoint($x: number, $y: number): boolean;
        applyRenderSize(): void;
        applyObjData(): void;
        update(): void;
        x: number;
        y: number;
        width: number;
        height: number;
        private _hasDisposed;
        dispose(): void;
    }
}
