declare module drag {
    import UIConatiner = Pan3d.UIConatiner;
    interface IDragManager {
        doDrag(dragInitiator: UIConatiner, dragSource: DragSource, mouseEvent: MouseEvent): any;
    }
    class TempDrawManager implements IDragManager {
        doDrag(dragInitiator: UIConatiner, dragSource: DragSource, mouseEvent: MouseEvent): void;
    }
    class DragManager {
        static NONE: string;
        static COPY: string;
        static MOVE: string;
        static LINK: string;
        static dragSource: DragSource;
        static doDragdoDrag(dragInitiator: UIConatiner, node: DragSource): void;
    }
}
