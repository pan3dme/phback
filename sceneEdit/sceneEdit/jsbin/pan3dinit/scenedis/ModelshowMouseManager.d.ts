declare module scenedis.me {
    class ModelshowMouseManager {
        private static _instance;
        static getInstance(): ModelshowMouseManager;
        constructor();
        addMouseEvent(): void;
        onMouseWheel($evt: MouseWheelEvent): void;
        private onMouse;
        private mouseToEvent;
        private makeMouseEvent;
        private clikSceneGround;
        walkPathComplete(): void;
    }
}
