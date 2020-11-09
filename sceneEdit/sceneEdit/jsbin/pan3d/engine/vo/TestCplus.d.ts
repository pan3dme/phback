declare class Test {
    static IMG_TYPE: number;
    static OBJS_TYPE: number;
    static MATERIAL_TYPE: number;
    type: number;
    name: string;
    age: number;
    private _byte;
    readData($bytes: Pan3d.Pan3dByteArray): void;
    writeData(): void;
}
