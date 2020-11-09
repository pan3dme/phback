module maineditor {

    import Scene_data = Pan3d.Scene_data
    import TimeUtil = Pan3d.TimeUtil
    import MathClass = Pan3d.MathClass
    import ParticleManager = Pan3d.ParticleManager
    import SkillManager = Pan3d.SkillManager
    import FBO = Pan3d.FBO
    import Engine = Pan3d.Engine
    import TextureRes = Pan3d.TextureRes
    import Camera3D = Pan3d.Camera3D
    import Object3D = Pan3d.Object3D
    import Matrix3D = Pan3d.Matrix3D
    import GlReset = Pan3d.GlReset

    import SceneManager = layapan_me.LayaOverride2dSceneManager

    export class EdItorSceneManager extends SceneManager {
        constructor() {
            super();
        }
        public fbo: FBO;
 
        private updateDepthTexture(fbo: FBO): void {

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext

            
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
             gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);
            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);
          
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.frontFace(gl.CW);
      
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
 
 
        }

        

        public renderToTexture($m: Matrix3D = null): void { //透视矩阵
            GlReset.saveBasePrarame(Scene_data.context3D.renderContext);
            if (!this.fbo) {
                this.fbo = new FBO;
            } else {
                this.fbo.resetSize(this.cam3D.cavanRect.width, this.cam3D.cavanRect.height);
            }
            if ($m) {
                this.viewMatrx3D = $m
            } else {
                this.viewMatrx3D.identity();
                this.viewMatrx3D.perspectiveFieldOfViewLH(0.8, 1, 1, 2000);
                this.viewMatrx3D.appendScale(1, this.cam3D.cavanRect.width / this.cam3D.cavanRect.height, 1);
                var sceneViewHW: number = 400 / this.cam3D.cavanRect.width;
                this.viewMatrx3D.appendScale(sceneViewHW, sceneViewHW, 1);
            }
            this.updateDepthTexture(this.fbo);
            this.update();
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            if (this.textureRes) {
                this.textureRes.texture = this.fbo.texture;
            }
            GlReset.resetBasePrarame(Scene_data.context3D.renderContext);
        }
        public textureRes: Pan3d.TextureRes;
        public update(): void {
            var lastCam3D: Camera3D = Scene_data.cam3D
            var lastfocus3D: Object3D = Scene_data.focus3D
            var lastViewMatrx3D: Matrix3D = Scene_data.viewMatrx3D.clone() 
         
            Scene_data.cam3D = this.cam3D;
            Scene_data.focus3D = this.focus3D;
            Scene_data.viewMatrx3D = this.viewMatrx3D;
            MathClass.updateVp()

            if (isNaN(this._time)) {
                this._time = TimeUtil.getTimer();
            }
            Scene_data.context3D._contextSetTest.clear();
            this.particleManager.updateTime();
            this.skillManager.update()

            if (this._ready) {
                this.updateMovieFrame()

                Scene_data.context3D.cullFaceBack(true);
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
                this.updateStaticDiplay();
                this.updateSpriteDisplay();
                this.updateMovieDisplay();
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
                Scene_data.context3D.setCullFaceModel(2);
                Scene_data.context3D.setBlendParticleFactors(1);
                this.particleManager.update();
            }

            Scene_data.cam3D = lastCam3D;
            Scene_data.focus3D = lastfocus3D;
            Scene_data.viewMatrx3D = lastViewMatrx3D;

       
        }
     
        public getGroundPos($mouse: Vector2D): Vector3D {
            let $scene = this

            var $hipPos: Vector3D = xyz.TooMathHitModel.mathDisplay2Dto3DWorldPos(new Vector2D($mouse.x - $scene.cam3D.cavanRect.x, $mouse.y - $scene.cam3D.cavanRect.y), $scene)

            var triItem: Array<Vector3D> = new Array;
            triItem.push(new Vector3D(0, 0, 0));
            triItem.push(new Vector3D(-100, 0, 100));
            triItem.push(new Vector3D(+100, 0, 100));

            return Pan3d.MathUtil.getLinePlaneInterectPointByTri(new Vector3D($scene.cam3D.x, $scene.cam3D.y, $scene.cam3D.z), $hipPos, triItem)

        }

        public playLyf($url: string, $pos: Pan3d.Vector3D, $r: number = 0): void {

            this.groupDataManager.scene = this
            this.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + $url, (groupRes: Pan3d.GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: Pan3d.GroupItem = groupRes.dataAry[i];
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle: Pan3d.CombineParticle = this.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        $particle.x = $pos.x;
                        $particle.y = $pos.y;
                        $particle.z = $pos.z;
                        $particle.rotationY = $r;
                        //$particle.scaleX = 0.1
                        //$particle.scaleY = 0.1
                        //$particle.scaleZ = 0.1

               

                        this.particleManager.addParticle($particle);
                      //  $particle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.onPlayCom, this);
 
                    } else {
                        console.log("播放的不是单纯特效");
                    }
                }
            })
        }

    }

   


}
