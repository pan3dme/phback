/***********************************************************************/
/*************** 本代码由协议工具自动生成，请勿手动修改 ****************/
/***********************************************************************/
declare module Pan3d {
    class point {
        /**
         * 坐标X
         */
        pos_x: number;
        /**
         * 坐标Y
         */
        pos_y: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class taxi_menu_info {
        /**
         *
         */
        id: number;
        /**
         * 传送地点名称
         */
        taxi_text: string;
        /**
         * 地图ID
         */
        map_id: number;
        /**
         * 坐标X
         */
        pos_x: number;
        /**
         * 坐标Y
         */
        pos_y: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class char_create_info {
        /**
         * 名称
         */
        name: string;
        /**
         * 阵营
         */
        faction: number;
        /**
         * 性别
         */
        gender: number;
        /**
         * 等级
         */
        level: number;
        /**
         *
         */
        guid: string;
        /**
         * 头像
         */
        head_id: number;
        /**
         * 发型ID
         */
        hair_id: number;
        /**
         * 种族，猛男美女萝莉那些
         */
        race: number;
        /**
         * 邀请的帮派id
         */
        inviteGuid: string;
        /**
         * 创建的帮派名称
         */
        faction_name: string;
        /**
         * 创建的帮派标志
         */
        icon: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class quest_option {
        /**
         * 任务id
         */
        quest_id: number;
        /**
         * 图标
         */
        quest_icon: number;
        /**
         * 任务等级
         */
        quest_level: number;
        /**
         * 任务标题
         */
        quest_title: string;
        /**
         * 标识
         */
        flags: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class quest_canaccept_info {
        /**
         * 任务ID
         */
        quest_id: number;
        /**
         * 任务类别
         */
        quest_type: number;
        /**
         * 标题
         */
        title: string;
        /**
         * 接受任务NPC模板id
         */
        npc_id: number;
        /**
         * 任务等级
         */
        quest_level: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class gossip_menu_option_info {
        /**
         * id
         */
        id: number;
        /**
         * 选项icon图标
         */
        option_icon: number;
        /**
         * 选项文本
         */
        option_title: string;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class item_cooldown_info {
        /**
         * 物品摸版
         */
        item: number;
        /**
         * 冷却时间
         */
        cooldown: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class quest_status {
        /**
         * 任务ID
         */
        quest_id: number;
        /**
         * 任务状态
         */
        status: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class item_reward_info {
        /**
         * 道具id
         */
        item_id: number;
        /**
         * 道具数量
         */
        num: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class social_friend_info {
        /**
         * 好友guid
         */
        guid: string;
        /**
         * 名字
         */
        name: string;
        /**
         * 帮派
         */
        faction: string;
        /**
         * 等级
         */
        level: number;
        /**
         * 头像
         */
        icon: number;
        /**
         * 头像
         */
        vip: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class faction_info {
        /**
         * 帮派guid
         */
        faction_guid: string;
        /**
         * 名字
         */
        faction_name: string;
        /**
         * 帮主名字
         */
        faction_bz: string;
        /**
         * 公告
         */
        faction_gg: string;
        /**
         * 等级
         */
        level: number;
        /**
         * 头像
         */
        icon: number;
        /**
         * 帮派人数
         */
        player_count: number;
        /**
         * 等级限制
         */
        minlev: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class rank_info {
        /**
         * 名字
         */
        name: string;
        /**
         * 伤害百分比
         */
        value: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class line_info {
        /**
         * 分线号
         */
        lineNo: number;
        /**
         * 玩家比率
         */
        rate: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class wait_info {
        /**
         * 名字
         */
        name: string;
        /**
         * 状态
         */
        state: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class cultivation_rivals_info {
        /**
         * 序号
         */
        index: number;
        /**
         * 名字
         */
        name: string;
        /**
         * 等级
         */
        level: number;
        /**
         * 武器
         */
        weapon: number;
        /**
         * 外观
         */
        avatar: number;
        /**
         * 神兵
         */
        divine: number;
        /**
         * 战力
         */
        force: number;
        /**
         * 宝箱
         */
        chest: number;
        /**
         * 性别
         */
        gender: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class faction_gift_info {
        /**
         * 排行
         */
        rank: number;
        /**
         * id
         */
        id: number;
        /**
         * 魅力值
         */
        point: number;
        /**
         * 感谢标识
         */
        thank: number;
        /**
         * 女王回复标识
         */
        reply: number;
        /**
         * 时间
         */
        time: number;
        /**
         * count_id
         */
        count_id: number;
        /**
         * 赠送者guid
         */
        guid: string;
        /**
         * 赠送者留言
         */
        msg: string;
        /**
         * 赠送道具信息
         */
        item_list: string;
        /**
         * 回复信息
         */
        reply_list: string;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class faction_gift_rank_info {
        /**
         * 排行
         */
        rank: number;
        /**
         * 魅力值
         */
        point: number;
        /**
         * 女王名称
         */
        queen_name: string;
        /**
         * 家族名称
         */
        faction_name: string;
        /**
         * 骑士名称
         */
        guard_name: string;
        /**
         * 家族旗子
         */
        faction_flag: number;
        /**
         * 女王vip等级
         */
        queen_vip: number;
        /**
         * 骑士vip等级
         */
        guard_vip: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class mass_boss_info {
        /**
         * 全民boss编号
         */
        id: number;
        /**
         * 全民boss状态
         */
        state: number;
        /**
         * 全民boss刷新时间
         */
        time: number;
        /**
         * boss血量
         */
        percent: number;
        /**
         * 挑战boss人数
         */
        count: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class mass_boss_rank_info {
        /**
         * 名称
         */
        name: string;
        /**
         * 伤害
         */
        dam: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class equip_info {
        /**
         * 装备信息
         */
        equip: string;
        /**
         * 强化
         */
        strength_lv: number;
        /**
         * 精炼阶级
         */
        refine_rank: number;
        /**
         * 精炼星级
         */
        refine_star: number;
        /**
         * 宝石1等级
         */
        gem1_lv: number;
        /**
         * 宝石1等级
         */
        gem2_lv: number;
        /**
         * 宝石1等级
         */
        gem3_lv: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class act_rank_info {
        /**
         * 名称
         */
        name: string;
        /**
         * 数值
         */
        value: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class faction_match_info {
        /**
         * 家族名称
         */
        name: string;
        /**
         * 比赛结果
         */
        result: number;
        /**
         * 本届结果
         */
        rank: number;
        /**
         * 家族id
         */
        guid: string;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
    class group_search_info {
        /**
         * 队伍guid
         */
        guid: string;
        /**
         * 队长guid
         */
        cap_guid: string;
        /**
         * 队长名称
         */
        cap_name: string;
        /**
         * 家族id
         */
        members: number;
        /**
         从输入二进制流中读取结构体
         */
        read(input: Pan3dByteArray): void;
        /**
         * 将结构体写入到输出二进制流中
         */
        write(output: Pan3dByteArray): void;
    }
}
