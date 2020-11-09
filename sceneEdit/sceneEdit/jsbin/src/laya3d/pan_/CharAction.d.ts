/**
* name
*/
declare module lou16.me {
    class CharAction {
        static STANAD: string;
        static WALK: string;
        static IDEA: string;
        static SIT: string;
        static INJURED: string;
        static DEATH: string;
        static DIE: string;
        static JUMP: string;
        static RETREAT: string;
        static DODGE: string;
        static ENTER: string;
        static SPRINT: string;
        static ATTACK_01: string;
        static ATTACK_02: string;
        static ATTACK_03: string;
        static ATTACK_04: string;
        static ATTACK_05: string;
        static ATTACK_06: string;
        static ATTACK_010: string;
        static ATTACK_020: string;
        static STAND_MOUNT: string;
        static WALK_MOUNT: string;
        static s_attack_01: string;
        private static SINGLE_ACTION;
        private static RIDING_ACTION;
        static init(): void;
        static ConvertAction(actionStatus: number, isRiding?: Boolean): string;
    }
}
