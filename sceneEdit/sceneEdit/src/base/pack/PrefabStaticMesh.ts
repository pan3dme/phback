module pack {
 
    export class PrefabStaticMesh extends Prefab   {
        public paramInfo: Array<any>;
        public sunColor: Vector3D;
        public constructor() {
            super();
            this.sunColor = new Vector3D(2,3,4,1)
        }
        public getObject(): any {
            var obj: any = {}
            obj.material = this.material;
            obj.name = this.getName();
            obj.objsurl = this.objsurl;
            obj.paramInfo = this.paramInfo 
            obj.sunColor = this.sunColor;
            obj.textureurl = this.textureurl;
            obj.url = this.url;
      
            return obj
        }
    
    }
}