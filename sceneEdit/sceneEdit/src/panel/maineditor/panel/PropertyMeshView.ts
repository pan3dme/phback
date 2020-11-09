module maineditor {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material
    import PrefabStaticMesh = pack.PrefabStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class PropertyMeshView extends MetaDataView {

        private xyzPosData: xyz. TooXyzPosData
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.Vec3, Label: "坐标:", FunKey: "pos", target: this, Step: 1, Category: "属性" },
                    { Type: ReflectionData.Vec3, Label: "比例:", FunKey: "scale", target: this, Step: 0.1, Category: "属性" },
                    { Type: ReflectionData.Vec3, Label: "角度:", FunKey: "rotation", target: this, Step: 1, Category: "属性" },
     
                ];
            return ary;
        }


        public resize(): void {
            
            var ty: number = this._top
            for (var i: number = 0; this.ui && i < this.ui.length; i++) {
                this.ui[i].y = ty;
                this.ui[i].x = 20;
                ty += this.ui[i].height;

                if (this.ui.length > 1) { //展开的情况需要处理
                    ty += 10; //特殊间隔加上10，显得比平时宽一点
                }
            
                this.ui[i].width = this.width
                this.ui[i].resize()

            }
            this._height = ty - this._top;
        }

        public get data(): any {
            return this._data
        }
        public set data(value: any) {
            this._data = value
            this.xyzPosData = this.data
            this.xyzPosData.dataUpDate = () => {
                this.refreshViewValue()
            }
        }
        public get pos(): Vector3D {
            return new Vector3D(this.xyzPosData.x, this.xyzPosData.y, this.xyzPosData.z)
        }
        public set pos(value: Vector3D) {
            this.xyzPosData.x = value.x
            this.xyzPosData.y = value.y
            this.xyzPosData.z = value.z
          
            this.xyzPosData.changeModelMatrix3d();
            this.xyzPosData.upRootMatrix3DToItem();
        }
        public get rotation(): Vector3D {
            return new Vector3D(this.xyzPosData.rotationX, this.xyzPosData.rotationY, this.xyzPosData.rotationZ)
        }
        public set rotation(value: Vector3D) {
            this.xyzPosData.rotationX = value.x
            this.xyzPosData.rotationY = value.y
            this.xyzPosData.rotationZ = value.z

            this.xyzPosData.changeModelMatrix3d();
            this.xyzPosData.upRootMatrix3DToItem();
        }
        public get scale(): Vector3D {
            return new Vector3D(this.xyzPosData.scaleX, this.xyzPosData.scaleY, this.xyzPosData.scaleZ)
        }
        public set scale(value: Vector3D) {
            this.xyzPosData.scaleX = value.x
            this.xyzPosData.scaleY = value.y
            this.xyzPosData.scaleZ = value.z
            this.xyzPosData.changeModelMatrix3d();
            this.xyzPosData.upRootMatrix3DToItem();
        }


    }
}