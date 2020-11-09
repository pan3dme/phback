module filelist {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material

    import RoleStaticMesh = pack.RoleStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class SkillMeshView extends MetaDataView {
        private _skillStaticMesh: pack.SkillStatcMesh
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "filename", target: this, Category: "角色", ClikEventKey: "clikFileSkill" },
                    { Type: ReflectionData.MeshScene2DUI, Label: "窗口:", FunKey: "skillmeshUrl", target: this, Category: "角色" },


                    { Type: ReflectionData.Texturue2DUI, Label: "角色:", FunKey: "roleurl", Suffix: "zzw", target: this, Category: "属性" },

                    { Type: ReflectionData.Texturue2DUI, Label: "技能:", FunKey: "skillurl", Suffix: "txt", target: this, Category: "属性" },

                    { Type: ReflectionData.ComboBox, Label: "播放名字:", FunKey: "actionname", target: this, Data: [], Category: "属性" },
                    { Type: ReflectionData.NumberInput, Label: "播放间隔:", FunKey: "intervalTm", target: this,  Category: "属性" },
  
                ];
            return ary;
        }
        public set skillmeshUrl(value: string) {
 
        }
        public get skillmeshUrl(): string {
            return this._skillStaticMesh.url
        }
        public eventKey(value: string): void {
            switch (value) {
                case "clikFileSkill":
                    var pathurl: string = Pan3d.Scene_data.fileRoot + this.skillmeshUrl
                    Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), pathurl.replace(Pan3d.Scene_data.ossRoot, ""))
                    break
                default:
                    console.log("没有对象", value)
                    break
            }

        }
        public set intervalTm(value: number) {
            this._skillStaticMesh.interval = value;
            this.saveToSever();
            this.refreshViewValue();

        }
        public get intervalTm(): number {
            return this._skillStaticMesh.interval;

        }
        public set actionname(value: number) {
            this._skillStaticMesh.actionnum = value;
            this.saveToSever()
            this.refreshViewValue()

        }
        public get actionname(): number {
            return this._skillStaticMesh.actionnum;

        }

        public set filename(value: string) {

        }
        public get filename(): string {
            return this._skillStaticMesh.url

        }
        public set roleurl(value: string) {
            this._skillStaticMesh.roleUrl = value
            this.saveToSever()
            this.refreshViewValue()


        }
  
        public get roleurl(): string {
            return this._skillStaticMesh.roleUrl

        }
        public set skillurl(value: string) {
            this._skillStaticMesh.skillUrl = value
            this.saveToSever()
            this.refreshViewValue()
        }
        public get skillurl(): string {
            return this._skillStaticMesh.skillUrl

        }
        public set data(value: any) {
            this._data = value;
            this._skillStaticMesh = value;

   
            this.refreshViewValue()

            this.mashSkillActionInfo()
        }
        private mashSkillActionInfo(): void {
 
            Pan3d.ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + this._skillStaticMesh.skillUrl, ($skillRes: Pan3d.SkillRes) => {
      
                for (var i: number=0; i < this.ui.length; i++) {
                    var tempUi: prop.ComBoBoxCtrl2D = this.ui[i] as prop.ComBoBoxCtrl2D
                    if (tempUi instanceof prop.ComBoBoxCtrl2D) {
                        var dataItem: Array<any> = []
                        for (var acKey in $skillRes.data) {
                            dataItem.push({ name: acKey, type: dataItem.length });
                        }
                        dataItem.push({ name: "循环播放", type: dataItem.length });

                        tempUi.data = dataItem
                        tempUi.refreshViewValue();
                    }
                }
           
            });

        }

        public categoryClikUp(value: string): void {
            super.categoryClikUp(value);

            this.mashSkillActionInfo()
        }
  
        public get data(): any {
            return this._data
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

                var $temp: any = this._skillStaticMesh.getObject();
                $temp.version = pack.FileOssModel.version

                var $roleStr: string = JSON.stringify($temp);

                var $file: File = new File([$roleStr], "ossfile.txt");
                var pathUrl: string = Pan3d.Scene_data.fileRoot + this._skillStaticMesh.url
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