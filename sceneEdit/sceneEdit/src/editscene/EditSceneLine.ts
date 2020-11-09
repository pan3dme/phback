module editscene {
    import Rectangle = Pan3d.Rectangle
    import Sprite = win.Sprite
    import UICompenent = Pan3d.UICompenent
    import InteractiveEvent = Pan3d.InteractiveEvent
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data


    export class TempSceneLine extends win.BaseWindow {

        private leftLine: UICompenent;
        private rightLine: UICompenent;
        private bottomLine: UICompenent;

        private leftLineMin: UICompenent;
        private rightLineMin: UICompenent;
        private bottomLineMin: UICompenent;

        private closeLeftBut: UICompenent
        private closeRightBut: UICompenent
        private closeBottomBut: UICompenent


        protected loadConfigCom(): void {
            super.loadConfigCom();


            this.leftLine = this._baseTopRender.getComponent("a_empty");
            this.rightLine = this._baseTopRender.getComponent("a_empty");
            this.bottomLine = this._baseTopRender.getComponent("a_empty");


            this.setUiListVisibleByItem([this.leftLine], true)
            this.setUiListVisibleByItem([this.rightLine], true)
            this.setUiListVisibleByItem([this.bottomLine], true)


            this.leftLineMin = this._baseTopRender.getComponent("b_line_pixe_point");
            this.rightLineMin = this._baseTopRender.getComponent("b_line_pixe_point");
            this.bottomLineMin = this._baseTopRender.getComponent("b_line_pixe_point");




            this.closeLeftBut = this.addEvntButUp("e_left_close_but", this._baseTopRender)
            this.closeRightBut = this.addEvntButUp("e_right_close_but", this._baseTopRender)
            this.closeBottomBut = this.addEvntButUp("e_bottom_close_but", this._baseTopRender)

            //this.closeLeftBut.width = 10
            //this.closeLeftBut.height = 60
            //this.closeRightBut.width = 10
            //this.closeRightBut.height = 60
            //this.closeBottomBut.width = 60
            //this.closeBottomBut.height = 10



            this.setUiListVisibleByItem([this.leftLineMin], true)
            this.setUiListVisibleByItem([this.rightLineMin], true)
            this.setUiListVisibleByItem([this.bottomLineMin], true)



            this.leftLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.rightLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.bottomLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);




            this.setRect(new Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight))

            this.resize()

       //     console.log("ui布局完成")
         

        }
        private hideItemDic: any = {}
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.closeLeftBut:
                    this.hideItemDic["left"] = !this.hideItemDic["left"]
                    this.leftSpeed = 0;
                    TweenLite.to(this, 0.2, { leftSpeed: 1 });
                    break
                case this.closeRightBut:
                    this.hideItemDic["right"] = !this.hideItemDic["right"]
                    this.rightSpeed = 0;
                    TweenLite.to(this, 0.2, { rightSpeed: 1 });
                    break
                case this.closeBottomBut:
                    this.hideItemDic["bottom"] = !this.hideItemDic["bottom"]
                    this.bottomSpeed = 0;
                    TweenLite.to(this, 0.2, { bottomSpeed: 1 });
                    break
                default:
            }
          
        }
        public set leftSpeed(value: number) {
            this._leftSpeed = value
            this.resize()
        }
        private _leftSpeed: number = 1;
        public get leftSpeed() {
            return this._leftSpeed
        }
        public set rightSpeed(value: number) {
            this._rightSpeed = value
            this.resize()
        }
        private _rightSpeed: number = 1;
        public get rightSpeed() {
            return this._rightSpeed
        }

        public set bottomSpeed(value: number) {
            this._bottomSpeed = value
            this.resize()
        }
        private _bottomSpeed: number = 1;
        public get bottomSpeed() {
            return this._bottomSpeed
        }


        private leftWidthNum: number = 300 //左边宽度；
        private rightWidthNum: number = 300 //右边宽度；
        private bottomHeightNum: number = 300 //底下宽度；

        public resize(): void {
            super.resize()
            if (this.bottomLine) {

                var leftNum: number = this.leftWidthNum;
                var rightNum: number = this.rightWidthNum;
                var bottomNum: number = this.bottomHeightNum;

                if (this.hideItemDic["left"]) {//左边关关闭
                    leftNum = (1 - this._leftSpeed) * this.leftWidthNum;
                } else {
                    leftNum = this._leftSpeed * this.leftWidthNum;
                }
                if (this.hideItemDic["right"]) {//左边关关闭
                    rightNum = (1 - this._rightSpeed) * this.rightWidthNum;
                } else {
                    rightNum = this._rightSpeed * this.rightWidthNum;
                }
                if (this.hideItemDic["bottom"]) {//左边关关闭
                    bottomNum = 20
                    bottomNum = (1 - this._bottomSpeed) * this.bottomHeightNum+20;
                } else {
                    bottomNum = this._bottomSpeed * this.bottomHeightNum;
                }


                this.leftLine.x = leftNum - 5
                this.leftLine.y = 0
                this.leftLine.width = 10
                this.leftLine.height = Scene_data.stageHeight - bottomNum

                this.closeLeftBut.x = this.leftLine.x + 4
                this.closeLeftBut.y = this.leftLine.height / 2 - this.closeLeftBut.height/2;


                this.rightLine.x = Scene_data.stageWidth - rightNum -6
                this.rightLine.y = 0
                this.rightLine.width = 10
                this.rightLine.height = Scene_data.stageHeight
                this.closeRightBut.x = this.rightLine.x - 6;
                this.closeRightBut.y = this.closeLeftBut.y;

                this.bottomLine.x = 0
                this.bottomLine.y = Scene_data.stageHeight - bottomNum - 5
                this.bottomLine.width = Scene_data.stageWidth - rightNum
                this.bottomLine.height = 10

                this.closeBottomBut.x = leftNum+ (this.bottomLine.width - leftNum) / 2 - this.closeBottomBut.width/2
                this.closeBottomBut.y = this.bottomLine.y-5


                this.leftLineMin.x = this.leftLine.x + 5
                this.leftLineMin.y = this.leftLine.y
                this.leftLineMin.width = 2
                this.leftLineMin.height = this.leftLine.height

                this.rightLineMin.x = this.rightLine.x + 5
                this.rightLineMin.y = this.rightLine.y
                this.rightLineMin.width = 2
                this.rightLineMin.height = this.rightLine.height


                this.bottomLineMin.x = this.bottomLine.x
                this.bottomLineMin.y = this.bottomLine.y + 5
                this.bottomLineMin.width = this.bottomLine.width
                this.bottomLineMin.height = 2





                EditLeftPanel.leftPanel.y = this.menuHeight;
                AppData.centenPanel.y = this.menuHeight;
                AppData.rightPanel.y = this.menuHeight;




                if (this.hideItemDic["left"]) {//左边关关闭
                    EditLeftPanel.leftPanel.x = -this.leftWidthNum * this._leftSpeed;
                } else {
                    EditLeftPanel.leftPanel.x = this.leftWidthNum *( this._leftSpeed-1);
                }

                EditLeftPanel.leftPanel.height = Scene_data.stageHeight - bottomNum - this.menuHeight;
                EditLeftPanel.leftPanel.width = this.leftWidthNum;
            

                EditLeftPanel.leftPanel.resize()



                AppData.rightPanel.x = Scene_data.stageWidth - rightNum
                AppData.rightPanel.height = Scene_data.stageHeight - this.menuHeight;
                AppData.rightPanel.width = rightNum;
                AppData.rightPanel.resize()

 

                AppData.centenPanel.x = leftNum


                AppData.centenPanel.height = Scene_data.stageHeight - bottomNum - this.menuHeight
                AppData.centenPanel.width = Scene_data.stageWidth - leftNum - rightNum

                AppData.centenPanel.width = Scene_data.stageWidth - leftNum - rightNum


                AppData.centenPanel.resize()

                var rect: Rectangle = new Rectangle(0, Scene_data.stageHeight - bottomNum + 2, Scene_data.stageWidth - rightNum, bottomNum);
                Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.EDITSCENE_RESET_SIZE), rect);
                Pan3d.ModuleEventManager.dispatchEvent(new EditSceneEvent(EditSceneEvent.EDITE_SCENE_RESIZE), rect);

                prop.PropModel.getInstance().resize()
            }

        }
        protected lastLaoutVec: Vector3D;
        protected tittleMouseDown(evt: InteractiveEvent): void {
            this.mouseMoveTaget = evt.target
            this.lastMousePos = new Vector2D(evt.x, evt.y)



            switch (this.mouseMoveTaget) {
                case this.leftLine:
                case this.rightLine:
                case this.bottomLine:
                    this.lastPagePos = new Vector2D(evt.target.x, evt.target.y)
                    this.lastLaoutVec = new Vector3D(this.leftWidthNum, this.rightWidthNum, this.bottomHeightNum);
                    break
                default:

                    break

            }

            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        private menuHeight: number = 28
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
            switch (this.mouseMoveTaget) {
                case this.leftLine:
                    this.leftWidthNum = this.lastLaoutVec.x + (evt.x - this.lastMousePos.x)
                    this.leftWidthNum = Math.min((Scene_data.stageWidth - this.rightWidthNum) - 100, this.leftWidthNum)
                    this.leftWidthNum = Math.max(300, this.leftWidthNum);
                    break
                case this.rightLine:
                    this.rightWidthNum = this.lastLaoutVec.y - (evt.x - this.lastMousePos.x)
                    this.rightWidthNum = Math.min((Scene_data.stageWidth - this.leftWidthNum) - 100, this.rightWidthNum)
                    this.rightWidthNum = Math.max(100, this.rightWidthNum);
                    break
                case this.bottomLine:
                    this.bottomHeightNum = this.lastLaoutVec.z - (evt.y - this.lastMousePos.y)
                    this.bottomHeightNum = Math.min(Scene_data.stageHeight - 100, this.bottomHeightNum)
                    this.bottomHeightNum = Math.max(100, this.bottomHeightNum);

                    break
                default:
                    console.log("nonono")
                    break

            }
            this.resize()




        }

    }

    export class EditSceneLine extends Sprite {
        private winBg: TempSceneLine;
        public constructor(has: boolean = true) {
            super();

            this.winBg = new TempSceneLine();
            this.addUIContainer(this.winBg)
            this.changeSize()


        }


    }
}

