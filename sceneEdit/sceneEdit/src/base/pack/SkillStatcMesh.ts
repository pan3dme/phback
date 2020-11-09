module pack {
 
    import EventDispatcher = Pan3d.EventDispatcher
    export class SkillStatcMesh extends EventDispatcher implements ITile {
        public skillUrl: string;
        public roleUrl: string;
        public url: string
        public actionnum: number
        public interval: number
        public version: number
        public constructor() {
            super();
            this.actionnum = -1;
            this.interval=2
        }
        public getObject(): any {
            var obj: any = {}
            obj.skillUrl = this.skillUrl
            obj.roleUrl = this.roleUrl
            obj.url = this.url
            obj.actionnum = this.actionnum
            obj.interval = this.interval
            obj.version = this.version
 
            return obj
        }
        public  getName(): string {
            return "skill"
        }
    }
}