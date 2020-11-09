declare module Pan3d {
    class QuestMoveVo {
        pos: Vector2D;
        data: any;
        autoplay: boolean;
    }
    class GameInstance {
        static smsgFullizehp: string;
        static gameSyncTime: both_sync_mstime;
        static gameSyncClientTime: number;
        static appSynctTime: both_sync_mstime_app;
        static appSyncClientTime: number;
        static serverOpenTime: number;
        static getGameEndMillisecond($endT: number): number;
        static getGameSecond($endT: number): number;
        static getServerNow(): number;
        static pingpontm: number;
        static pandaVisibel: boolean;
        static canclikFightui: boolean;
        static mapName: string;
        static roleList: Array<SceneChar>;
        private static loadComplteFun;
        private static loadProgressFun;
        static mainChar: SceneChar;
        static skillCdItem: Array<any>;
        static bagCdItem: any;
        private static _attackTarget;
        static sid: string;
        static useYaoGan: boolean;
        private static _threeBattarId;
        static sceneResEqu: boolean;
        static threeBattarId: number;
        static setAttackTargetByName($name: string): void;
        static init(): void;
        static attackTarget: SceneChar;
    }
}
