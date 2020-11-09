module prop {
    import BaseEvent = Pan3d.BaseEvent;
    export class ReflectionEvet extends BaseEvent {
        public static CHANGE_DATA: string = "CHANGE_DATA";
        public data: any
    }
}