declare module Pan3d {
    class Display3dMovie extends Display3DSprite {
        private _meshUrl;
        protected _skinMesh: SkinMesh;
        protected _animDic: Object;
        protected _preLoadActionDic: Object;
        protected _waitLoadActionDic: Object;
        protected _completeState: number;
        protected _defaultAction: string;
        private _curentAction;
        protected _curentFrame: number;
        protected _actionTime: number;
        protected _partDic: Object;
        protected _partUrl: Object;
        private _capsule;
        showCapsule: boolean;
        protected _enablePhysics: boolean;
        protected _shadow: Shadow;
        protected _fileScale: number;
        private _roleRes;
        _hasDestory: boolean;
        /**正在播放的技能*/
        _isSinging: boolean;
        isSinging: boolean;
        meshVisible: boolean;
        constructor();
        curentAction: string;
        fixAstartData(pos: Vector2D): void;
        setRoleUrl(value: string): void;
        onMeshLoaded(): void;
        clearMesh(): void;
        addSkinMeshParticle(): void;
        removeSkinMeshParticle(): void;
        private roleResCom;
        setMeshUrl(value: string, $batchNum?: number): void;
        private _nextScale;
        scale: number;
        fileScale: number;
        shadow: boolean;
        setShadowSize(value: number): void;
        addStage(): void;
        removeStage(): void;
        loadMaterialCom($material: Material): void;
        setCollision($radius: number, $height: number): void;
        applyVisible(): void;
        removePart($key: string): void;
        /**
            部位，路径，类型 1为粒子 0为其他
        */
        addPart($key: string, $bindSocket: string, $url: string): void;
        protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void;
        getSocket(socketName: string, resultMatrix: Matrix3D): void;
        getSunType(): number;
        protected getFrameMatrix(index: number): Matrix3D;
        addAction(name: string, url: string, needPerLoad?: boolean): void;
        setAnimUrl(name: string, url: string): void;
        play($action: string, $completeState?: number, needFollow?: boolean): boolean;
        private processAnimByMesh;
        update(): void;
        updateFrame(t: number): void;
        protected changeAction($action: string): void;
        destory(): void;
        private capsuleLineSprite;
        updateShowCapsule(): void;
        private drawBall;
        private drawCylinder;
        setVcMatrix($mesh: MeshData): void;
        setVa($mesh: MeshData): void;
        setVaIndependent($mesh: MeshData): void;
        setVaCompress($mesh: MeshData): void;
        clearVa(): void;
        updateMaterialMesh($mesh: MeshData): void;
        setLightProbeVc($material: Material): void;
        private locationDic;
        setMeshVc($mesh: MeshData): void;
        setPos($v3d: Vector3D): void;
        x: number;
        y: number;
        z: number;
        changePos(): void;
    }
}
