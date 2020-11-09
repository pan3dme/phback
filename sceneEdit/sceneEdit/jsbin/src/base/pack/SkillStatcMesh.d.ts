declare module pack {
    import EventDispatcher = Pan3d.EventDispatcher;
    class SkillStatcMesh extends EventDispatcher implements ITile {
        skillUrl: string;
        roleUrl: string;
        url: string;
        actionnum: number;
        interval: number;
        version: number;
        constructor();
        getObject(): any;
        getName(): string;
    }
}
