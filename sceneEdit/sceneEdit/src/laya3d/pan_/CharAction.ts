/**
* name 
*/
module lou16.me {
	export class CharAction {
		public static STANAD: string = "stand";//站立
		public static WALK: string = "walk";//行走
		public static IDEA :string = "idea";//休闲动作
		public static SIT: string = "sit";//打坐
		public static INJURED :string = "injured";//受伤
		public static DEATH: string = "death";//死亡
		public static DIE: string = "die";//死亡
		public static JUMP: string = "jump";//跳跃
		public static RETREAT: string = "retreat";//后撤
		public static DODGE: string = "dodge";//闪避
		public static ENTER: string = "enter";//入场
		public static SPRINT: string = "sprint";//冲刺
		public static ATTACK_01: string = "attack_01";//攻击
		public static ATTACK_02: string = "attack_02";//攻击
		public static ATTACK_03: string = "attack_03";//攻击
		public static ATTACK_04: string = "attack_04";
		public static ATTACK_05: string = "attack_05";
		public static ATTACK_06: string = "skill_01";//魔法攻击动作

		public static ATTACK_010: string = "attack_010";
		public static ATTACK_020: string = "attack_020";

		public static STAND_MOUNT: string = "stand_mount_01";
		public static WALK_MOUNT: string = "walk_mount_01";

		public static s_attack_01: string = "s_attack_01"; //移动中行走的特殊技能

		// 动作表
		private static SINGLE_ACTION: Array<string>;
		// 骑马状态下的动作表
		private static RIDING_ACTION: Array<string>;

        static init(): void {
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
		}

		static ConvertAction(actionStatus: number, isRiding: Boolean = false): string {
			// return isRiding ? this.RIDING_ACTION[actionStatus] : this.SINGLE_ACTION[actionStatus];
			return this.SINGLE_ACTION[actionStatus];
		}

	}
}