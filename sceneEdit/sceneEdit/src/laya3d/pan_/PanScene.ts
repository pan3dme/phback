/**
* name 
*/
module lou16.me {

    import CombineParticle = Pan3d.CombineParticle
 
    export class PanScene extends maineditor.EdItorSceneManager {
		// 镜头模式
		static MODE_2D: number = 1;
		static MODE_3D: number = 2;

	 

		// 摄像机距离
		protected _camDistance: number;
		get camDistance(): number {
			return this._camDistance;
		}
		set camDistance(v: number) {
			this._camDistance = v;
		}

 

		private _showGrid: boolean = false;
		get showGrid(): boolean {
			return this._showGrid;
		}
		set showGrid(v: boolean) {
		 
		}

  
		// 相机模式
		private _cameraMode: number = PanScene.MODE_3D;
		set cameraMode(v: number) {
			this._cameraMode = v;
			this.is2D && this.removeFocueEvent();
		}
		get cameraMode(): number {
			return this._cameraMode;
		}
		get is2D(): boolean {
			return this._cameraMode == PanScene.MODE_2D;
		}

		protected _buffManager: PanBuffManager
		constructor() {
			super();
		 
		}

	 
		private _sceneCamScale: number = 1.76;

		update(): void {
		 
		}

		// 更新镜头矩阵
		resetViewMatrx3D(): void {
 
		}

		private updateFocus(): void {
		 
		}

	 

		//播放技能  $fileName技能文件名， $effectName特效名字
		playSkillByChar(char: SceneChar, fileName: string, effectName: string, completeFun?: Function, hitPosLis?: Array<Vector3D>): void {
		 
		}

		//播放弹道技能  $fileName技能文件名， $effectName特效名字
		playTrajectoryByChar(char: SceneChar, target: SceneChar, fileName: string, effectName: string, completeFun?: Function): void {
		 
		}

		// 添加特效
		addParticle(v: string, scale: number, callback: Function): void {
			 
		}

		// 移除特效
		removeParticle(v: CombineParticle): void {
			this.particleManager.removeParticle(v);
			v.destory();
		}

		// 飘字
		flyText(type: number, data: any, isbottom: boolean = false): void {
			 
		}

		/**显示buff*/
		public showBuff(types: number[], pos: Vector3D = null): BuffTitleMesh {
			let buff: BuffTitleMesh = this._buffManager.getCharTitleMeshVo(types);
			if (pos) buff.pos = pos;
			return buff;
		}

		/**移除buff*/
		public removeBuff(buff: BuffTitleMesh): void {
			buff.clear = true;
			buff = null;
		}


		private _isStat: boolean;
		private _speedR: number = 0.1;		//旋转速度
		private _rangeX: number[] = [-45, -15];//x旋转范围
		private _speedD: number = 1.5;			//距离速度
		private _rangeD: number[] = [430, 600];//距离范围
		addFocueEvent(v: boolean = false): void {
			if (this.is2D) {
				return;
			}
			this._isStat = v;
			Laya.stage.on(LEvent.MOUSE_DOWN, this, this.onMouseDown);
			Laya.stage.on(LEvent.MOUSE_UP, this, this.onMouseUp);
			Laya.stage.on(LEvent.MOUSE_MOVE, this, this.onMouseMove);
			Laya.stage.on(LEvent.MOUSE_WHEEL, this, this.onMouseWheel);
			if (this._isStat) {
				Laya.stage.on(LEvent.RIGHT_MOUSE_DOWN, this, this.onRightMouseDown);
				Laya.stage.on(LEvent.RIGHT_MOUSE_UP, this, this.onRightMouseUp);
			}
		}

		removeFocueEvent(): void {
			Laya.stage.off(LEvent.MOUSE_DOWN, this, this.onMouseDown);
			Laya.stage.off(LEvent.MOUSE_UP, this, this.onMouseUp);
			Laya.stage.off(LEvent.RIGHT_MOUSE_DOWN, this, this.onRightMouseDown);
			Laya.stage.off(LEvent.RIGHT_MOUSE_UP, this, this.onRightMouseUp);
			Laya.stage.off(LEvent.MOUSE_MOVE, this, this.onMouseMove);
			Laya.stage.off(LEvent.MOUSE_WHEEL, this, this.onMouseWheel);
		}

		private onMouseWheel(e: LEvent): void {
			if (this.is2D) {
				return;
			}
			let dist: number = this._camDistance + e.delta * this._speedD;
			dist = Math.min(Math.max(dist, this._rangeD[0]), this._rangeD[1]);
			this._camDistance = dist;
		}

		private _lastX: number = 0;
		private _lastZ: number = 0;

		private _lastRotationX: number = 0;
		private _lastRotationY: number = 0;

		private _lastMousePos: Vector2D = new Vector2D();
		private _isMouseDown: boolean;

		private onMouseDown(e: LEvent): void {
	 
		}

		private onMouseUp(e: LEvent): void {
			this._isMouseDown = false;
		}



		private _isRightMouseDown: boolean;
		private onRightMouseDown(e: LEvent): void {
	 
		}

		private onRightMouseUp(e: LEvent): void {
			this._isRightMouseDown = false;
		}

		private onMouseMove(e: LEvent): void {
		 
		}

		resize(): void {
		 
		}

		reset(): void {
			 
		}
 

	}
}