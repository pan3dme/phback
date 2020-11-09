declare module Pan3d {
    class DynamicBaseConstItem {
        target: ConstItem;
        paramName: string;
        currentValue: Array<number>;
        targetOffset: number;
        protected _type: number;
        update(t?: number): void;
        type: number;
        setTargetInfo($target: ConstItem, $paramName: string, $type: number): void;
        setCurrentVal(...args: any[]): void;
    }
}
