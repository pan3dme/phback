var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var lou16;
(function (lou16) {
    var me;
    (function (me) {
        var PanScene = /** @class */ (function (_super) {
            __extends(PanScene, _super);
            function PanScene() {
                var _this = _super.call(this) || this;
                _this._showGrid = false;
                // 相机模式
                _this._cameraMode = PanScene.MODE_3D;
                _this._sceneCamScale = 1.76;
                _this._speedR = 0.1; //旋转速度
                _this._rangeX = [-45, -15]; //x旋转范围
                _this._speedD = 1.5; //距离速度
                _this._rangeD = [430, 600]; //距离范围
                _this._lastX = 0;
                _this._lastZ = 0;
                _this._lastRotationX = 0;
                _this._lastRotationY = 0;
                _this._lastMousePos = new Vector2D();
                return _this;
            }
            Object.defineProperty(PanScene.prototype, "camDistance", {
                get: function () {
                    return this._camDistance;
                },
                set: function (v) {
                    this._camDistance = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanScene.prototype, "showGrid", {
                get: function () {
                    return this._showGrid;
                },
                set: function (v) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanScene.prototype, "cameraMode", {
                get: function () {
                    return this._cameraMode;
                },
                set: function (v) {
                    this._cameraMode = v;
                    this.is2D && this.removeFocueEvent();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanScene.prototype, "is2D", {
                get: function () {
                    return this._cameraMode == PanScene.MODE_2D;
                },
                enumerable: true,
                configurable: true
            });
            PanScene.prototype.update = function () {
            };
            // 更新镜头矩阵
            PanScene.prototype.resetViewMatrx3D = function () {
            };
            PanScene.prototype.updateFocus = function () {
            };
            //播放技能  $fileName技能文件名， $effectName特效名字
            PanScene.prototype.playSkillByChar = function (char, fileName, effectName, completeFun, hitPosLis) {
            };
            //播放弹道技能  $fileName技能文件名， $effectName特效名字
            PanScene.prototype.playTrajectoryByChar = function (char, target, fileName, effectName, completeFun) {
            };
            // 添加特效
            PanScene.prototype.addParticle = function (v, scale, callback) {
            };
            // 移除特效
            PanScene.prototype.removeParticle = function (v) {
                this.particleManager.removeParticle(v);
                v.destory();
            };
            // 飘字
            PanScene.prototype.flyText = function (type, data, isbottom) {
                if (isbottom === void 0) { isbottom = false; }
            };
            /**显示buff*/
            PanScene.prototype.showBuff = function (types, pos) {
                if (pos === void 0) { pos = null; }
                var buff = this._buffManager.getCharTitleMeshVo(types);
                if (pos)
                    buff.pos = pos;
                return buff;
            };
            /**移除buff*/
            PanScene.prototype.removeBuff = function (buff) {
                buff.clear = true;
                buff = null;
            };
            PanScene.prototype.addFocueEvent = function (v) {
                if (v === void 0) { v = false; }
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
            };
            PanScene.prototype.removeFocueEvent = function () {
                Laya.stage.off(LEvent.MOUSE_DOWN, this, this.onMouseDown);
                Laya.stage.off(LEvent.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.off(LEvent.RIGHT_MOUSE_DOWN, this, this.onRightMouseDown);
                Laya.stage.off(LEvent.RIGHT_MOUSE_UP, this, this.onRightMouseUp);
                Laya.stage.off(LEvent.MOUSE_MOVE, this, this.onMouseMove);
                Laya.stage.off(LEvent.MOUSE_WHEEL, this, this.onMouseWheel);
            };
            PanScene.prototype.onMouseWheel = function (e) {
                if (this.is2D) {
                    return;
                }
                var dist = this._camDistance + e.delta * this._speedD;
                dist = Math.min(Math.max(dist, this._rangeD[0]), this._rangeD[1]);
                this._camDistance = dist;
            };
            PanScene.prototype.onMouseDown = function (e) {
            };
            PanScene.prototype.onMouseUp = function (e) {
                this._isMouseDown = false;
            };
            PanScene.prototype.onRightMouseDown = function (e) {
            };
            PanScene.prototype.onRightMouseUp = function (e) {
                this._isRightMouseDown = false;
            };
            PanScene.prototype.onMouseMove = function (e) {
            };
            PanScene.prototype.resize = function () {
            };
            PanScene.prototype.reset = function () {
            };
            // 镜头模式
            PanScene.MODE_2D = 1;
            PanScene.MODE_3D = 2;
            return PanScene;
        }(maineditor.EdItorSceneManager));
        me.PanScene = PanScene;
    })(me = lou16.me || (lou16.me = {}));
})(lou16 || (lou16 = {}));
//# sourceMappingURL=PanScene.js.map