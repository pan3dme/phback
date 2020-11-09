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
        var SceneChar = /** @class */ (function (_super) {
            __extends(SceneChar, _super);
            function SceneChar() {
                return _super.call(this) || this;
            }
            Object.defineProperty(SceneChar.prototype, "pScale", {
                get: function () {
                    return this._pScale;
                },
                set: function (v) {
                    //影响武器的大小 场景武器太大 调整为0.73 对特效位置产生影响 需要在/0.73
                    this._pScale = 0.73 * v;
                    this._mountChar && (this._mountChar.scale = v);
                    this._wingDisplay && (this._wingDisplay.scale = v);
                    this.scale = v;
                    if (this._skinMesh) {
                        this.tittleHeight = (this._skinMesh.tittleHeight + 0) * v;
                    }
                },
                enumerable: true,
                configurable: true
            });
            SceneChar.prototype.onMeshLoaded = function () {
                if (this._skinMesh) {
                    this.tittleHeight = (this._skinMesh.tittleHeight + 0) * this._pScale;
                }
            };
            Object.defineProperty(SceneChar.prototype, "bloodEnable", {
                set: function (v) {
                    if (!this._scene)
                        return;
                    this._bloodEnable = v;
                    if (this._bloodEnable) {
                        if (!this._charBloodVo) {
                            //	this._charBloodVo = (<layapan.LayaOverride2dSceneManager>this._scene).bloodManager.getBloodLineMeshVo()
                            //	this._charBloodVo.colortype = this._bloodColor;
                        }
                    }
                    else {
                        if (this._charBloodVo) {
                            this._charBloodVo.clear = true;
                            this._charBloodVo = null;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneChar.prototype, "nameEnable", {
                set: function (v) {
                    this._nameEnable = v;
                    if (this._nameEnable) {
                        if (!this._charNameVo) {
                            //	this._charNameVo = (<layapan.LayaOverride2dSceneManager>this._scene).bloodManager.getCharNameMeshVo(this.charName)
                        }
                        else {
                            this._charNameVo.name = this.charName;
                            this._charNameVo.needDraw = true;
                        }
                    }
                    else {
                        if (this._charNameVo)
                            this._charNameVo.needDraw = false;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneChar.prototype, "titleEnable", {
                set: function (v) {
                    /*
                    this._titleEnable = v;
                    if (this._titleEnable) {
                        if (!this._charTitleVo || this._charTitleVo.isrebulit == true) {
                            this._charTitleVo = (<layapan.LayaOverride2dSceneManager>this._scene).bloodManager.getCharTitleMeshVo(this.charTitle)
                        } else {
                            this._charTitleVo.num = this.charTitle;
                            this._charTitleVo.needDraw = true;
                            this._charTitleVo.clear = false;
                            this._charTitleVo.isrebulit = false;
                        }
                    } else {
                        if (this._charTitleVo) {
                            this._charTitleVo.needDraw = false;
                            this._charTitleVo.clear = true;
                            this._charTitleVo.isrebulit = true;
                        }
                    }
                    */
                },
                enumerable: true,
                configurable: true
            });
            SceneChar.prototype.refreshPos = function () {
                var posY = this.py + this.tittleHeight;
                if (this.isMount) {
                    posY += 20;
                }
                //处理怒气条位置
                if (this._charAngerVo) {
                    this._charAngerVo.pos.x = this.px;
                    this._charAngerVo.pos.y = posY;
                    this._charAngerVo.pos.z = this.pz;
                    this._charAngerVo.visible = this._resultVisible;
                    posY += (this._isCamera2D ? 7 : 7);
                }
                //处理血条和名字位置 -FIXME--0
                if (this._charBloodVo) {
                    this._charBloodVo.pos.x = this.px;
                    //处理血条高度
                    this._charBloodVo.pos.y = posY + 132;
                    this._charBloodVo.pos.z = this.pz;
                    this._charBloodVo.visible = this._resultVisible;
                    posY += (this._isCamera2D ? 15 : 15);
                }
                if (this._charNameVo) {
                    this._charNameVo.pos.x = this.px;
                    this._charNameVo.pos.y = posY;
                    this._charNameVo.pos.z = this.pz;
                    this._charNameVo.visible = this._resultVisible;
                    // posY += 6;
                }
                //if (this._charTitleVo) {
                //	this._charTitleVo.pos.x = this.px;
                //	this._charTitleVo.pos.y = posY
                //	this._charTitleVo.pos.z = this.pz;
                //	this._charTitleVo.visible = this._resultVisible;
                //	// posY += 6;
                //}
            };
            SceneChar.prototype.moveTopos = function (v) {
                this.moveToPosV2d = v;
                var $nmr = this.pixelPos.sub(this.moveToPosV2d);
                this.pRotationY = 180 - Math.atan2($nmr.x, $nmr.y) * 180 / Math.PI;
            };
            SceneChar.prototype.set2dPos = function ($x, $y) {
                _super.prototype.set2dPos.call(this, $x, $y);
                this.pixelPos = new Pan3d.Vector2D($x, $y);
            };
            SceneChar.prototype.updateFrame = function (t) {
                if (this.moveToPosV2d) {
                    var $dis = Vector2D.distance(this.pixelPos, this.moveToPosV2d);
                    if ($dis > 10) {
                        var $nmr = this.pixelPos.sub(this.moveToPosV2d);
                        $nmr.normalize();
                        $nmr.scaleBy(3);
                        this.pixelPos.x += $nmr.x;
                        this.pixelPos.y += $nmr.y;
                        _super.prototype.set2dPos.call(this, this.pixelPos.x, this.pixelPos.y);
                        this.play(me.CharAction.WALK);
                    }
                    else {
                        this.play(me.CharAction.STANAD);
                    }
                }
                _super.prototype.updateFrame.call(this, t);
            };
            SceneChar.prototype.mouseClik = function (lineA, lineB) {
                return false;
            };
            SceneChar.prototype.destory = function () {
                this._scene.removeMovieDisplay(this);
                _super.prototype.destory.call(this);
            };
            SceneChar.prototype.updateMatrix = function () {
                this.posMatrix.identity();
                this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
                this._rotationX = 35;
                this.posMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS);
                this.posMatrix.appendRotation(this._rotationX, Vector3D.X_AXIS);
                this.posMatrix.appendTranslation(this._x, this._y, this._z);
            };
            SceneChar.prototype.isPlaying = function () {
                if (this._completeState != 1 || !this._curentFrame)
                    return true;
                if (!this._animDic.hasOwnProperty(this.curentAction))
                    return false;
                return this._curentFrame < (this._animDic[this.curentAction].matrixAry.length - 1);
            };
            SceneChar.prototype.showActionEnd = function ($action) {
                this.curentAction = $action;
                this._completeState = 1;
                var animData = this._animDic[$action];
                this._actionTime = 2 * Pan3d.Scene_data.frameTime * animData.matrixAry.length;
                this.updateFrame(0);
            };
            return SceneChar;
        }(LayaPan3D.LayaScene2dSceneChar));
        me.SceneChar = SceneChar;
    })(me = lou16.me || (lou16.me = {}));
})(lou16 || (lou16 = {}));
//# sourceMappingURL=SceneChar.js.map