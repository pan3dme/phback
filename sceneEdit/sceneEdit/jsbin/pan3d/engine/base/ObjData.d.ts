declare module Pan3d {
    class ObjData extends ResCount {
        dataView: DataView;
        vertices: Array<number>;
        uvs: Array<number>;
        indexs: Array<number>;
        lightuvs: Array<number>;
        normals: Array<number>;
        tangents: Array<number>;
        bitangents: Array<number>;
        collision: CollisionItemVo;
        invertAry: Array<Matrix3D>;
        private _treNum;
        treNum: number;
        getMaxSize(): number;
        vertexBuffer: WebGLBuffer;
        uvBuffer: WebGLBuffer;
        indexBuffer: WebGLBuffer;
        lightUvBuffer: WebGLBuffer;
        normalsBuffer: WebGLBuffer;
        tangentBuffer: WebGLBuffer;
        bitangentBuffer: WebGLBuffer;
        /**顶点 uv lightuv normal 合成一个 va */
        compressBuffer: boolean;
        uvsOffsets: number;
        lightuvsOffsets: number;
        normalsOffsets: number;
        tangentsOffsets: number;
        bitangentsOffsets: number;
        stride: number;
        hasdispose: boolean;
        constructor();
        destory(): void;
    }
}
