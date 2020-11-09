declare module Pan3d {
    class BaseEvent {
        type: string;
        data: any;
        target: EventDispatcher;
        constructor($type: string);
        static COMPLETE: string;
    }
}
