module prop {
    import UICompenent = Pan3d.UICompenent;
    import Vector3D = Pan3d.Vector3D
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import UIAtlas = Pan3d.UIAtlas;
    import UIRectangle = Pan3d.UIRectangle;
    import UIManager = Pan3d.UIManager;
    import TextureManager = Pan3d.TextureManager;
    import ModuleEventManager = Pan3d.ModuleEventManager;
    export class ColorPickUI extends TextLabelUI {
        public constructor(w: number = 64, h: number = 64) {
            super(w, h);
        }
        protected initView(): void {
            this.addEvets()
        }
  
    
        private drawOutColor(): void {
            var $vcolor: Vector3D = new Vector3D(this._vec3d.x * 255, this._vec3d.y * 255, this._vec3d.z * 255);

            var $UIAtlas: UIAtlas = this.ui.uiRender.uiAtlas
            var $textureStr: string = this.ui.skinName
            var rec: UIRectangle = $UIAtlas.getRec($textureStr);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $imgData: ImageData = ctx.getImageData(0, 0, rec.pixelWitdh, rec.pixelHeight);
            for (var i: number = 0; i < $imgData.data.length / 4; i++) {
                $imgData.data[i * 4 + 0] = $vcolor.x;
                $imgData.data[i * 4 + 1] = $vcolor.y;
                $imgData.data[i * 4 + 2] = $vcolor.z;
                $imgData.data[i * 4 + 3] = 255;
            }
            ctx.putImageData($imgData, 0, 0)
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, ctx);

            /*
            var $vcolor: Vector3D = new Vector3D(this._vec3d.x * 255, this._vec3d.y * 255, this._vec3d.z * 255);
            this.textLabelUIMeshVo.needDraw = false;
            var $UIAtlas: UIAtlas = this.textLabelUIMeshVo.textLabelUIDisp2D.parent.uiAtlas
            var $textureStr: string = this.textLabelUIMeshVo.textLabelUIDisp2D.ui.skinName
            var rec: UIRectangle = $UIAtlas.getRec($textureStr);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $imgData: ImageData = ctx.getImageData(0, 0, rec.pixelWitdh, rec.pixelHeight);
            for (var i: number = 0; i < $imgData.data.length / 4; i++) {
                $imgData.data[i * 4 + 0] = $vcolor.x;
                $imgData.data[i * 4 + 1] = $vcolor.y;
                $imgData.data[i * 4 + 2] = $vcolor.z;
                $imgData.data[i * 4 + 3] = 255;
            }
            ctx.putImageData($imgData, 0, 0)
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, ctx);

            */
        }
        private _vec3d: Vector3D;
        public get vec3d(): Vector3D {
            return this. _vec3d;
        }
        public set vec3d(value: Vector3D) {
            this._vec3d = value;
            this.drawOutColor();
        }
        protected butClik(evt: InteractiveEvent): void {
            var $colorEvet: colorview.ColorEvent = new colorview.ColorEvent(colorview.ColorEvent.SHOW_COLOR_PANEL)
            $colorEvet.v3dColor = new Vector3D(this._vec3d.x * 255, this._vec3d.y * 255, this._vec3d.z*255);
            $colorEvet.bfun = (value: Vector3D) =>{ this.colorPickPanelFun(value)}
            ModuleEventManager.dispatchEvent($colorEvet);
        }
        private colorPickPanelFun(value: Vector3D): void {
         

            this._vec3d.x = value.x / 255;
            this._vec3d.y = value.y / 255;
            this._vec3d.z = value.z / 255;
      
            var $reflectionEvet: ReflectionEvet = new ReflectionEvet(ReflectionEvet.CHANGE_DATA)
            $reflectionEvet.data = this._vec3d;
            this.dispatchEvent($reflectionEvet);

            this.drawOutColor();
        

        }

    }
}