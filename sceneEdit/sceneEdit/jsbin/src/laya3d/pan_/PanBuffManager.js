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
var lou16;
(function (lou16) {
    var me;
    (function (me) {
        var CharTitleUiVo = Pan3d.CharTitleUiVo;
        var Scene_data = Pan3d.Scene_data;
        var UIManager = Pan3d.UIManager;
        var TextureManager = Pan3d.TextureManager;
        var Vector3D = Pan3d.Vector3D;
        var UIData = Pan3d.UIData;
        var UiDraw = Pan3d.UiDraw;
        var Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
        var Rectangle = Pan3d.Rectangle;
        var baseMeshVo = Pan3d.baseMeshVo;
        var BuffTitleUiVo = /** @class */ (function (_super) {
            __extends(BuffTitleUiVo, _super);
            function BuffTitleUiVo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BuffTitleUiVo.prototype.makeData = function () {
                if (this._data) {
                    this._buffTitleMesh = this._data;
                    var rec = this.parent.uiAtlas.getRec(this.textureStr);
                    var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    var base = 32;
                    for (var i = 0; i < this._buffTitleMesh.buffarr.length; i++) {
                        var picId = this._buffTitleMesh.buffarr[i];
                        UiDraw.cxtDrawImg(ctx, "BUFF" + picId, new Rectangle(20 * (i % 4), base - 20 * Math.floor(i / 4), 20, 20), UIData.publicUi); //逐个绘制BUFF图片，取公共图片。对应可自行设置参数
                    }
                    TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
                }
            };
            BuffTitleUiVo.prototype.update = function () {
                if (this._buffTitleMesh) {
                    if (this._buffTitleMesh.needDraw) {
                        this.makeData();
                        this._buffTitleMesh.needDraw = false;
                    }
                    if (this._buffTitleMesh.pos) {
                        if (this._buffTitleMesh.visible) {
                            if (this.needUpData(this._buffTitleMesh.pos)) {
                                var m = Scene_data.cam3D.cameraMatrix.clone();
                                m.append(Scene_data.viewMatrx3D);
                                var p = m.transformVector(this._buffTitleMesh.pos);
                                this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                                this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2;
                                this.oldPos.x = this._buffTitleMesh.pos.x;
                                this.oldPos.y = this._buffTitleMesh.pos.y;
                            }
                        }
                        else {
                            this.ui.x = 10000;
                        }
                    }
                    if (this._buffTitleMesh.clear) {
                        this.ui.parent.removeChild(this.ui);
                        this._data = null;
                    }
                }
            };
            return BuffTitleUiVo;
        }(CharTitleUiVo));
        me.BuffTitleUiVo = BuffTitleUiVo;
        var BuffTitleMesh = /** @class */ (function (_super) {
            __extends(BuffTitleMesh, _super);
            function BuffTitleMesh() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BuffTitleMesh.prototype.destory = function () {
                this.pos = null;
                this._num = null;
                this.clear = true;
            };
            Object.defineProperty(BuffTitleMesh.prototype, "buffarr", {
                get: function () {
                    return this._num;
                },
                set: function (value) {
                    this._num = value;
                    this.needDraw = true;
                },
                enumerable: true,
                configurable: true
            });
            return BuffTitleMesh;
        }(baseMeshVo));
        me.BuffTitleMesh = BuffTitleMesh;
        var PanBuffManager = /** @class */ (function () {
            function PanBuffManager($scene) {
                this._scene = $scene;
                this._buffDis2DUI = new Dis2DUIContianerPanel(BuffTitleUiVo, new Rectangle(0, 0, 256, 64), 12);
            }
            PanBuffManager.prototype.getCharTitleMeshVo = function (value) {
                var $vo = new BuffTitleMesh;
                $vo.buffarr = value;
                $vo.pos = new Vector3D(0, 50, 0);
                this._buffDis2DUI.showTemp($vo);
                return $vo;
            };
            PanBuffManager.TYPE_TRAP = 1; //陷阱
            PanBuffManager.TYPE_BREAK = 2; //破甲
            PanBuffManager.TYPE_ARMOR = 3; //护甲
            PanBuffManager.TYPE_MOCKERY = 4; //嘲讽
            PanBuffManager.TYPE_MOCKERY_HP = 5; //嘲讽回血
            return PanBuffManager;
        }());
        me.PanBuffManager = PanBuffManager;
    })(me = lou16.me || (lou16.me = {}));
})(lou16 || (lou16 = {}));
//# sourceMappingURL=PanBuffManager.js.map