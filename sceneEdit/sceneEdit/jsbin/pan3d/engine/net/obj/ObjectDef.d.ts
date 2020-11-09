declare module Pan3d {
    class ObjectDef {
        static MAP: string;
        static UNIT: string;
        static STRENGTH: string;
        static PLAYER: string;
        static BAG: string;
        static FACTION: string;
        static GROW: string;
        static INSTANCE: string;
        static SOCIAL: string;
        static EMAIL: string;
        static GLOBEL: string;
        static QUEST: string;
        static LOOT: string;
        static TEAM: string;
        static GLOBAL_VALUE: string;
        static GAME_CONFIG: string;
        static getPrefix(s: string): string;
        static getGUIDIndex(s: string): number;
        static testUG(u: string, g: string): boolean;
    }
}
