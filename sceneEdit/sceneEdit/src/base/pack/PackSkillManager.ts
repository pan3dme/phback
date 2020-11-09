module pack {
    import LoadManager = Pan3d.LoadManager
    import Scene_data = Pan3d.Scene_data
    import Pan3dByteArray = Pan3d.Pan3dByteArray
 
 
    export class PackSkillManager {
        private static _instance: PackSkillManager;
        public static getInstance(): PackSkillManager {
            if (!this._instance) {
                this._instance = new PackSkillManager();
            }
            return this._instance;
        }
        private dic: any = {};
        private loadDic: any = {};
        private playBfun($prefab: SkillStatcMesh, $url: string): void {
            if (!this.dic[$url]) {
                this.dic[$url] = $prefab;
            }
            while (this.loadDic[$url].length) {
                this.loadDic[$url].pop()($prefab);
            }
        }
        public getPrefabByUrl($url: string, bfun: Function): void {
            if (this.dic[$url]) { //有了就反回
                bfun(this.dic[$url])
            }
            if (!this.loadDic[$url]) { //创建加载队列
                this.loadDic[$url] = [bfun]
                LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.XML_TYPE, ($str: any) => {
                    var $obj: any = JSON.parse($str);
                    var $skillmesh: SkillStatcMesh = new SkillStatcMesh();
                    for (var key in $obj) {
                        $skillmesh[key] = $obj[key];
                    }
                    $skillmesh.url = $url;
                    this.playBfun($skillmesh, $url)
                });
            } else {
                this.loadDic[$url].push(bfun)
            }
 
        }


    }
}