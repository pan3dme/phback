module pack {
    import LoadManager = Pan3d.LoadManager
    import Scene_data = Pan3d.Scene_data
    import Pan3dByteArray = Pan3d.Pan3dByteArray
    import RoleStaticMesh = pack.RoleStaticMesh
    import Display3dMovie = Pan3d.Display3dMovie
    import MeshData = Pan3d.MeshData
    import MaterialBaseParam = Pan3d.MaterialBaseParam
    import Material = Pan3d.Material
    import TexItem = Pan3d.TexItem
    import AnimData = Pan3d.AnimData
    import SkinMesh = Pan3d.SkinMesh
 
    import DualQuatFloat32Array = Pan3d.DualQuatFloat32Array
    import Dictionary = Pan3d.Dictionary
 


    export class PackRoleManager {

        private static _instance: PackRoleManager;
        public static getInstance(): PackRoleManager {
            if (!this._instance) {
                this._instance = new PackRoleManager();
            }
            return this._instance;
        }
        public constructor() {

        }
        private dic: any = {}
        private loadDic: any = {}


        private playBfun($prefab: RoleStaticMesh, $url: string): void {
            if (!this.dic[$url]) {
                this.dic[$url] = $prefab;
            }
            while (this.loadDic[$url].length) {
                this.loadDic[$url].pop()($prefab);
            }
        }

        private makeBufToRole(meshData: MeshData): void {
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
            var arrId: number = 0
            for (var i: number = 0; i < $len; i++) {
                var pos: number = i * stride + offset;
                for (var j: number = 0; j < dataWidth; j++) {
                    var $num = arr[arrId++];
                    data.setFloat32(pos + j * 4, $num, true);
                }
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
        protected getmeshBoneQPAryDic($arr: any): Dictionary {
            var item: Dictionary = new Dictionary([])
            for (var key in $arr) {
                var a1: Array<Array<DualQuatFloat32Array>> = new Array;
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

 
  
        public getRoleZzwByUrl($url: string, bfun: Function): void {
            if (this.dic[$url]) { //有了就反回
                bfun(this.dic[$url])
            }
            if (!this.loadDic[$url]) { //创建加载队列
                this.loadDic[$url] = [bfun]

                LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.XML_TYPE,
                    ($str: string) => {
                        var temp: any = JSON.parse($str);
                        var tempRoleStatemesh: RoleStaticMesh = new RoleStaticMesh();
                        tempRoleStatemesh.url = $url;
                        tempRoleStatemesh.animPlayKey = temp.animPlayKey;
                        var $skinMesh: SkinMesh = new SkinMesh();
                        $skinMesh.meshAry = new Array();
                        for (var i: number = 0; i < temp.meshAry.length; i++) {
                            var $meshData: MeshData = new MeshData()
                            /*
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

                            $meshData.uvsOffsets = temp.meshAry[i].uvsOffsets;
                            $meshData.tangentsOffsets = temp.meshAry[i].tangentsOffsets;
                            $meshData.bitangentsOffsets = temp.meshAry[i].bitangentsOffsets;
                            $meshData.normalsOffsets = temp.meshAry[i].normalsOffsets;
                            $meshData.boneIDOffsets = temp.meshAry[i].boneIDOffsets;
                            $meshData.boneWeightOffsets = temp.meshAry[i].boneWeightOffsets;
                            */
                            for (var strKey in temp.meshAry[i]) {
                                $meshData[strKey] = temp.meshAry[i][strKey];
                            }
                            $meshData.material = null
                            this.makeBufToRole($meshData);
                            $meshData.compressBuffer = true
                            $skinMesh.meshAry.push($meshData)
                        }
                        var $animDic: any = {};
                        for (var key in temp.animDic) {
                                var $animData: AnimData = new AnimData
                                $animData.meshBoneQPAryDic = this.getmeshBoneQPAryDic(temp.animDic[key].meshBoneQPAryDic);
                                $animDic[key] = $animData;
                        }
                        tempRoleStatemesh.skinMesh = $skinMesh;
                        tempRoleStatemesh.animDic = $animDic;
                        if (tempRoleStatemesh.skinMesh.meshAry.length) {
                            for (var i: number = 0; i < tempRoleStatemesh.skinMesh.meshAry.length; i++) {
                                this.loadMeshArrBy(tempRoleStatemesh.skinMesh.meshAry, i, () => {
                                    this.playBfun(tempRoleStatemesh, $url);
                                })
                            }
                        } else {
                            this.playBfun(tempRoleStatemesh, $url); //没有mesh时就不需要处理里面的材质对象
                        }
                  

                });
            } else {
                this.loadDic[$url].push(bfun)
            }


        }

        private loadMeshArrBy(value: Array<any>, i: number, bfun: Function): void {
            if (!value[i].materialUrl) {
                value[i].materialUrl = "assets/base/base.material" //设计默认材质路径
            }
            pack.PackMaterialManager.getInstance().getMaterialByUrl(value[i].materialUrl, ($materialTree: materialui.MaterialTree) => {
                $materialTree.shader = $materialTree.roleShader;
             //   $materialTree.program = $materialTree.shader.program;
                value[i].material = $materialTree
                var isFinish: boolean = true
                for (var j: number = 0; j < value.length; j++) {
                    if (!value[j].material) {
                        isFinish = false;
                    }
                }
                if (isFinish) {
                    bfun()
                   // console.log("所有材质加载完成,只回一次")
                }
            })
        }


    }
}