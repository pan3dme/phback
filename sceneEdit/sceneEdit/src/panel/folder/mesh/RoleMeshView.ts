module filelist {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material
 
    import RoleStaticMesh = pack.RoleStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class RoleMeshView extends MetaDataView {
        private _roleStaticMesh: RoleStaticMesh
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "roleurl", target: this, Category: "角色", ClikEventKey: "clikFileRole" },

                    { Type: ReflectionData.MeshScene2DUI, Label: "窗口:", FunKey: "roleurl", target: this, Category: "角色" },
            
                    { Type: ReflectionData.RoleAnim2DUI, Label: "动作:", FunKey: "animDic", changFun: ( ) => { this.animChange( ) }, target: this, Suffix: "md5mesh", Category: "action" },



                    { Type: ReflectionData.RoleMesh2DUI, Label: "mesh:", FunKey: "skinMesh", changFun: (value: Array<any>) => { this.textureChangeInfo(value) }, target: this, Suffix: "md5mesh", Category: "mesh" },


                    //{ Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "texture", changFun: (value: Array<any>) => { this.textureChangeInfo(value) }, target: this, Suffix: "material", Category: "mesh" },
                ];
            return ary;
        }
 
        public eventKey(value: string): void {
 
            switch (value) {
                case "clikFileRole":
                   var pathurl: string = Pan3d.Scene_data.fileRoot +this._roleStaticMesh.url
                     Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), pathurl.replace(Pan3d.Scene_data.ossRoot, ""))
                    break
                default:
                    console.log("没有对象", value)
                    break
            }

        }
        private animChange(): void {
  
            this.saveToSever()
            this.chuangeData()

        }
        public set animDic(value: Array<any>) {

            this.refreshViewValue()
        }
        public get animDic(): Array<any> {
            return this._roleStaticMesh.animDic
        }

        public set skinMesh(value: Array<any>) {

            this.refreshViewValue()
        }
        public get skinMesh(): Array<any> {
            return this._roleStaticMesh.skinMesh
        }


     
      

        private textureChangeInfo(value: Array<any>): void {
            //this._roleStaticMesh.paramInfo = value;
            this.saveToSever()
            this.chuangeData()

        }
        private chuangeData(): void {
            this._roleStaticMesh.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE))
        }
   
        public set roleurl(value: string) {

        }
        public get roleurl(): string {
            if (this._roleStaticMesh) {
                return this._roleStaticMesh.url
            } else {
                return null
            }

        }

        public set texture(value: Material) {
            this._roleStaticMesh.material = value
            this.refreshViewValue()
        }
        public get texture(): Material {
            return this._roleStaticMesh.material
        }
  

        public set data(value: any) {
            this._data = value;
            this._roleStaticMesh = this._data
            this.refreshViewValue()
        }
        public get data(): any {
            return this._data
        }

        public getChangeRoleStr(): string {
            if (this._roleStaticMesh.skinMesh) {
                var temp: any = this._roleStaticMesh.getObject()
                temp.version = pack.FileOssModel.version
                var $str: string = JSON.stringify(temp);
                return $str
            } else {
                return null
            }
        }


        private isSaveNow: boolean;
        private lastTm: number
        private saveTm: number
        public saveToSever(): void {
            this.lastTm = Pan3d.TimeUtil.getTimer()
            // this.isSaveNow = true

            if (!this.isSaveNow) {
                this.isSaveNow = true
                this.saveTm = this.lastTm;

                var $roleStr: string = this.getChangeRoleStr()
                var $file: File = new File([$roleStr], "ossfile.txt");
                var pathUrl: string = Pan3d.Scene_data.fileRoot + this._roleStaticMesh.url
                var pathurl: string = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");

                console.log("提交上传ing...", pathurl);
                pack.FileOssModel.upOssFile($file, pathurl, () => {

                    if (this.lastTm != this.saveTm) {
                        console.log("不是最后一次，所以需要再存一次")
                        Pan3d.TimeUtil.addTimeOut(1000, () => {
                            this.isSaveNow = false
                            this.saveToSever();
                        })
                    } else {
                        this.isSaveNow = false
                        console.log("更新角色完成", pathurl + $file.name);
                    }
                })
            } else {
                console.log("正在处理保存")
            }

        }

    


    }
}