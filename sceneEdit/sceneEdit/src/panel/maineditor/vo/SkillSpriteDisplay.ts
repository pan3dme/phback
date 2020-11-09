module maineditor {

    import Matrix3D = Pan3d.Matrix3D
    import CombineParticle = Pan3d.CombineParticle
    import Display3DSprite = Pan3d.Display3DSprite
    import SkillStatcMesh = pack.SkillStatcMesh

    export class SkillSpriteDisplay extends Display3DSprite {
        public constructor() {
            super()
            this.waitLoadUrl = []

            this.roleChar = new left.MaterialRoleSprite();
        }
        public updateMatrix(): void {
            super.updateMatrix()

            this.roleChar.x = this.x
            this.roleChar.y = this.y
            this.roleChar.z = this.z

            //this.roleChar.scaleX = 1
            //this.roleChar.scaleY =1
            //this.roleChar.scaleZ = 1

            this.roleChar.rotationX = this.rotationX
            this.roleChar.rotationY = this.rotationY
            this.roleChar.rotationZ = this.rotationZ

        }
        private waitLoadUrl: Array<string>;
        public addSkillByUrl($url): void {
            if (this._scene) {
                this.loadTempByUrl($url)
            } else {
                this.waitLoadUrl.push($url);
            }

        }
        public addStage(): void {
            super.addStage()
            while (this.waitLoadUrl.length) {
                this.loadTempByUrl(this.waitLoadUrl.pop());
            }


        }
        public skillStaticMesh: pack.SkillStatcMesh;
        private roleChar: left.MaterialRoleSprite


        private skipNum: number = 0
        private playNextSkill(): void {
            var tempScene: EdItorSceneManager = <EdItorSceneManager>this._scene;
            if (this.skillActionItem) {
                if (this.skillActionItem.length) {
                    var playName: string;
                    if (this.skillStaticMesh.actionnum >= 0 && this.skillStaticMesh.actionnum < this.skillActionItem.length) {
                        playName = this.skillActionItem[this.skillStaticMesh.actionnum];
                    } else {
                        playName = this.skillActionItem[this.skipNum % this.skillActionItem.length];
                    }
                    var $skill: layapan_me.OverrideSkill = tempScene.skillManager.getSkill(this.skillStaticMesh.skillUrl, playName)   //skill_0022
                    if ($skill) {
                        $skill.reset();
                        $skill.isDeath = false;
                    }
                    $skill.configFixEffect(this.roleChar);
                    tempScene.skillManager.playSkill($skill);
                    this.skipNum++
                }


            }
            if (!this.skillStaticMesh.interval||this.skillStaticMesh.interval <=0) { //间隔时间必须大于0
                this.skillStaticMesh.interval = 1;
            } 
            Pan3d.TimeUtil.addTimeOut(this.skillStaticMesh.interval * 1000, () => {
                this.playNextSkill();
            })

        }
        private skillActionItem: Array<string>
        private loadTempByUrl(value: string): void {


            pack.PackSkillManager.getInstance().getPrefabByUrl(value, (temp: SkillStatcMesh) => {
                this.skillStaticMesh = temp;
                //      this.skillStaticMesh.roleUrl = "pefab/上杉谦信/ssqx.zzw"
                //     this.skillStaticMesh.skillUrl = "skill/上杉谦信_byte.txt"
 
                var tempScene: EdItorSceneManager = <EdItorSceneManager>this._scene
                this.roleChar.setRoleZwwUrl(this.skillStaticMesh.roleUrl);
                tempScene.addMovieDisplay(this.roleChar)
                this.roleChar.scale = 0.3
 
                Pan3d.ResManager.getInstance().loadSkillRes(Pan3d.Scene_data.fileRoot + this.skillStaticMesh.skillUrl, ($skillRes: Pan3d.SkillRes) => {
                    this.skillActionItem = []
                    for (var acKey in $skillRes.data) {
                        this.skillActionItem.push(acKey)
                    }
                });
                this.playNextSkill()

            })
 

        }

    }
}