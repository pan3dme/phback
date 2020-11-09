 
module prop {

    export class CombineReflectionView extends MetaDataView {


        public getMeshInfo(): any {
            var obj: any = {};
            obj.class = this;
            obj.data = [];
            for (var i: number = 0; i < this.list.length; i++) {
                obj.data.push(this.list[i].getMeshInfo());
            }
            return obj
        }
        private list: Array<MetaDataView>
        public constructor(value: UiMeshSprite) {
            super(value);
            this.list=[]
        }
        public replayUiList(): void {
            this.destory()//复活UI
            for (var i: number = 0; this.list && i < this.list.length; i++) {
                this.list[i].replayUiList();
            }

        }
        public addView($view: MetaDataView): void {
            this.list.push($view)
            $view.categoryFun = () => {
                this.refreshViewValue()
            }
           
        }
        public refreshViewValue(): void {
            var ty: number = this.top
            for (var i: number = 0; i < this.list.length; i++) {
                this.list[i].top = ty;
                ty += this.list[i].height;
                this.list[i].refreshViewValue();
            }
            super.refreshViewValue();
        }
        public destory(): void {/*
            while (this.list.length) {
                var temp: MetaDataView = this.list.pop();
                temp.destory();
            }
            super.destory()
            */

            for (var i: number = 0; i < this.list.length; i++) {
                this.list[i].destory();
            }
        }
        public resize(): void {
            super.resize()
            for (var i: number = 0; this.list&&i < this.list.length; i++) {
                this.list[i].width = this.width
                this.list[i].resize();
            }
        }
    }
}