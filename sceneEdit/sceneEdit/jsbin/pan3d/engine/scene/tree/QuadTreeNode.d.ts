declare module Pan3d {
    class QuadTreeNode {
        x: number;
        y: number;
        z: number;
        width: number;
        height: number;
        depth: number;
        data: Array<any>;
        target: any;
        sun: Array<QuadTreeNode>;
        id: number;
        constructor($x: number, $y: number, $z: number, $width: number, $height: number, $depth: number);
        testViewFrustum(face: Array<Vector3D>, ray: Ray): void;
        testViewFrustumResult(face: Array<Vector3D>): boolean;
        testRay(ray: Ray): boolean;
    }
    class Ray {
        o: Vector3D;
        d: Vector3D;
        baseT: number;
        setPos(x: number, y: number, z: number): void;
        setTarget(x: number, y: number, z: number): void;
    }
}
