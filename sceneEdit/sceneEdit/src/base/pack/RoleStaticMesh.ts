module pack {

    export class RoleStaticMesh extends Prefab {
 
        public skinMesh: any
        public animDic: any
        public animPlayKey: string
 
        public constructor() {
            super();
 
        }
        public getObject(): any {
            var obj: any = {}
            obj.name = this.getName();

            obj.meshAry = this.skinMesh.meshAry;
            obj.animDic = this.animDic;
            obj.animPlayKey = this.animPlayKey;
            obj.version = this.version;
            return obj
        }

    }
}