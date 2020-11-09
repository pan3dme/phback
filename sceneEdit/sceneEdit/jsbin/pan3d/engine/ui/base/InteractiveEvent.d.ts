declare module Pan3d {
    class InteractiveEvent extends BaseEvent {
        static Down: string;
        static Up: string;
        static Move: string;
        static PinchStart: string;
        static Pinch: string;
        x: number;
        y: number;
        data: number;
        roation: number;
        target: any;
        mouseEvent: MouseEvent;
    }
}
