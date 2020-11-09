declare module win {
    import Rectangle = Pan3d.Rectangle;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Vector2D = Pan3d.Vector2D;
    import UICompenent = Pan3d.UICompenent;
    class Sprite extends LayUIManager {
        rect: Rectangle;
        private _rect;
        perent: Sprite;
        protected children: Array<Sprite>;
        onAdd(): void;
        onRemove(): void;
        constructor();
        addChild(value: Sprite): void;
        removeChild(value: Sprite): void;
        update(): void;
        resize(): void;
        x: number;
        y: number;
        width: number;
        height: number;
        getObjectsUnderPoint(evt: Vector2D): UICompenent;
        mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean;
        changeSize(): void;
    }
}
