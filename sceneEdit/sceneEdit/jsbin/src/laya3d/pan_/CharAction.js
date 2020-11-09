/**
* name
*/
var lou16;
(function (lou16) {
    var me;
    (function (me) {
        var CharAction = /** @class */ (function () {
            function CharAction() {
            }
            CharAction.init = function () {
                /*
                this.SINGLE_ACTION = new Array<string>(AvatarData.MAX_STATE);
                this.RIDING_ACTION = new Array<string>(AvatarData.MAX_STATE);
     
                this.SINGLE_ACTION[AvatarData.STATE_STAND] = this.STANAD;
                this.SINGLE_ACTION[AvatarData.STATE_WALK] = this.WALK;
                this.SINGLE_ACTION[AvatarData.STATE_RUNNING] = this.WALK;
                this.SINGLE_ACTION[AvatarData.STATE_LEISURE] = this.IDEA;
                this.SINGLE_ACTION[AvatarData.STATE_GECAO] = this.SIT;
                this.SINGLE_ACTION[AvatarData.STATE_BEATEN] = this.INJURED;
                this.SINGLE_ACTION[AvatarData.STATE_DIING] = this.DEATH;
                this.SINGLE_ACTION[AvatarData.STATE_DIING1] = this.DIE;
                this.SINGLE_ACTION[AvatarData.STATE_DIED] = this.DEATH;
                this.SINGLE_ACTION[AvatarData.STATE_JUMP] = this.JUMP;
                this.SINGLE_ACTION[AvatarData.STATE_RETREAT] = this.RETREAT;
                this.SINGLE_ACTION[AvatarData.STATE_DEFENSE] = this.DODGE;
                this.SINGLE_ACTION[AvatarData.STATE_ENTER] = this.ENTER;
                this.SINGLE_ACTION[AvatarData.STATE_SPRINT] = this.SPRINT;
                this.SINGLE_ACTION[AvatarData.STATE_ATTACKGO] = this.ATTACK_01;
                this.SINGLE_ACTION[AvatarData.STATE_ATTACKGO2] = this.ATTACK_02;
                this.SINGLE_ACTION[AvatarData.STATE_ATTACKGO3] = this.ATTACK_03;
    
                // this.SINGLE_ACTION[AvatarData.STATE_ATTCKREADY] = AvatarData.ACTION_ATTACKREADY;
                // this.SINGLE_ACTION[AvatarData.STATE_MACSAVING] = AvatarData.ACTION_ATTACKREADY;
                this.SINGLE_ACTION[AvatarData.STATE_MACGO] = this.ATTACK_06;
                // this.SINGLE_ACTION[AvatarData.STATE_CRITICALHIT] = AvatarData.ACTION_ATTACKGO;
                // this.SINGLE_ACTION[AvatarData.STATE_DEFENSE] = AvatarData.ACTION_ATTACKGO3;
                // this.SINGLE_ACTION[AvatarData.STATE_BEATEN] = AvatarData.ACTION_BEATEN;
                // this.SINGLE_ACTION[AvatarData.STATE_LEISURE] = AvatarData.ACTION_LEISURE;
                // this.SINGLE_ACTION[AvatarData.STATE_GECAO_2] = AvatarData.ACTION_ATTACKGO;
    
     
                this.RIDING_ACTION[AvatarData.STATE_STAND] = this.STAND_MOUNT;
                this.RIDING_ACTION[AvatarData.STATE_RUNNING] = this.WALK_MOUNT;
    
                */
            };
            CharAction.ConvertAction = function (actionStatus, isRiding) {
                if (isRiding === void 0) { isRiding = false; }
                // return isRiding ? this.RIDING_ACTION[actionStatus] : this.SINGLE_ACTION[actionStatus];
                return this.SINGLE_ACTION[actionStatus];
            };
            CharAction.STANAD = "stand"; //站立
            CharAction.WALK = "walk"; //行走
            CharAction.IDEA = "idea"; //休闲动作
            CharAction.SIT = "sit"; //打坐
            CharAction.INJURED = "injured"; //受伤
            CharAction.DEATH = "death"; //死亡
            CharAction.DIE = "die"; //死亡
            CharAction.JUMP = "jump"; //跳跃
            CharAction.RETREAT = "retreat"; //后撤
            CharAction.DODGE = "dodge"; //闪避
            CharAction.ENTER = "enter"; //入场
            CharAction.SPRINT = "sprint"; //冲刺
            CharAction.ATTACK_01 = "attack_01"; //攻击
            CharAction.ATTACK_02 = "attack_02"; //攻击
            CharAction.ATTACK_03 = "attack_03"; //攻击
            CharAction.ATTACK_04 = "attack_04";
            CharAction.ATTACK_05 = "attack_05";
            CharAction.ATTACK_06 = "skill_01"; //魔法攻击动作
            CharAction.ATTACK_010 = "attack_010";
            CharAction.ATTACK_020 = "attack_020";
            CharAction.STAND_MOUNT = "stand_mount_01";
            CharAction.WALK_MOUNT = "walk_mount_01";
            CharAction.s_attack_01 = "s_attack_01"; //移动中行走的特殊技能
            return CharAction;
        }());
        me.CharAction = CharAction;
    })(me = lou16.me || (lou16.me = {}));
})(lou16 || (lou16 = {}));
//# sourceMappingURL=CharAction.js.map