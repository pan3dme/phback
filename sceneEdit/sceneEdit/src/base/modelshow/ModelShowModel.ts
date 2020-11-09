module left {
    import Scene_data = Pan3d.Scene_data;
    import TimeUtil = Pan3d.TimeUtil;
    import MaterialManager = Pan3d.MaterialManager
 
    import LineDisplayShader = Pan3d.LineDisplayShader;
    import GridLineSprite = Pan3d.GridLineSprite;
    import ProgrmaManager = Pan3d.ProgrmaManager;
    import Shader3D = Pan3d.Shader3D;
    import MaterialShader = Pan3d.MaterialShader;
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    import Material = Pan3d.Material;
    import Display3D = Pan3d.Display3D
    
    
    export class ModelShowModel {
        private static _instance: ModelShowModel;
        public static getInstance(): ModelShowModel {
            if (!this._instance) {
                this._instance = new ModelShowModel();
            }
            return this._instance;
        }
        public modelSprite: MaterialModelSprite
        public roleSprite: MaterialRoleSprite
        public addBaseModel(): void {
            Scene_data.cam3D.distance = 150

            this.modelSprite = new MaterialModelSprite();
            this.roleSprite = new MaterialRoleSprite();

            this.selectShowDisp = this.modelSprite;

            TimeUtil.addFrameTick((t: number) => { this.update(t) });
            this.makeMd5MoveSprite()

        }
        public changeWebModel(): void {
            this.roleSprite.changeRoleWeb(this.webmd5Sprite)
        }
        public webmd5Sprite: LocalMd5MoveSprite;
        private makeMd5MoveSprite(): void {
            this.webmd5Sprite = new LocalMd5MoveSprite();
            this.webmd5Sprite.setMd5url("2/body.md5mesh", "2/stand.md5anim", "white.jpg")
 
        }

        private _time: number
        public _bigPic: UIRenderOnlyPicComponent;
        public update(t): void {

            if (this._bigPic && this._bigPic.textureRes) {
         
                if (this.selectShowDisp instanceof MaterialRoleSprite) {
                    this.selectShowDisp.updateFrame(t)
                    Scene_data.focus3D.y = 20
                } else {
                    Scene_data.focus3D.y = 0
                }
             
                SceneRenderToTextrue.getInstance().renderToTexture([this.selectShowDisp, this.webmd5Sprite ]);
                if (SceneRenderToTextrue.getInstance().fbo) {
                    this._bigPic.textureRes.texture = SceneRenderToTextrue.getInstance().fbo.texture;
                }
            }
        }
        public selectShowDisp: Display3D
      
        public readTxtToModelBy(value: string): void {
          
            this.modelSprite.readTxtToModel(value);
            var maxVec: Vector3D = new Vector3D()
            for (var i: number = 0; i < this.modelSprite.objData.vertices.length / 3; i++) {
                maxVec.x = Math.max(maxVec.x, Math.abs(this.modelSprite.objData.vertices[i * 3 + 0]))
                maxVec.y = Math.max(maxVec.y, Math.abs(this.modelSprite.objData.vertices[i * 3 + 1]))
                maxVec.z = Math.max(maxVec.z, Math.abs(this.modelSprite.objData.vertices[i * 3 + 2]))
            }
            SceneRenderToTextrue.getInstance().viweLHnumber = Math.max(maxVec.x, maxVec.y, maxVec.z) * 4
            Scene_data.cam3D.distance = Math.max(maxVec.x, maxVec.y, maxVec.z) * 2
            this.selectShowDisp = this.modelSprite;

        }
        public changeRoleUrl(value: string): void {
            var $role: MaterialRoleSprite = new MaterialRoleSprite();
            $role.setRoleUrl(value);
            this.selectShowDisp = $role;
        
            
        }

        private makeRoleShader($treeMater: materialui.MaterialTree): void {

            var $roleShader: RoleMaterialShader = new RoleMaterialShader()
 
            $roleShader.buildParamAry($treeMater);
            $roleShader.vertex = $roleShader.getVertexShaderString();
            $roleShader.fragment = $treeMater.shaderStr;
            $roleShader.encode();
            console.log("----------vertex------------");
            console.log($roleShader.vertex);
            console.log("----------fragment------------");
            console.log($roleShader.fragment);
            console.log("----------roleShader------------");

            var $temp: materialui.MaterialTree = $treeMater.clone();
            $temp.roleShader = $roleShader;
     
 
            (<MaterialRoleSprite>this.selectShowDisp).material = $temp;
          
 
        }
        private makeBuldShader($treeMater: materialui.MaterialTree): void {
            var $buildShader: BuildMaterialShader = new BuildMaterialShader();
        
            $buildShader.buildParamAry($treeMater);
            $treeMater.shader.paramAry = $buildShader.paramAry
            $buildShader.vertex = $buildShader.getVertexShaderString();
            $buildShader.fragment = $treeMater.shaderStr;
            $buildShader.encode();
            var $temp: materialui.MaterialTree = $treeMater.clone()
            $temp.modelShader = $buildShader;
       
         
            console.log("----------vertex------------");
            console.log($buildShader.vertex);
            console.log("----------fragment------------");
            console.log($buildShader.fragment);
            console.log("----------buildShader------------");


            //将本来材质对象设置为新的效果

    
 
             
              (<MaterialModelSprite>this.selectShowDisp).material = $temp;
       
        }



        public outShaderStr($treeMater: materialui.MaterialTree): void {
            if (this.selectShowDisp instanceof MaterialModelSprite) {
                this.makeBuldShader($treeMater)
            }  
            if (this.selectShowDisp instanceof MaterialRoleSprite) {
                this.makeRoleShader($treeMater)
            } 

        }

        public getMaterialProgram(key: String, shaderCls: any, $material: Material, paramAry: any = null, parmaByFragmet: boolean = false): Shader3D {
            var keyStr: string = key + "_" + $material.url;
            if (paramAry) {
                for (var i: number = 0; i < paramAry.length; i++) {
                    keyStr += "_" + paramAry[i];
                }
                if (parmaByFragmet) {
                    keyStr += "true_";
                } else {
                    keyStr += "false_";
                }
            }
            if (parmaByFragmet) {
                paramAry = [$material.usePbr, $material.useNormal, $material.hasFresnel,
                $material.useDynamicIBL, $material.lightProbe, $material.directLight,
                $material.noLight, $material.fogMode];
            }

            var shader: Shader3D = new MaterialShader();
            shader.paramAry = paramAry;
            shader.fragment = $material.shaderStr;
            var encodetf: boolean = shader.encode();
            shader.useNum++;
            return shader;
        }

    }
}