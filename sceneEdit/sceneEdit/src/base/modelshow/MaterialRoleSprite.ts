module left {
    import Display3dMovie = Pan3d.Display3dMovie
    import MeshData = Pan3d.MeshData
    import MaterialBaseParam = Pan3d.MaterialBaseParam
    import Material = Pan3d.Material
    import TexItem = Pan3d.TexItem
    import AnimData = Pan3d.AnimData
    import SkinMesh = Pan3d.SkinMesh
    import BaseEvent = Pan3d.BaseEvent
    import Pan3dByteArray = Pan3d.Pan3dByteArray
    import Scene_data = Pan3d.Scene_data
    import DualQuatFloat32Array = Pan3d.DualQuatFloat32Array
    import Dictionary = Pan3d.Dictionary
    import Skill = Pan3d.Skill

    import OverrideSkill = layapan_me.OverrideSkill
    import LayaOverride2dSceneManager = layapan_me.LayaOverride2dSceneManager

    import MaterialTree = materialui.MaterialTree

    
    export class MaterialRoleSprite extends Display3dMovie {
        public update(): void {

            if (this.sceneVisible) {
                super.update();
            }
         
        }
        public get skinMesh(): SkinMesh {
            return this._skinMesh;
        }
        public set skinMesh(value: SkinMesh) {
            this._skinMesh = value;
        }

        public get animDic(): any {
            return this._animDic;
        }
        public set animDic(value: any) {
            this._animDic = value;


        }

        public updateFrame(t: number): void {

            this._actionTime += t;
            var actionKey: string;
            if (this.curentAction && this._animDic[this.curentAction]) {
                actionKey = this.curentAction;
            } else if (this._animDic[this._defaultAction]) {
                actionKey = this._defaultAction;
            } else {
                return;
            }


            var animData: AnimData = this._animDic[actionKey];
            var cutLen: number

            for (var i: number = 0; i < this._skinMesh.meshAry.length; i++) {

                cutLen = animData.getBoneQPAryByMesh(this._skinMesh.meshAry[i])[0].length
            }

            this._curentFrame = float2int(this._actionTime / (Scene_data.frameTime * 2));

            if (this._curentFrame >= cutLen) {
                if (this._completeState == 0) {
                    this._actionTime = 0;
                    this._curentFrame = 0;
                } else if (this._completeState == 1) {
                    this._curentFrame = cutLen - 1;
                } else if (this._completeState == 2) {
                    //this.play(this._defaultAction);
                    this._curentFrame = 0;
                    this._completeState = 0;
                    this.changeAction(this.curentAction)
                } else if (this._completeState == 3) {

                }
            }
        }

   

        public setVcMatrix($mesh: MeshData): void {
            Scene_data.context3D.setuniform3f($mesh.material.shader, "cam3DPos", Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z);
            super.setVcMatrix($mesh)
        }
        public updateMaterialMesh($mesh: MeshData): void {
            if ($mesh && $mesh.material) {
                var $materialTree: MaterialTree = <MaterialTree>$mesh.material
                $materialTree.shader = $materialTree.roleShader;
            }
            super.updateMaterialMesh($mesh)

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
                    if ($mp.dynamicTexList[i].target && $mp.dynamicTexList[i].texture) {
                        Scene_data.context3D.setRenderTexture($material.shader, $mp.dynamicTexList[i].target.name,
                            $mp.dynamicTexList[i].texture, $mp.dynamicTexList[i].target.id);
                    }
                }
            }
        }
        public skillVo: Skill;
        protected _walkPath: Array<Vector3D>;
        public playSkill($skill: Skill): void {

            var $scene: LayaOverride2dSceneManager = <LayaOverride2dSceneManager>this._scene;
            this._walkPath = null;
            $scene.skillManager.playSkill(<OverrideSkill>$skill);
            this.skillVo = $skill;
        }
        public setVaCompress($mesh: MeshData): void {
            var tf: boolean = Scene_data.context3D.pushVa($mesh.vertexBuffer);
            if (tf) {
                ////console.log('cccccc')
                return;
            }

            Scene_data.context3D.setVaOffset(0, 3, $mesh.stride, 0);
            Scene_data.context3D.setVaOffset(1, 2, $mesh.stride, $mesh.uvsOffsets);
            Scene_data.context3D.setVaOffset(2, 4, $mesh.stride, $mesh.boneIDOffsets);
            Scene_data.context3D.setVaOffset(3, 4, $mesh.stride, $mesh.boneWeightOffsets);

            if ($mesh.material.useNormal) {
                // Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
                Scene_data.context3D.setVaOffset(4, 3, $mesh.stride, $mesh.tangentsOffsets);
                Scene_data.context3D.setVaOffset(5, 3, $mesh.stride, $mesh.bitangentsOffsets);
                Scene_data.context3D.setVaOffset(6, 3, $mesh.stride, $mesh.normalsOffsets);
            }
        }
        public changeRoleWeb(dis: md5list.Md5MoveSprite): void {


            var $skinMesh: SkinMesh = new SkinMesh();
            $skinMesh.meshAry = new Array()
            for (var i: number = 0; i < 1; i++) {
                var $meshData: MeshData = new MeshData()
                $meshData.vertices = dis.md5objData.vertices
                $meshData.uvs = dis.md5objData.uvs
                $meshData.tangents = dis.md5objData.vertices
                $meshData.bitangents = dis.md5objData.vertices
                $meshData.normals = dis.md5objData.vertices
                $meshData.boneIDAry = dis.md5MeshData.boneIDAry
                $meshData.boneWeightAry = dis.md5MeshData.boneWeightAry

                $meshData.indexs = dis.md5objData.indexs
                $meshData.treNum = dis.md5MeshData.treNum;



                $meshData.uid = 0;


                $meshData.stride = 64

                $meshData.uvsOffsets = 12
                $meshData.tangentsOffsets = 32;
                $meshData.bitangentsOffsets = 44;
                $meshData.normalsOffsets = 20;
                $meshData.boneIDOffsets = 20;
                $meshData.boneWeightOffsets = 36;

                pack.RoleChangeModel.getInstance().makeBufToRole($meshData)


                $meshData.compressBuffer = true
                $skinMesh.meshAry.push($meshData)
            }

            var $animDic: any = {};
            var $animData: AnimData = new AnimData
            $animData.meshBoneQPAryDic = this.getmeshBoneQPAryDic(dis.frameQuestArr)
            $animDic["stand"] = $animData;

            this.skinMesh = $skinMesh
            this.animDic = $animDic

 
        }
        private getmeshBoneQPAryDic($arr: Array<DualQuatFloat32Array>): Dictionary {
            var item: Dictionary = new Dictionary([])
            var a1: Array<Array<DualQuatFloat32Array>> = new Array;
            a1.push($arr)
            item[0] = a1;
            return item
        }
        public roleStaticMesh: pack.RoleStaticMesh
        public setRoleZwwUrl(url: string): void {
            pack.PackRoleManager.getInstance().getRoleZzwByUrl(url, (value: pack.RoleStaticMesh) => {
                this.roleStaticMesh = value;
                this.skinMesh = this.roleStaticMesh.skinMesh
                this.animDic = this.roleStaticMesh.animDic
                this.material = this.roleStaticMesh.material;
                this.roleStaticMesh.addEventListener(BaseEvent.COMPLETE, this.meshParamInfo, this);
                this.meshParamInfo();
            })
        }
        protected meshParamInfo(): void {
            for (var i: number = 0; i < this.skinMesh.meshAry.length; i++) {
                if (this.skinMesh.meshAry[i].material && (<any>this.skinMesh.meshAry[i]).paramInfo) {
                    this.skinMesh.meshAry[i].materialParam = new Pan3d.MaterialBaseParam;
                    this.skinMesh.meshAry[i].materialParam.material = this.skinMesh.meshAry[i].material
                    pack.PackPrefabManager.getInstance().makeMaterialBaseParam(this.skinMesh.meshAry[i].materialParam,( <any>this.skinMesh.meshAry[i]).paramInfo);
                } 
            }
            this.play(this.roleStaticMesh.animPlayKey, 0);
        }

    }

   
}