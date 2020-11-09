module drag {
    import UIConatiner = Pan3d.UIConatiner

    export interface IDragManager {
        doDrag(
            dragInitiator: UIConatiner,
            dragSource: DragSource,
            mouseEvent: MouseEvent
        )
    }
    export class TempDrawManager implements IDragManager {
        doDrag(dragInitiator: UIConatiner, dragSource: DragSource, mouseEvent: MouseEvent): void {
            console.log(dragInitiator, dragSource, mouseEvent);
        }
    }


    export class DragManager {
        public static NONE: string = "none";
        public static COPY: string = "copy";
        public static MOVE: string = "move";
        public static LINK: string = "link";

  
        public static dragSource: DragSource
        public static doDragdoDrag(  dragInitiator: UIConatiner,  node: DragSource  ): void {
            this.dragSource = node;
            Pan3d.ModuleEventManager.dispatchEvent(new PanDragEvent(PanDragEvent.DRAG_SHOW))
        }

    }
}