declare module Pan3d {
    class SceneManager {
        cam3D: Camera3D;
        viewMatrx3D: Matrix3D;
        focus3D: Object3D;
        static _instance: any;
        static getInstance(): SceneManager;
        readonly displayList: Array<Display3D>;
        protected _displayList: Array<Display3D>;
        protected _display2DList: Array<Display3D>;
        protected _displaySpriteList: Array<Display3DSprite>;
        protected _displayRoleList: Array<Display3dMovie>;
        protected _sceneParticleList: Array<CombineParticle>;
        protected _time: number;
        protected _ready: boolean;
        render: boolean;
        private _sceneDic;
        private _sceneQuadTree;
        viewFrustum: ViewFrustum;
        private _currentUrl;
        constructor();
        readonly displayRoleList: Array<Display3dMovie>;
        readonly displaySpriteList: Array<Display3DSprite>;
        clearScene(): void;
        clearStaticScene(): void;
        testUrl($url: string): boolean;
        loadScene($url: string, $completeFun: Function, $progressFun: Function, $analysisCompleteFun: Function): void;
        private addSceneImgBg;
        getDisplayByID($type: number, $id: number): any;
        fixAstart(pos: Vector2D): void;
        loadSceneConfigCom(obj: any): void;
        private getGroundSprite;
        private makeCollisioin;
        ready: boolean;
        private getBuildSprite;
        private getParticleSprite;
        private initScene;
        addDisplay($display: Display3D, idx?: number): void;
        removeDisplay($display: Display3D): void;
        /**
         * 动态添加的staticMesh 物件例如武器等
        */
        addSpriteDisplay($display: Display3DSprite): void;
        removeSpriteDisplay($display: Display3DSprite): void;
        /**
         * 动态添加的骨骼动画角色
         */
        addMovieDisplay($display: Display3dMovie): void;
        addMovieDisplayTop($display: Display3dMovie): void;
        removeMovieDisplay($display: Display3dMovie): void;
        private setParticleVisible;
        static mapQudaTreeDistance: number;
        test: boolean;
        update(): void;
        addDisplay2DList($dis: Display3D): void;
        private mathCamFar;
        protected updateStaticDiplay(): void;
        protected updateStaticBind(): void;
        protected updateSpriteDisplay(): void;
        protected updateMovieDisplay(): void;
        protected updateMovieFrame(): void;
    }
}
