class TextEditStart {
    public static initCanvas($caves: HTMLCanvasElement): void {
        mainpan3d_me.canvas = $caves;
        Pan3d.Scene_data.fileRoot = "res/";
        Pan3d.Engine.init($caves);

        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
        if (requestAnimationFrame) {
            requestAnimationFrame(TextEditStart.step);
        }

        TextEditStart.resetSize();
        let game = new AppData();
        game.init();

    }
    public static resetSize(): void {
        if (mainpan3d_me.canvas) {
            mainpan3d_me.canvas.width = document.body.clientWidth
            mainpan3d_me.canvas.height = document.body.clientHeight
            Pan3d.Engine.resetSize(mainpan3d_me.canvas.width, mainpan3d_me.canvas.height); //设置canvas大小
            win.LayerManager.getInstance().resize();
           
        }
    }
    private static step(timestamp): void {
        requestAnimationFrame(TextEditStart.step);
        TextEditStart.upFrame()
    }
    private static upFrame(): void {
 
        Pan3d.TimeUtil.update();
        Pan3d.Scene_data.context3D.update();

        let gl = Pan3d.Scene_data.context3D.renderContext
        gl.clearColor(83 / 255, 83 / 255, 83 / 255, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        win.LayerManager.getInstance().update();

    }
 
}