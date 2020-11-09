declare module Pan3d {
    class MouseType {
        static MouseDown: string;
        static MouseUp: string;
        static MouseMove: string;
        static MouseClick: string;
        static KeyDown: string;
        static KeyUp: string;
        static MouseWheel: string;
        static TouchStart: string;
        static TouchMove: string;
        static TouchEnd: string;
        static TouchClick: string;
    }
    class KeyControl {
        private static _instance;
        _keyDic: Object;
        private _lostMousePos;
        private _lastFousce;
        private _isMouseDown;
        private _isUpData;
        constructor();
        static readonly instance: KeyControl;
        static getInstance(): KeyControl;
        init(): void;
        clearAllEvet(): void;
        clearMouseEvent(): void;
        onMouseMove($evt: MouseEvent): void;
        onMouseDown($evt: MouseEvent): void;
        onMouseUp($evt: MouseEvent): void;
        upData(): void;
        speedNum: number;
        tureLeft(): void;
        tureRight(): void;
        tureUp(): void;
        tureDown(): void;
        mathFocus3D($p: Vector3D): void;
        onKeyDown($evt: KeyboardEvent): void;
        onKeyUp($evt: KeyboardEvent): void;
    }
}
