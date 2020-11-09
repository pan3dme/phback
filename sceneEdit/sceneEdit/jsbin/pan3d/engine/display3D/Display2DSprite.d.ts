declare module Pan3d {
    class Display2DSprite extends Display3D {
        batchPos: Array<Sprite>;
        watchCaramMatrix: Matrix3D;
        private _imgAtlas;
        constructor();
        setInfo($configurl: string, $imgurl: string, $fun: Function): void;
        getSprite($name: string): Sprite;
        addSprite(...spriteAry: Sprite[]): void;
        applyData(): void;
        update(): void;
    }
    class Sprite extends Object3D {
        posData: Array<number>;
        uvData: UIRectangle;
        setPos(xpos: number, ypos: number, zpos: number): void;
        scale: number;
        x: number;
        y: number;
        z: number;
    }
}
