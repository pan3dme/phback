module pack {

    import Engine = Pan3d.Engine
    import MathClass = Pan3d.MathClass
    import ModuleEventManager = Pan3d.ModuleEventManager
    import MaterialTree = materialui.MaterialTree
    import MaterialEvent = materialui.MaterialEvent
    import RoleRes = Pan3d.RoleRes
    import SkinMesh = Pan3d.SkinMesh
    import ResManager = Pan3d.ResManager
    import BaseRes = Pan3d.BaseRes
    import Pan3dByteArray = Pan3d.Pan3dByteArray
    import MeshData = Pan3d.MeshData
    import AnimData = Pan3d.AnimData
    import Dictionary = Pan3d.Dictionary
    import DualQuatFloat32Array = Pan3d.DualQuatFloat32Array
    import MeshDataManager = Pan3d.MeshDataManager
    import Scene_data = Pan3d.Scene_data
    import LoadManager = Pan3d.LoadManager

    
    export class MeshDataChangeManager extends MeshDataManager {

        public readData(byte, $batchNum, $url, $version): SkinMesh {

            var $SkinMesh:SkinMesh = super.readData(byte, $batchNum, $url, $version)
  
            return $SkinMesh;
        }
        public readMesh2OneBuffer(byte: Pan3dByteArray, meshData: MeshData): void {
            var len: number = byte.readInt()

            var typeItem: Array<boolean> = new Array;
            var dataWidth: number = 0;
            for (var i: number = 0; i < 5; i++) {
                var tf: boolean = byte.readBoolean();
                typeItem.push(tf);
                if (tf) {
                    if (i == 1) {
                        dataWidth += 2;
                    } else {
                        dataWidth += 3;
                    }
                }
            }

            dataWidth += 8;

            len *= dataWidth * 4;

            var uvsOffsets: number = 3; // 1
            var normalsOffsets: number = uvsOffsets + 2; // 2
            var tangentsOffsets: number = normalsOffsets + 3; //3
            var bitangentsOffsets: number = tangentsOffsets + 3; //4
            var boneIDOffsets: number;
            if (typeItem[2]) {//normal
                if (typeItem[4]) {
                    boneIDOffsets = bitangentsOffsets + 3;
                } else {
                    boneIDOffsets = normalsOffsets + 3;
                }
            } else {
                boneIDOffsets = uvsOffsets + 2;
            }
            var boneWeightOffsets: number = boneIDOffsets + 4;

            var arybuff: ArrayBuffer = new ArrayBuffer(len);
            var data: DataView = new DataView(arybuff);

            this.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth);//vertices
            this.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth);//uvs
            this.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth);//normals
            this.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth);//tangents
            this.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth);//bitangents

            this.readBytes2ArrayBuffer(byte, data, 4, boneIDOffsets, dataWidth, 2);//boneIDAry
            this.readBytes2ArrayBuffer(byte, data, 4, boneWeightOffsets, dataWidth, 1);//boneWeightAry


            meshData.vertices = this.readChangeBuff(data, 3, 0, dataWidth);//vertices
            meshData.uvs = this.readChangeBuff(data, 2, uvsOffsets, dataWidth);//uvs
            if (typeItem[2]) {//normal  //如果没有就先用顶点顶上
                meshData.normals = this.readChangeBuff(data, 3, normalsOffsets, dataWidth);//normals
            } else {
                meshData.normals = meshData.vertices;
            }
            if (typeItem[3]) {
                meshData.tangents = this.readChangeBuff(data, 3, tangentsOffsets, dataWidth);//tangents
            } else {
                meshData.tangents = meshData.normals;
            }
            if (typeItem[4]) {
                meshData.bitangents = this.readChangeBuff(data, 3, bitangentsOffsets, dataWidth);//bitangents
            } else {
                meshData.bitangents = meshData.normals;
            }


            meshData.boneIDAry = this.readChangeBuff(data, 4, boneIDOffsets, dataWidth);//boneIDAry
            meshData.boneWeightAry = this.readChangeBuff(data, 4, boneWeightOffsets, dataWidth);//boneWeightAry


 
    



            BaseRes.readIntForTwoByte(byte, meshData.indexs);
            BaseRes.readIntForTwoByte(byte, meshData.boneNewIDAry);

            meshData.compressBuffer = true;
            meshData.uvsOffsets = uvsOffsets * 4;
            meshData.normalsOffsets = normalsOffsets * 4;
            meshData.tangentsOffsets = tangentsOffsets * 4;
            meshData.bitangentsOffsets = bitangentsOffsets * 4;
            meshData.boneIDOffsets = boneIDOffsets * 4;
            meshData.boneWeightOffsets = boneWeightOffsets * 4;

            meshData.stride = 16 * 4; //这里强制设置 原来 dataWidth;

            meshData.vertexBuffer = Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
            meshData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(meshData.indexs);


        }
  
        private readChangeBuff(data: DataView, $dataWidth: number, $offset: number, $stride: number): Array<number>  {

            var $arr: Array<number> = new Array
            var len: number = data.byteLength / (4 * $stride)
            for (var i: number = 0; i < len; i++) {
                var pos: number = $stride * i + $offset;
                for (var j: number = 0; j < $dataWidth; j++) {
                    var id: number = (pos + j) * 4
                    var num = data.getFloat32(id, true);
                    data.setFloat32(id, num, true);
                    $arr.push(num)
                }
            }
            return $arr
        }




        public   readBytes2ArrayBuffer($byte: Pan3dByteArray, $data: DataView, $dataWidth: number, $offset: number, $stride: number, $readType: number = 0): void {
            var verLength: number = $byte.readInt();

            if (verLength <= 0) {
                return;
            }

            var scaleNum: number;
            if ($readType == 0) {
                scaleNum = $byte.readFloat();
            }

            var readNum: number = verLength / $dataWidth;
            for (var i: number = 0; i < readNum; i++) {
                var pos: number = $stride * i + $offset;
                for (var j: number = 0; j < $dataWidth; j++) {

                    if ($readType == 0) {
                
                        $data.setFloat32((pos + j) * 4, $byte.readFloatTwoByte(scaleNum), true);
                    

                    } else if ($readType == 1) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloatOneByte(), true);
                    } else if ($readType == 2) {
                        $data.setFloat32((pos + j) * 4, $byte.readByte(), true);
                    } else if ($readType == 3) {
                        $data.setFloat32((pos + j) * 4, ($byte.readByte() + 128) / 255, true);
                    } else if ($readType == 4) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloat(), true);
                    }


                }

            }



        }

    }

    export class RoleChangeRes extends RoleRes {
        public meshDataChangeManager: MeshDataChangeManager
        constructor() {
            super();
            this.meshDataChangeManager = new MeshDataChangeManager()

        }
        protected readNext(): void {
            this.read();//readmaterial
            this.read();//readparticle;

        }
        public readMesh(): void {
            this.roleUrl = this._byte.readUTF();
            if (this.version >= 16) { //环境参数
                this.ambientLightColor = new Vector3D;
                this.sunLigthColor = new Vector3D;
                this.nrmDircet = new Vector3D;

                this.ambientLightColor.x = this._byte.readFloat();
                this.ambientLightColor.y = this._byte.readFloat();
                this.ambientLightColor.z = this._byte.readFloat();
                this.ambientLightIntensity = this._byte.readFloat();
                this.ambientLightColor.scaleBy(this.ambientLightIntensity);

                this.sunLigthColor.x = this._byte.readFloat();
                this.sunLigthColor.y = this._byte.readFloat();
                this.sunLigthColor.z = this._byte.readFloat();
                this.sunLigthIntensity = this._byte.readFloat();
                this.sunLigthColor.scaleBy(this.sunLigthIntensity);

                this.nrmDircet.x = this._byte.readFloat();
                this.nrmDircet.y = this._byte.readFloat();
                this.nrmDircet.z = this._byte.readFloat();
            }

            this.meshDataChangeManager.readData(this._byte, this.meshBatchNum, this.roleUrl, this.version);
    
            this.readAction();
        }
    }
    export class RoleChangeModel {
        private static _instance: RoleChangeModel;
        public static getInstance(): RoleChangeModel {
            if (!this._instance) {
                this._instance = new RoleChangeModel();
            }
            return this._instance;
        }
        private materialRoleSprite: left.MaterialRoleSprite

        private changeRoleModel(zzwUrl: string, roleDis: left.MaterialRoleSprite): void {

            this.materialRoleSprite = roleDis;
            this.loadWebRole(zzwUrl);
        }
        public loadLocalFile(arrayBuffer: ArrayBuffer, roleDis: left.MaterialRoleSprite): void {
            this.materialRoleSprite = roleDis;
            var $roleRes: RoleChangeRes = new RoleChangeRes();
            $roleRes.loadComplete(arrayBuffer);
            this.makeMeshData($roleRes);
            this.loatMaterialTree("base.material");
        }
        public makeBufToRole(meshData: MeshData): void {
            var len: number = (meshData.vertices.length / 3) * meshData.stride
            var arybuff: ArrayBuffer = new ArrayBuffer(len);
            var data: DataView = new DataView(arybuff);

            this.pushToBuff(data, meshData.vertices, 3, 0, meshData.stride);//vertices
            this.pushToBuff(data, meshData.uvs, 2, meshData.uvsOffsets, meshData.stride);//vertices

            this.pushToBuff(data, meshData.tangents, 3, meshData.tangentsOffsets, meshData.stride);//vertices
            this.pushToBuff(data, meshData.bitangents, 3, meshData.bitangentsOffsets, meshData.stride);//vertices
            this.pushToBuff(data, meshData.normals, 3, meshData.normalsOffsets, meshData.stride);//vertices
 
            this.pushToBuff(data, meshData.boneIDAry, 4, meshData.boneIDOffsets, meshData.stride);//vertices
            this.pushToBuff(data, meshData.boneWeightAry, 4, meshData.boneWeightOffsets, meshData.stride);//vertices
 
            meshData.vertexBuffer = Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
            meshData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(meshData.indexs);
           

        }
        private pushToBuff(data: DataView, arr: Array<number>, dataWidth: number, offset: number, stride: number): void {
          
            var $len: number = data.byteLength / stride
            var arrId: number=0
            for (var i: number = 0; i < $len; i++) {
                var pos: number = i * stride + offset;
                for (var j: number = 0; j < dataWidth; j++) {
                    var $num = arr[arrId++];
                    data.setFloat32(pos + j * 4, $num, true);
                }
            }


        }

        private makeMeshData($roleRes: RoleChangeRes): void {
            //比较差的方法存放并修改模型文件
            var $mesh: SkinMesh = $roleRes.meshDataChangeManager.getMeshDataByLocalUrl($roleRes.roleUrl);
            var url: string = $roleRes.roleUrl;
            //  $mesh.loadMaterial();
            $mesh.setAction($roleRes.actionAry, url);
            $mesh.url = url;
            if ($roleRes.ambientLightColor) {
                $mesh.lightData = [[$roleRes.ambientLightColor.x, $roleRes.ambientLightColor.y, $roleRes.ambientLightColor.z],
                [$roleRes.nrmDircet.x, $roleRes.nrmDircet.y, $roleRes.nrmDircet.z],
                [$roleRes.sunLigthColor.x, $roleRes.sunLigthColor.y, $roleRes.sunLigthColor.z]];
            }
            $mesh.ready = true;
            this.meshAnimDic($mesh.animDic)
 
            for (var i: number = 0; i < $mesh.meshAry.length; i++) {
                var $meshData: MeshData = new MeshData()
                this.makeBufToRole($mesh.meshAry[i])
                $meshData.compressBuffer = true;

          
                $meshData.vertexBuffer = $mesh.meshAry[i].vertexBuffer;
                $meshData.indexBuffer = $mesh.meshAry[i].indexBuffer;


                $meshData.uid = $mesh.meshAry[i].uid;
                $meshData.stride = $mesh.meshAry[i].stride;
                $meshData.treNum = $mesh.meshAry[i].treNum;

                $meshData.uvsOffsets = $mesh.meshAry[i].uvsOffsets;
                $meshData.tangentsOffsets = $mesh.meshAry[i].tangentsOffsets;
                $meshData.bitangentsOffsets = $mesh.meshAry[i].bitangentsOffsets;
                $meshData.normalsOffsets = $mesh.meshAry[i].normalsOffsets;
                $meshData.boneIDOffsets = $mesh.meshAry[i].boneIDOffsets;
                $meshData.boneWeightOffsets = $mesh.meshAry[i].boneWeightOffsets;
 
 

 
            }
            this.materialRoleSprite.skinMesh = $mesh;

  
        }
 
        private meshAnimDic(animDic: any): void {
            var $dic: any = {};
            for (var key in animDic) {
                var $temp: AnimData = animDic[key];
                var $animData: AnimData = new AnimData
                $animData.meshBoneQPAryDic = $temp.meshBoneQPAryDic;
                $dic[key] = $animData;
            }
            this.materialRoleSprite.animDic = $dic
        }
        public getChangeRoleStr(): string {
            if (this.materialRoleSprite.skinMesh) {
                var temp: any = {};
                temp.meshAry = this.materialRoleSprite.skinMesh.meshAry;
                temp.animDic = this.materialRoleSprite.animDic;
                for (var i: number = 0; i < temp.meshAry.length; i++) {
                    temp.meshAry[i].materialUrl = "assets/base/base.material" ;
                }
                var $str: string = JSON.stringify(temp);
                return $str
            } else {
                return null
            }
        }
        private getFloat32ArrayByArr(obj: any): Float32Array {
            var numarr: Array<number> = new Array
            for (var key in obj) {
                numarr.push(obj[key]);
            }
            var temp: Float32Array = new Float32Array(numarr.length)
            for (var i: number = 0; i < numarr.length; i++) {
                temp[i] = numarr[i];
            }
            return temp
        }
        private getmeshBoneQPAryDic($arr: any): Dictionary {
            var item: Dictionary = new Dictionary([])
            for (var key in $arr) {
                var a1: Array<Array<DualQuatFloat32Array>>= new Array;
                for (var j: number = 0; j < $arr[key].length; j++) {
                    var a2: Array<any> = $arr[key][j]
                    var a3: Array<DualQuatFloat32Array> = new Array()
                    for (var k: number = 0; k < a2.length; k++) {
                        var a4: any = a2[k];
                        var $dbq: DualQuatFloat32Array = new DualQuatFloat32Array()
                        $dbq.quat = this.getFloat32ArrayByArr(a4.quat);
                        $dbq.pos = this.getFloat32ArrayByArr(a4.pos);
                        a3.push($dbq)
                    }
                    a1.push(a3)

                }

                item[key] = a1;
            }

            return item
        }
        private loatMaterialTree(textureurl: string): void {
            pack.PackMaterialManager.getInstance().getMaterialByUrl(textureurl, (materialTree: materialui.MaterialTree) => {
                materialTree.shader = materialTree.roleShader;
           //     materialTree.program = materialTree.shader.program;
                this.materialRoleSprite.material = materialTree;
            })
        }
        private loadWebRole(zzwUrl: string): void {
        

            LoadManager.getInstance().load(Scene_data.fileRoot + zzwUrl, LoadManager.XML_TYPE,
                    ($str: string) => {
                        var temp: any = JSON.parse($str);
                        console.log(temp)

                        var $skinMesh: SkinMesh = new SkinMesh();
                        $skinMesh.meshAry = new Array()
                        for (var i: number = 0; i < temp.meshAry.length; i++) {
                            var $meshData: MeshData = new MeshData()
                            $meshData.vertices = temp.meshAry[i].vertices
                            $meshData.uvs = temp.meshAry[i].uvs
                            $meshData.tangents = temp.meshAry[i].tangents
                            $meshData.bitangents = temp.meshAry[i].bitangents
                            $meshData.boneIDAry = temp.meshAry[i].boneIDAry
                            $meshData.boneWeightAry = temp.meshAry[i].boneWeightAry
                            
                            $meshData.normals = temp.meshAry[i].normals
                            $meshData.indexs = temp.meshAry[i].indexs

                            $meshData.stride = temp.meshAry[i].stride;

                            $meshData.uid = temp.meshAry[i].uid;
                  
                            $meshData.treNum = temp.meshAry[i]._treNum;

                         //   $meshData.treNum =400*3

                            $meshData.uvsOffsets = temp.meshAry[i].uvsOffsets;
                            $meshData.tangentsOffsets = temp.meshAry[i].tangentsOffsets;
                            $meshData.bitangentsOffsets = temp.meshAry[i].bitangentsOffsets;
                            $meshData.normalsOffsets = temp.meshAry[i].normalsOffsets;
                            $meshData.boneIDOffsets = temp.meshAry[i].boneIDOffsets;
                            $meshData.boneWeightOffsets = temp.meshAry[i].boneWeightOffsets;

                            this.makeBufToRole($meshData);
                            $meshData.compressBuffer = true
                           // this.materialRoleSprite.skinMesh.meshAry[i] = $meshData;
                            $skinMesh.meshAry.push($meshData)
                        }
                        var $animDic: any = {};
                        for (var key in temp.animDic) {
                           // var $temp: AnimData = temp.animDic[key];
                            var $animData: AnimData = new AnimData
                            $animData.meshBoneQPAryDic = this.getmeshBoneQPAryDic(temp.animDic[key].meshBoneQPAryDic);

                            $animDic[key] = $animData;
                        }

                        this.materialRoleSprite.skinMesh = $skinMesh
                        this.materialRoleSprite.animDic = $animDic

                        this.loatMaterialTree(temp.textureurl)
 
                });
        }

    }
}