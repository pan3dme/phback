/**
* name
*/
declare module lou16.me {
    class SceneChar extends LayaPan3D.LayaScene2dSceneChar {
        constructor();
        pScale: number;
        onMeshLoaded(): void;
        bloodEnable: boolean;
        nameEnable: boolean;
        titleEnable: boolean;
        refreshPos(): void;
        moveTopos(v: Pan3d.Vector2D): void;
        set2dPos($x: number, $y: number): void;
        private pixelPos;
        private moveToPosV2d;
        updateFrame(t: number): void;
        mouseClik(lineA: Vector3D, lineB: Vector3D): boolean;
        destory(): void;
        updateMatrix(): void;
        isPlaying(): boolean;
        showActionEnd($action: string): void;
    }
}
