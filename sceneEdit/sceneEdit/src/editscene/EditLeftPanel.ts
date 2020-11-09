module editscene {
    import Panel = win.Panel;
 
    import UIConatiner = Pan3d.UIConatiner
 
    export class EditLeftPanel extends Panel {
        public static leftPanel: EditLeftPanel
        public addUIContainer($container: UIConatiner): void {
            if ($container["only"]) { //唯一标记
                this.removeNeedRemove()
            }
            super.addUIContainer($container)
            if ($container["propPanle"]) {//特殊添加组件面板
                this.addChild($container["propPanle"])
            }

    
        }
    
        private removeNeedRemove(): void {
            for (var i: number = (this._containerList.length - 1); i >= 0; i--) {
                if (this._containerList[i]["only"]) { //标记需要移除，不能同时存在的面板
                    this.removeUIContainer(this._containerList[i])
                }
            }
        }
 
        public removeUIContainer($container: UIConatiner): void {
            if ($container["propPanle"]) {//特殊添加组件面板
                this.removeChild($container["propPanle"])
            }
            super.removeUIContainer($container)
  
        }
        
        public resize(): void {
            super.resize()
            for (var i: number = 0; i < this.children.length; i++) {
                this.children[i].resize()

            }
    
        }
       

    }
}