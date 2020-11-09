/**
* base64-arraybuffer
*/
declare module Pan3d {
    class Base64 {
        static chars: string;
        static encode: (arraybuffer: any) => string;
        static decode: (base64: any) => ArrayBuffer;
    }
}
