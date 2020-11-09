declare module materialui {
    class NodeTreeOP extends NodeTree {
        blendMode: number;
        killNum: number;
        backCull: boolean;
        writeZbuffer: boolean;
        useDynamicIBL: boolean;
        normalScale: number;
        lightProbe: boolean;
        directLight: boolean;
        noLight: boolean;
        fogMode: number;
        scaleLightMap: boolean;
        hdr: boolean;
        constructor();
        checkInput(): boolean;
    }
}
