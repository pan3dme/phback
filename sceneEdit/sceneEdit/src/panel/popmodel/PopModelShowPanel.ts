module popmodel {
    import UICompenent = Pan3d.UICompenent
    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign
    import Rectangle = Pan3d.Rectangle
    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import UIConatiner = Pan3d.UIConatiner;
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import UIRectangle = Pan3d.UIRectangle
    import baseMeshVo = Pan3d.baseMeshVo
    import MouseType = Pan3d.MouseType
    import ByteArray = Pan3d.Pan3dByteArray
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;

    import ModelShowModel = left.ModelShowModel

    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import ObjData = Pan3d.ObjData
    import Shader3D = Pan3d.Shader3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import Scene_data = Pan3d.Scene_data
    import Vector2D = Pan3d.Vector2D

    import Panel = win.Panel

    export class BloomUiShader extends Shader3D {
        static BloomUiShader: string = "BloomUiShader";
        constructor() {
            super();

        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +

                "uniform vec4 ui[50];" +
                "uniform vec4 ui2[50];" +

                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +
                "   vec4 data = ui2[int(v2uv.z)];" +
                "   v_texCoord = vec2(v2uv.x * data.x + data.z, v2uv.y * data.y + data.w);" +
                "   data = ui[int(v2uv.z)];" +
                "   vec3 pos = vec3(0.0,0.0,0.0);" +
                "   pos.xy = v3Pos.xy * data.zw * 2.0;" +
                "   pos.x += data.x * 2.0 - 1.0;" +
                "   pos.y += -data.y * 2.0 + 1.0;" +
                "   vec4 vt0= vec4(pos, 1.0);" +
                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                " precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "uniform vec3 uScale;\n" +
                "uniform vec3 uBias;\n" +
                "vec3 ii(vec3 c){vec3 ij=sqrt(c);\n" +
                "return(ij-ij*c)+c*(0.4672*c+vec3(0.5328));\n" +
                "}void main(void){\n" +

                "vec4 ik=texture2D(s_texture,v_texCoord);\n" +
                "vec3 c=ik.xyz;\n" +
                "c=c*uScale+uBias;\n" +

                "gl_FragColor.xyz=ii(c);\n" +
                "gl_FragColor=vec4(ik.x,ik.y,ik.z,1.0);\n" +


                "}"
            return $str

        }

    }

    export class modelShowRender extends UIRenderOnlyPicComponent {
        public constructor() {
            super();

        }
        protected uiProLocation: WebGLUniformLocation;
        protected ui2ProLocation: WebGLUniformLocation;
        protected initData(): void {
            this._uiList = new Array;

            this.objData = new ObjData();
            ProgrmaManager.getInstance().registe(BloomUiShader.BloomUiShader, new BloomUiShader)
            this.shader = ProgrmaManager.getInstance().getProgram(BloomUiShader.BloomUiShader);
            this.program = this.shader.program;

            this.uiProLocation = Scene_data.context3D.getLocation(this.program, "ui")
            this.ui2ProLocation = Scene_data.context3D.getLocation(this.program, "ui2")



        }
        public makeRenderDataVc($vcId: number): void {
            super.makeRenderDataVc($vcId);
            for (var i: number = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = 1;
                this.renderData2[i * 4 + 1] = -1;
                this.renderData2[i * 4 + 2] = 0;
                this.renderData2[i * 4 + 3] = 0;
            }
        }

        public update(): void {


            if (!this.visible || this._uiList.length == 0) {
                if (this.modelRenderList && this.modelRenderList.length) {

                } else {
                    return
                }

            }
            Scene_data.context3D.setBlendParticleFactors(this.blenderMode);
            Scene_data.context3D.setProgram(this.program);
            this.setVc()
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
            this.setTextureToGpu()

            Scene_data.context3D.setVc3fv(this.shader, "uScale", [3.51284, 3.51284, 3.51284]);
            Scene_data.context3D.setVc3fv(this.shader, "uScale", [1, 1, 1]);
            Scene_data.context3D.setVc3fv(this.shader, "uBias", [0, 0, 0]);

            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            if (this.modelRenderList) {
                for (var i: number = 0; i < this.modelRenderList.length; i++) {
                    this.modelRenderList[i].update();
                }
            }
        }
    }


    export class PopModelShowPanel extends win.BaseWindow {

 
        public constructor() {
            super();
            this.modelPic = new modelShowRender();
            this.addRender(this.modelPic)
            this.addPojectView();
            this.initView();
        }
        public propPanle: MetriMeshSprite;
        private metriSpriteMesh: MetriSpriteMesh
        private addPojectView(): void {
            this.propPanle = new MetriMeshSprite();
            this.metriSpriteMesh = new MetriSpriteMesh(this.propPanle);
            this.propPanle.addMeshView(this.metriSpriteMesh)
        }

        protected loadConfigCom(): void {
            super.loadConfigCom();
 

            this.setUiListVisibleByItem([this.c_left_line], true)
            this.setUiListVisibleByItem([this.c_right_line], true)
            this.setUiListVisibleByItem([this.c_bottom_line], true)
            this.setUiListVisibleByItem([this.c_tittle_bg], true)
            this.setUiListVisibleByItem([this.c_win_bg], true)
        //    this.setUiListVisibleByItem([this.b_win_close], true)

            
            this.a_tittle_bg = this.c_tittle_bg
            this.a_tittle_bg.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

           
        
        }
        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.b_win_close) {
                this.perent.removeUIContainer(this)
            }
        }
  
        private modelPic: modelShowRender;
 
        private showModelPicUI: UICompenent
        private initView(): void {
   
            var ui: UICompenent = new UICompenent()
            ui.width = 150;
            ui.height = 150;
            ui.x = 0;
            ui.y = 0;
            ui.name = "renderui";
            ui.uiRender = this.modelPic;
            this.addChild(ui);
            this.showModelPicUI = ui;
            this.showModelPicUI.y = 30
        
            this.modelPic.setImgUrl("pan/marmoset/uilist/1024.jpg");
            ModelShowModel.getInstance()._bigPic = this.modelPic;
            ModelShowModel.getInstance().addBaseModel()

            this.showModelPicUI.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
       
 
            document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) });


            this.resize();
         
 
        }
        public onMouseWheel($evt: MouseWheelEvent): void {
           // console.log(this.pageRect.isHitByPoint($evt.x, $evt.y) , this.hasStage)

            if (this.pageRect.isHitByPoint($evt.x, $evt.y) && this.hasStage) {
                Scene_data.cam3D.distance += ($evt.wheelDelta * Scene_data.cam3D.distance) / 1000;
           
            }
        }
  
        protected tittleMouseDown(evt: InteractiveEvent): void {
            if (this.showModelPicUI == evt.target) {
                this.lastPagePos = new Vector2D(Scene_data.focus3D.rotationX, Scene_data.focus3D.rotationY)
            }
            super.tittleMouseDown(evt)
        }
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
 
            switch (this.mouseMoveTaget) {
                case this.showModelPicUI:
                    Scene_data.focus3D.rotationX = this.lastPagePos.x - (evt.y - this.lastMousePos.y)
                    Scene_data.focus3D.rotationY = this.lastPagePos.y - (evt.x - this.lastMousePos.x)
                    break
             
                default:
      
                    break

            }

        }
        public resize(): void {

            var panel: Panel = <Panel>this.perent;
            if (panel) {
                this.pageRect.x = panel.x
                this.pageRect.y = panel.y;
                this.pageRect.width = panel.width
                this.pageRect.height = panel.height
            }
          

            super.resize()
            if (this.uiLoadComplete) {
                var maxHeight: number = (this.pageRect.height - this.a_tittle_bg.height) - this.metriSpriteMesh.height;
                maxHeight = Math.max(100, maxHeight);

                var minW: number = Math.min(this.pageRect.width - 20, maxHeight)


                this.showModelPicUI.width = minW;
                this.showModelPicUI.height = minW;
                this.showModelPicUI.x = (this.pageRect.width - minW) / 2
                this.showModelPicUI.y = (this.pageRect.height - this.a_tittle_bg.height - minW) / 2 + this.a_tittle_bg.height
                this.showModelPicUI.y = 26

                this.metriSpriteMesh.y = this.showModelPicUI.height;
         
                this.propPanle.resize()
            }

       
      
        }
   
 
        private _inputHtmlSprite: HTMLInputElement
        protected selectInputDae(evt: InteractiveEvent): void {


            this._inputHtmlSprite = <HTMLInputElement>document.createElement('input');
            this._inputHtmlSprite.setAttribute('id', '_ef');
            this._inputHtmlSprite.setAttribute('type', 'file');
            this._inputHtmlSprite.setAttribute("style", 'visibility:hidden');
            this._inputHtmlSprite.click();
            this._inputHtmlSprite.value;
            this._inputHtmlSprite.addEventListener("change", (cevt: any) => { this.changeFile(cevt) });


        }
        private changeFile(evt: any): void {
            for (var i: number = 0; i < this._inputHtmlSprite.files.length && i < 1; i++) {
                var simpleFile: File = <File>this._inputHtmlSprite.files[i];
                if (!/image\/\w+/.test(simpleFile.type)) {
                    var $reader: FileReader = new FileReader();

                    if (simpleFile.name.indexOf(".md5mesh") != -1) {

                        $reader.readAsText(simpleFile);
                        $reader.onload = ($temp: Event) => {
                            ModelShowModel.getInstance().webmd5Sprite.addLocalMeshByStr(<string>$reader.result)
                        }
                        return
                    }
                    if (simpleFile.name.indexOf(".md5anim") != -1) {

                        $reader.readAsText(simpleFile);
                        $reader.onload = ($temp: Event) => {
                            ModelShowModel.getInstance().webmd5Sprite.addLocalAdimByStr(<string>$reader.result)

                            ModelShowModel.getInstance().changeWebModel();
                        }
                        return
                    }
                    if (simpleFile.name.indexOf("objs.txt") != -1) {
                        $reader.readAsText(simpleFile);
                        $reader.onload = ($temp: Event) => {
                            ModelShowModel.getInstance().readTxtToModelBy(<string>$reader.result)
                        }
                    } else {
                        // alert("objs.txt结尾对象0" + simpleFile.name);
                        $reader.readAsArrayBuffer(simpleFile);
                        $reader.onload = ($temp: Event) => {
                            if (this.isRoleFile(<ArrayBuffer>$reader.result)) {
                                console.log("是角色", simpleFile.name)
                                pack.RoleChangeModel.getInstance().loadLocalFile(<ArrayBuffer>$reader.result)
                                left.SceneRenderToTextrue.getInstance().viweLHnumber = 1000
                            } else {
                                alert("不确定类型");
                            }
                        }

                    }
                } else {
                    alert("请确保文件类型为图像类型");
                }
            }
            this._inputHtmlSprite = null;
        }
        private isRoleFile(arrayBuffer: ArrayBuffer): boolean {
            var $byte: ByteArray = new ByteArray(arrayBuffer);
            $byte.position = 0
            var $version: number = $byte.readInt();
            var $url: string = $byte.readUTF();
            if ($url.indexOf("role/") != -1) {
                return true
            } else {
                return false
            }

        }





    }
}