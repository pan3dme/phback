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
        var TextArea = Laya.TextArea;
        var LineDisplayShader = Pan3d.LineDisplayShader;
        var ProgrmaManager = Pan3d.ProgrmaManager;
        var GridLineSprite = Pan3d.GridLineSprite;
        var BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite;
        var Camera3D = Pan3d.Camera3D;
        var Rectangle = Pan3d.Rectangle;
        var PanSceneSprite = /** @class */ (function (_super) {
            __extends(PanSceneSprite, _super);
            function PanSceneSprite() {
                return _super.call(this) || this;
            }
            PanSceneSprite.prototype.initScene = function () {
                ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
                this.sceneManager = new me.PanScene();
                var temp = new GridLineSprite();
                this.sceneManager.addDisplay(temp);
                this.sceneManager.addDisplay(new BaseDiplay3dSprite());
                this.sceneManager.ready = true;
                this.sceneManager.cam3D = new Camera3D();
                this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, 512, 512);
                this.sceneManager.cam3D.distance = 200;
                this.sceneManager.focus3D.rotationY = random(360);
                this.sceneManager.focus3D.rotationX = -45;
            };
            Object.defineProperty(PanSceneSprite.prototype, "scene", {
                get: function () {
                    return this.sceneManager;
                },
                enumerable: true,
                configurable: true
            });
            PanSceneSprite.prototype.showStat = function () {
                if (!this._stat) {
                    var scene = this.scene;
                    this._stat = new Stat(scene);
                    scene.addFocueEvent(true);
                }
            };
            PanSceneSprite.prototype.hideStat = function () {
                if (this._stat) {
                    var scene = this.scene;
                    this._stat.destroy();
                    this._stat = null;
                    scene.removeFocueEvent();
                }
            };
            PanSceneSprite.prototype.destroy = function (destroyChild) {
                this.hideStat();
                this.customRenderEnable = false;
                _super.prototype.destroy.call(this, destroyChild);
            };
            return PanSceneSprite;
        }(LayaPan3D.LayaScene2D));
        me.PanSceneSprite = PanSceneSprite;
        var Stat = /** @class */ (function () {
            function Stat(v) {
                this._scene = v;
                this._statSprite = new Sprite();
                this._bgSprite = new Sprite();
                this._bgSprite.alpha = .3;
                this._bgSprite.mouseEnabled = false;
                this._statSprite.addChild(this._bgSprite);
                this._statText = new TextArea();
                this._statText.color = '#FFFFFF';
                this._statText.autoSize = true;
                this._statText.editable = false;
                this._statText.mouseEnabled = false;
                this._statText.width = 150;
                this._statText.x = 10;
                this._statText.y = 10;
                this._statSprite.addChild(this._statText);
                this._statSprite.mouseEnabled = true;
                this._statSprite.on(LEvent.MOUSE_DOWN, this, this.onMouseDown);
                Laya.stage.on(LEvent.MOUSE_UP, this, this.onMouseUp);
                this._statSprite.x = (Laya.stage.width - 170) / 2;
                this._statSprite.y = 120; //Laya.stage.height / 2;
                Laya.stage.addChild(this._statSprite);
            }
            Stat.prototype.onMouseDown = function (e) {
                this._statSprite.startDrag();
                e.stopPropagation();
            };
            Stat.prototype.onMouseUp = function (e) {
                this._statSprite.stopDrag();
            };
            Stat.prototype.update = function () {
                var scene = this._scene;
                var text = 'cam3D.distance：' + scene.camDistance;
                text += '\r\nfocus3D.rotationX：' + scene.focus3D.rotationX;
                text += '\r\nfocus3D.rotationY：' + scene.focus3D.rotationY;
                text += '\r\nfocus3D.rotationZ：' + scene.focus3D.rotationZ;
                text += '\r\nfocus3D.x：' + scene.focus3D.x;
                text += '\r\nfocus3D.y：' + scene.focus3D.y;
                text += '\r\nfocus3D.z：' + scene.focus3D.z;
                this._statText.text = text;
                var w = this._statText.width + 20;
                var h = this._statText.height + 20;
                this._statSprite.width = w;
                this._statSprite.height = h;
                this._bgSprite.graphics.clear();
                this._bgSprite.graphics.drawRect(0, 0, w, h, '#000');
            };
            Stat.prototype.destroy = function () {
                Laya.stage.off(LEvent.MOUSE_UP, this, this.onMouseUp);
                this._statSprite.destroy(true);
            };
            return Stat;
        }());
    })(me = lou16.me || (lou16.me = {}));
})(lou16 || (lou16 = {}));
//# sourceMappingURL=PanSceneSprite.js.map