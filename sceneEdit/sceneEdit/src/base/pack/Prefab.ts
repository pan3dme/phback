module pack {
    import Material = Pan3d.Material
    import ObjData = Pan3d.ObjData
    import EventDispatcher = Pan3d.EventDispatcher
    export class Prefab extends EventDispatcher implements ITile{
        getName() :string{
            return "prefab"
        }
        public url: string
        public objsurl: string;
        public objData: ObjData;
        public textureurl: string;
        public material: Material;

        public version: number
 
      
    }
}