module prop {
    import UIAtlas = Pan3d.UIAtlas;
    import TextureManager = Pan3d.TextureManager
    import UIManager = Pan3d.UIManager
    import UIRectangle = Pan3d.UIRectangle
    import Scene_data = Pan3d.Scene_data
    import LoadManager = Pan3d.LoadManager

    export class BaseReflComponent {

        public propPanle: UiMeshSprite
        public Category: string;

        protected _width: number=1;
        protected _height: number=1;
        protected _x: number=0
        protected _y: number=0;
        protected _data: any

        //public changFun: Function;
        //public getFun: Function;
        //public setFun: Function;
        public target: any;
        public FunKey: string;
        public changFun: Function;
        public KeyStep: number=1;

    
        public constructor(value: UiMeshSprite) {
            this.propPanle = value;

            this.width = 100;
            this.height = 100;

            this.initView();
        }
        protected _label: string
        public get label(): string {
            return this._label;
        }
        public set label(value: string) {
            this._label = value

        }

        public get visible() {
            return this._visible;
        }
        private _visible: boolean
        public set visible(value: boolean) {
            this._visible = value

        }
        public set data(value: any) {
            this._data = value;
        }
        public get data(): any {
            return this._data
        }
        public set x(value: number) {
            this._x = value;
        }
        public get x(): number {
            return this._x
        }
        public set y(value: number) {
            this._y = value;
        }
        public get y(): number {
            return this._y
        }


        public set width(value: number) {
            this._width = value;
        }
        public get width(): number {
            return this._width
        }
        public set height(value: number) {
            this._height = value;
        }
        public get height(): number {
            return this._height
        }
  
        public  setTarget(obj:any):void{
            this.target = obj;
            this.refreshViewValue();

        }
        public refreshViewValue(): void
        {

        }
        protected initView(): void
        {
         
        }
        public destory(): void {
        }
        public resize(): void {
        }

        protected drawOutColor(ui: Pan3d.UICompenent, $vcolor: Vector3D): void {

            var $UIAtlas: UIAtlas = ui.uiRender.uiAtlas
            var $textureStr: string = ui.skinName
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

        }
        protected drawUrlImgToUi(ui: Pan3d.UICompenent, url: string): void {

            LoadManager.getInstance().load(Scene_data.fileRoot + url, LoadManager.IMG_TYPE,
                ($img: any) => {
                    this.drawImgToUi(ui, $img)
                });
        }
        protected drawImgToUi(ui: Pan3d.UICompenent, $img: any): void {

            var $UIAtlas: UIAtlas = ui.uiRender.uiAtlas
            var $textureStr: string = ui.skinName
            var rec: UIRectangle = $UIAtlas.getRec($textureStr);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        }
    }
}