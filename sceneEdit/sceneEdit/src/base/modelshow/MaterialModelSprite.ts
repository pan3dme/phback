/*
class MaterialModelShader extends Shader3D {
    static MaterialModelShader: string = "MaterialModelShader";
    constructor() {
        super();
    }
    binLocation($context: WebGLRenderingContext): void {
        $context.bindAttribLocation(this.program, 0, "v3Position");
        $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
    }
    getVertexShaderString(): string {
        var $str: string =
            "attribute vec3 v3Position;" +
            "attribute vec2 v2CubeTexST;" +
            "uniform mat4 vpMatrix3D;" +
            "uniform mat4 posMatrix3D;" +
            "varying vec2 v_texCoord;" +
            "void main(void)" +
            "{" +
            "   v_texCoord = vec2(v2CubeTexST.x, v2CubeTexST.y);" +
            "   vec4 vt0= vec4(v3Position, 1.0);" +
            "   vt0 = posMatrix3D * vt0;" +
            "   vt0 = vpMatrix3D * vt0;" +
            "   gl_Position = vt0;" +
            "}"
        return $str


    }
    getFragmentShaderString(): string {
        var $str: string =
            "precision mediump float;\n" +
            "uniform sampler2D fs0;\n" +
            "varying vec2 v_texCoord;\n" +
            "void main(void)\n" +
            "{\n" +
                "vec4 infoUv = texture2D(fs0, v_texCoord.xy);\n" +
                "gl_FragColor =vec4(1.0,0.0,0.0,1.0);\n" +
            "}"
        return $str

    }

}
*/
module left {
    import Display3DSprite = Pan3d.Display3DSprite
    import Scene_data = Pan3d.Scene_data
    import Shader3D = Pan3d.Shader3D
    import GroupDataManager = Pan3d.GroupDataManager
    import Material = Pan3d.Material
    import GroupRes = Pan3d.GroupRes
    import GroupItem = Pan3d.GroupItem
    import BaseRes = Pan3d.BaseRes
    import TexItem = Pan3d.TexItem
    import MaterialBaseParam = Pan3d.MaterialBaseParam
    import ObjData = Pan3d.ObjData
    import TimeUtil = Pan3d.TimeUtil
    import MaterialTree = materialui.MaterialTree
   

    export class MaterialModelSprite extends Display3DSprite {
        constructor() {
            super();
        }
        public setMaterialVc($material: Material, $mp: MaterialBaseParam = null): void {
            var $materialTree: MaterialTree = <MaterialTree>$material
   
            Scene_data.context3D.setBlendParticleFactors($materialTree.blendMode);
            Scene_data.context3D.setDepthTest($materialTree.zbuff);
            Scene_data.context3D.setWriteDepth($materialTree.writeZbuffer);
 
            if ($materialTree.hasTime) {
                var timeLen: number = ($materialTree.timeValue.x * 1000);
                var t: number = (TimeUtil.getTimer() - this.time) % timeLen; //时间间隔
                t /= timeLen;
                t *= $materialTree.timeValue.y;  //数值比例
                Scene_data.context3D.setuniform1f($material.shader, "time", t );
            }
            Scene_data.context3D.setuniform3f($material.shader, "cam3DPos", Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z);

            $material.update(t);
            if ($mp) {
                $mp.update();
            }
            Scene_data.context3D.setVc4fv($material.shader, "fc", $material.fcData);

        }
        public setMaterialTexture($material: Material, $mp: MaterialBaseParam = null): void {
            var texVec: Array<TexItem> = $material.texList;
            for (var i: number = 0; i < texVec.length; i++) {
                if (texVec[i].texture) {
                    if (texVec[i].type == TexItem.CUBEMAP) {
                        Scene_data.context3D.setRenderTextureCube($material.shader.program, texVec[i].name, texVec[i].texture, texVec[i].id);
                    } else {
                        Scene_data.context3D.setRenderTexture($material.shader, texVec[i].name, texVec[i].texture, texVec[i].id);
                    }
                } else {
                    console.log("还没加载好")
                }
            }
            if ($mp) {
                for (i = 0; i < $mp.dynamicTexList.length; i++) {
                    if ($mp.dynamicTexList[i].target &&   $mp.dynamicTexList[i].texture) {
                        Scene_data.context3D.setRenderTexture($material.shader, $mp.dynamicTexList[i].target.name,
                            $mp.dynamicTexList[i].texture, $mp.dynamicTexList[i].target.id);
                    }
                }
            }
        }
        public setMaterialVaIndependent(): void {
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
            var id: number = 2;
            if ((<MaterialTree>this.material).useLightUv) {
                Scene_data.context3D.setVa(id++, 2, this.objData.lightUvBuffer);
            }
            if (this.material.useNormal) {
                Scene_data.context3D.setVa(id++, 3, this.objData.tangentBuffer);
                Scene_data.context3D.setVa(id++, 3, this.objData.bitangentBuffer);
                Scene_data.context3D.setVa(id++, 3, this.objData.normalsBuffer);
            }
       
        }
        protected setBaseMaterialVc($material: Material): void {
            var t: number = 0;
            if ($material.hasTime) {
                t = (TimeUtil.getTimer() - this.time) % 100000 * 0.001;
            }
            $material.updateTime(t)
 
        }
       

        public readTxtToModel($str: string): void {
            var objstr: any = JSON.parse($str);
            var $objdata: ObjData = new ObjData();
            $objdata.vertices = objstr.vertices
            $objdata.normals = objstr.normals
            $objdata.uvs = objstr.uvs
            $objdata.lightuvs = objstr.lightuvs
            $objdata.indexs = objstr.indexs
            $objdata.treNum = $objdata.indexs.length

 
            TBNUtils.processTBN($objdata);

            $objdata.vertexBuffer = Scene_data.context3D.uploadBuff3D($objdata.vertices);
            $objdata.uvBuffer = Scene_data.context3D.uploadBuff3D($objdata.uvs);
            $objdata.lightUvBuffer = Scene_data.context3D.uploadBuff3D($objdata.lightuvs);
            $objdata.tangentBuffer = Scene_data.context3D.uploadBuff3D($objdata.tangents);
            $objdata.bitangentBuffer = Scene_data.context3D.uploadBuff3D($objdata.bitangents);
            $objdata.normalsBuffer = Scene_data.context3D.uploadBuff3D($objdata.normals);
            $objdata.indexBuffer = Scene_data.context3D.uploadIndexBuff3D($objdata.indexs);

            this.objData = $objdata;

           
        }
        private get isTextureLoadFinish(): boolean {
            if (this.material) {
                if (this.material.texList) {
                    for (var i: number = 0; i < this.material.texList.length; i++) {
                        if (!this.material.texList[i].texture) {
                            return false
                        }
                    }
                    return true
                } else {
                    return true
                }
            } else {
                return false
            }
       
        }
        public update(): void {
            if (this.isTextureLoadFinish && this.sceneVisible) {
                if (this.material) {
                    var $materialTree: MaterialTree = <MaterialTree>this.material;
                    $materialTree.shader = $materialTree.modelShader;
                }
                super.update()
            }
        }
        
    
  
    
    }
}