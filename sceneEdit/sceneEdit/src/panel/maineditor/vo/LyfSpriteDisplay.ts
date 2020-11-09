module maineditor {

    import Matrix3D = Pan3d.Matrix3D
    import CombineParticle = Pan3d.CombineParticle
    import Display3DSprite = Pan3d.Display3DSprite

    export class LyfSpriteDisplay extends Display3DSprite {
        public constructor() {
            super()
            this.waitLoadUrl = []
            this.particleItem = []
        }

        private waitLoadUrl: Array<string>;
        public getSocket(socketName: string, resultMatrix: Matrix3D): void {
            resultMatrix.identity();
            resultMatrix.append(this.posMatrix)
        }

        public addLyfByUrl($url: string): void {
            if (this._scene) {
                this.loadTempByUrl($url)
            } else {
                this.waitLoadUrl.push($url);
            }
        }
        public removeStage(): void {
            var scene: EdItorSceneManager = <EdItorSceneManager>this._scene;
            while (scene&&this.particleItem.length) {
                scene.particleManager.removeParticle(this.particleItem.pop());
            }
            super.removeStage()
        }
        public addStage(): void {
            super.addStage()
            while (this.waitLoadUrl.length) {
                this.loadTempByUrl(this.waitLoadUrl.pop());
            }
        }

        private particleItem: Array<CombineParticle>
        private loadTempByUrl(value: string): void {

       
            var scene: EdItorSceneManager = <EdItorSceneManager>this._scene;
            scene.groupDataManager.scene = scene;
            scene.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + value, (groupRes: Pan3d.GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: Pan3d.GroupItem = groupRes.dataAry[i];
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle: Pan3d.CombineParticle = scene.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        scene.particleManager.addParticle($particle);
                        $particle.bindTarget = this

                        this.particleItem.push($particle)
                    } else {
                        console.log("播放的不是单纯特效");
                    }
                }
            })
 
        }
 
    }
}