declare class GameVersion {
    private static _dic;
    static init(str: string): void;
    static getVersion(key: string): string;
}
declare function getUItittleUrl(name: string): string;
declare function getSkillUrl(name: string): string;
declare function getModelUrl(name: string): string;
declare function getModelUIUrl(name: string): string;
declare function getMapUrl(name: string): string;
declare function getRoleUrl(name: string): string;
declare function getZipMapUrl(name: string): string;
/**标准化数字 */
declare function Snum($num: number): string;
declare function getEffectUIUrl(name: string): string;
declare function getKeyProById($id: number): string;
