declare module materialui {
    import Vector3D = Pan3d.Vector3D;
    class MaterialBaseData {
        baseColorUrl: string;
        normalUrl: string;
        url: string;
        baseColor: Vector3D;
        roughness: number;
        specular: number;
        metallic: number;
        usePbr: boolean;
        setData(obj: any): void;
    }
}
