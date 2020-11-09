module materialui {
    import Vector3D = Pan3d.Vector3D
    export class NodeTreeNormal extends NodeTree {
        public constVec3: Vector3D = new Vector3D;
        public constructor() {

            super();
       
        }

        public getComponentID($id: number): string {
     
            return "normalVec.xyz";
        }

    }
}