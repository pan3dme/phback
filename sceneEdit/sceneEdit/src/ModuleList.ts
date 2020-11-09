class TpGame {
    public static getArrByStr(str: String): Array<string> {
        var boneNameAry: Array<string> = str.split(/\s+/g);
        for (var i: number = boneNameAry.length - 1; i >= 0; i--) {
            if (String(boneNameAry[i]).length < 1) {
                boneNameAry.splice(i, 1);
            }
        }
        return boneNameAry;
    }
}
class ModuleList {
    public constructor() {

    }
    private static getModuleList(): Array<Pan3d.Module> {
        //所有的需要注册的模块  都写在这里

        var $arr: Array<Pan3d.Module> = [
            new materialui.MaterialModule(), //材质
            new colorview.ColorModule(), //右菜单
            new menutwo.MenuTwoModule(), //右菜单
            new editscene.EditSceneModule(), //基本面板
            new maineditor.MainEditorModule(), //场景
            new folder.FolderModule(),  //文件夹
            new xyz.MoveScaleRotatioinModule(),  //移动旋转组件
            new materialleft.MaterialLeftModule(),  //模型显示小窗口
            new drag.DragModule(),

        ];

        return $arr
    }


    /**
     * 启动所有模块 
     */
    public static startup(): void {
        var allModules: Array<Pan3d.Module> = ModuleList.getModuleList();
        for (var i: number = 0; i < allModules.length; i++) {
            Pan3d.Module.registerModule(allModules[i]);
        }
    }


}
