module filelist {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material
    import PrefabStaticMesh = pack.PrefabStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class FileMeshView extends MetaDataView {
 
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "fileUrl", target: this, Category: "模型", ClikEventKey: "clikFilePrefab" },
                    { Type: ReflectionData.MeshScene2DUI, Label: "窗口:", FunKey: "fileUrl", target: this, Category: "模型" },
       
                ];
            return ary;
        }
        public eventKey(value: string): void {
            switch (value) {
                case "clikFilePrefab":
                    var pathurl: string = Pan3d.Scene_data.fileRoot + this.fileUrl
                    Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), pathurl.replace(Pan3d.Scene_data.ossRoot, ""))
                    break
                default:
                    console.log("没有对象", value)
                    break
            }

        }

        public get fileUrl(): string {
            return this.data
        }
        public set fileUrl(value:string) {
          
        }
       
      

        public set data(value: any) {
            this._data = value;
            this.refreshViewValue()
        }
        public get data(): any {
            return this._data
        }


        


    }
}