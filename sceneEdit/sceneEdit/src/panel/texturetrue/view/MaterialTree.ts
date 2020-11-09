module materialui {
    import TexItem = Pan3d.TexItem
    import TextureCube = Pan3d.TextureCube
    import Material = Pan3d.Material
    import Shader3D = Pan3d.Shader3D

    import ConstItem = Pan3d.ConstItem
    export class MaterialTree extends Material {
        private _data: any;

        public showurl: string
        public zbuff: boolean
        public pointlight: boolean
        private _compileData: any;
        private _url: string;

        public shaderStr: string;
        public laterTextureurl: string
        public laterTexture: MaterialTree
        public texList: Array<TexItem> = new Array
        public cubeTextItem: TextureCube
        public constList: Array<ConstItem> = new Array
        public hasTime: boolean;
        public timeValue: Vector2D;
        public blendMode: number;
        public backCull: boolean;
        public killNum: number = 0;
        public hasVertexColor: boolean;
        public usePbr: boolean;
        public useNormal: boolean;
        public useUv: boolean
        public useLightUv: boolean

        public roughness: number;

        public writeZbuffer: boolean = true;

        public useDynamicIBL: boolean;
        public normalScale: number;
        public lightProbe: boolean;
        public directLight: boolean;
        public scaleLightMap: boolean;
        public noLight: boolean;
        public fogMode: number;
        public useKill: boolean;
        public hasAlpha: boolean;
        public hasSkyBox: boolean
        public skyBoxTextId: number;
        public materialBaseData: MaterialBaseData;
        public fcNum: number;
        public fcIDAry: Array<number> = new Array;//[]


        public modelShader: Shader3D
        public roleShader: Shader3D

        public get data(): any {
            return this._data;
        }
        public set data(value: any) {
            this._data = value;
        }
        public setData(value: any): void {
            this.data = value.data;
            this.compileData = value.compileData;
        }
 

        public clone(): MaterialTree {
            var $temp: MaterialTree = new MaterialTree;
            var $treeMater: MaterialTree = this
            $temp.data = $treeMater.data
            $temp.constList = $treeMater.constList
            $temp.fcNum = $treeMater.fcNum
            $temp.fcData = $treeMater.fcData;
            $temp.texList = $treeMater.texList;
            $temp.useNormal = $treeMater.useNormal;
            $temp.useLightUv = $treeMater.useLightUv;
            $temp.hasTime = $treeMater.hasTime;
            $temp.timeSpeed = $treeMater.timeSpeed;
            $temp.timeValue = $treeMater.timeValue;
            $temp.useUv = $treeMater.useUv;
            $temp.blendMode = $treeMater.blendMode;
            


            return $temp
        }
        public set compileData(value: any) {

            if (!value) {
                return;
            }
            this._compileData = value;
            this.shaderStr = this._compileData.shaderStr;

            this.hasTime = this._compileData.hasTime;
            this.timeSpeed = this._compileData.timeSpeed;
            this.blendMode = this._compileData.blendMode
            this.backCull = this._compileData.backCull;
            this.killNum = this._compileData.killNum;
            this.hasVertexColor = this._compileData.hasVertexColor;
            this.usePbr = this._compileData.usePbr;
            this.useNormal = this._compileData.useNormal;
            this.roughness = this._compileData.roughness;
            this.writeZbuffer = this._compileData.writeZbuffer;
            this.hasFresnel = this._compileData.hasFresnel;
            this.useDynamicIBL = this._compileData.useDynamicIBL;
            this.normalScale = this._compileData.normalScale;
            this.lightProbe = this._compileData.lightProbe;
            this.directLight = this._compileData.directLight;
            this.noLight = this._compileData.noLight;
            this.fogMode = this._compileData.fogMode;
            this.scaleLightMap = this._compileData.scaleLightMap;
            this.useKill = this._compileData.useKill;
            this.fcNum = this._compileData.fcNum;
            this.fcIDAry = this._compileData.fcIDAry;
            this.hasAlpha = this._compileData.hasAlpha;
            this.skyBoxTextId = this._compileData.skyBoxTextId;
            this.hasSkyBox = this._compileData.hasSkyBox;
            this.materialBaseData = new MaterialBaseData;
            this.materialBaseData.setData(this._compileData.materialBaseData);

            if (this._compileData.texList) {
                var ary: Array<any> = this._compileData.texList;
                this.texList = new Array;
                for (var i: number = 0; i < ary.length; i++) {
                    var texItem: TexItem = new TexItem;
                    texItem.id = ary[i].id;
                    texItem.url = ary[i].url;
                    texItem.isDynamic = ary[i].isDynamic;
                    texItem.paramName = ary[i].paramName;
                    texItem.isMain = ary[i].isMain;
                    texItem.wrap = ary[i].wrap;
                    texItem.filter = ary[i].filter;
                    texItem.mipmap = ary[i].mipmap;
                    texItem.permul = ary[i].permul;
                    texItem.isParticleColor = ary[i].isParticleColor;
                    texItem.type = ary[i].type;
                    this.texList.push(texItem);
                }
            }

            if (this._compileData.constList) {
                ary = this._compileData.constList;
                this.constList = new Array;
                for (i = 0; i < ary.length; i++) {
                    var constItem: ConstItem = new ConstItem;
                    constItem.setData(ary[i]);
                    this.constList.push(constItem);
                }
            }


        }

    }

}