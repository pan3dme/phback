declare function float2int(value: any): number;
declare function radian2angle(value: number): number;
declare function angle2radian(value: number): number;
declare function makeImage(): any;
declare var keyChi: Array<string>;
/**阿拉伯数字转换成中文数字 */
declare function getChiNum($id: number): string;
declare function hexToArgb(expColor: number, is32?: boolean, color?: Pan3d.Vector3D): Pan3d.Vector3D;
declare function hexToArgbNum(expColor: number, is32?: boolean, color?: Pan3d.Vector3D): Pan3d.Vector3D;
declare function getBaseUrl(): string;
/**描边路径 */
declare function strokeFilter(ctx: CanvasRenderingContext2D, width: number, height: number, color: number): void;
declare function trim(s: any): String;
declare function trimLeft(s: any): String;
declare function trimRight(s: any): String;
declare function TweenMoveTo(taget: any, t: number, vars: any): void;
declare function getScencdStr(timeNum: number): string;
declare function random($num: number): number;
declare function randomByItem(arr: Array<any>): any;
declare function makeArray(a: Array<any>, b: Array<any>): void;
declare function unZip($aryBuf: ArrayBuffer): ArrayBuffer;
declare function getZipByte($byte: Pan3d.Pan3dByteArray): Pan3d.Pan3dByteArray;
declare function getUrlParam(name: string): string;
declare function copy2clipboard(val: string): void;
declare function getBit($num: number, offset: number): boolean;
