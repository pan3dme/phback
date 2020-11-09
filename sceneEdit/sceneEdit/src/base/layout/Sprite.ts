module win {
    import Rectangle = Pan3d.Rectangle
    import InteractiveEvent = Pan3d.InteractiveEvent
    import Vector2D = Pan3d.Vector2D
    import UICompenent = Pan3d.UICompenent
    export class Sprite extends LayUIManager {


        public set rect(value: Rectangle) {
            this._rect = value;
        }
        private _rect: Rectangle;
        public get rect() {
            return this._rect
        }
        public perent: Sprite;
        protected children: Array<Sprite>;
        public onAdd(): void { }

        public onRemove(): void { }
        public constructor() {
            super();
            this.rect = new Rectangle(0, 0, 250, 250)
            this.children=[]
        }
        public addChild(value: Sprite): void {
            value.perent = this;
            value.onAdd()
            this.children.push(value);
        }
        public removeChild(value: Sprite): void {
            var idx: number = this.children.indexOf(value)
            if (idx != -1) {
                value.onRemove()
                this.children.splice(idx, 1)
            }
           
        }
      
        public update(): void {
          
            super.update();
            for (var i: number = 0; i < this.children.length; i++) {
                this.children[i].update();
    
            }
        }
        public resize(): void {
            super.resize()
            for (var i: number = 0; i < this.children.length; i++) {
                this.children[i].resize();

            }
        }
        public set x(value: number) {
            this.rect.x = value;
            this.changeSize()
        }
        public get x() {
            return this.rect.x;
        }

        public set y(value: number) {
     
            this.rect.y = value;
            this.changeSize()
           
        }
        public get y() {
            return this.rect.y;
        }
        public set width(value: number) {

            this.rect.width = value;
            this.changeSize()
        }
        public get width() {
            return this.rect.width
        }
        public set height(value: number) {
            this.rect.height = value;
            this.changeSize()
  
        }
        public get height() {
            return this.rect.height;
        }
        public getObjectsUnderPoint(evt: Vector2D): UICompenent {

            for (var i: number = this.children.length - 1; i >= 0; i--) {
                var temp: UICompenent = this.children[i].getObjectsUnderPoint(evt);
                if (temp) {
                    return temp;
                }
            }

            for (var j: number = this.uiList.length - 1; j >= 0; j--) {
                if (this.uiList[j]) {
                    if (this.uiList[j] && this.uiList[j].insetUi(evt)) {
                        return this.uiList[j].insetUi(evt);
                    }
                }
            }
            return null
        }
        public mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean  //true为有UI对象 flash为没有
        {
            for (var i: number = this.children.length-1; i>=0; i--) {
                var temp: boolean = this.children[i].mouseEvetData(evt, point);
                if (temp) {
                    return temp;
                }
            }
       
            return super.mouseEvetData(evt, point)
        }
        public changeSize(): void {
        

        }
    }
}

