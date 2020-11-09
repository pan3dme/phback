declare class AppData extends Pan3d.GameStart {
    static stagePos: Pan3d.Vector2D;
    static altKey: boolean;
    static rightPanel: win.Panel;
    static centenPanel: win.Panel;
    static topPanel: win.Panel;
    static sceneEidtType: number;
    static mapOpenUrl: string;
    static rootFilePath: string;
    static getPerentPath(value: string): string;
    static getFileName(value: string): string;
    init(): void;
    private loadConfigCom;
    private resize;
}
