declare module Pan3d {
    class RoleRes extends BaseRes {
        roleUrl: string;
        actionAry: Array<string>;
        private _fun;
        meshBatchNum: number;
        ambientLightColor: Vector3D;
        ambientLightIntensity: number;
        sunLigthColor: Vector3D;
        sunLigthIntensity: number;
        nrmDircet: Vector3D;
        constructor();
        load(url: string, $fun: Function): void;
        loadComplete($byte: ArrayBuffer): void;
        readMesh(): void;
        protected readAction(): void;
        protected readNext(): void;
    }
}
