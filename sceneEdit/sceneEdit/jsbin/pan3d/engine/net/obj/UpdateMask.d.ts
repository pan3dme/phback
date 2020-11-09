declare module Pan3d {
    class UpdateMask {
        private _bytes;
        constructor();
        readonly baseByteArray: Pan3dByteArray;
        Clear(): void;
        /**
        * 获取掩码数据列表，是否发生更新
        * @param pos 索引位置
        * @param len 长度
        * @return
        */
        GetBits(pos: number, len?: number): boolean;
        GetBit(i: number): boolean;
        SetBit(i: number): void;
        WriteTo(bytes: Pan3dByteArray): boolean;
        ReadFrom(bytes: Pan3dByteArray): boolean;
        GetCount(): number;
        SetCount(val: number): void;
        empty(): boolean;
        /**
            * updateMask的或者掩码操作
            * @param other
            */
        or(other: UpdateMask): void;
        /**
            * 两个updatemask并且成功
            * @param other
            * @return
            */
        test(other: UpdateMask): boolean;
        /**
            * 收缩,把byteArray的长度调整到最合理的位置
            */
        private condense;
        /**
            * 判断两个掩码是否相等
            * @param other
            * @return
            */
        equals(other: UpdateMask): boolean;
        /**
            * 掩码克隆函数
            * @return
            */
        clone(): UpdateMask;
    }
}
