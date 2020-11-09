module maineditor {
    import UICompenent = Pan3d.UICompenent
    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign
    import Rectangle = Pan3d.Rectangle
    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import UIRectangle = Pan3d.UIRectangle
    import baseMeshVo = Pan3d.baseMeshVo
    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import MouseType = Pan3d.MouseType
    import FileVo = pack.FileVo
    import Vector2D = Pan3d.Vector2D
    import Vector3D = Pan3d.Vector3D
    import Scene_data = Pan3d.Scene_data
    import TextureManager = Pan3d.TextureManager
    import LoadManager = Pan3d.LoadManager

    export class HierarchyNodeType {

        public static  Folder: number = 0;
        public static  Prefab: number = 1;
        public static  Light: number = 2;
        public static  Water: number = 3;
        public static  Grass: number = 4;
        public static  Capture: number = 5;
        public static  Build: number = 6;
        public static  Reflection: number = 7;
        public static  LightProbe: number = 8;
        public static  ParallelLight: number = 9;

        public static  Particle: number = 11;
        public static  Role: number = 12;
        public static  SKILL: number = 13;
        public static  Ground: number = 14;

        
    }

    export class HierarchyFileNode extends FileNode {
        public type: number;      //0 文件夹, 1prefab,2light
        public treeSelect: Boolean
        public lock: Boolean
        public isHide: Boolean
        public isOpen: boolean;
        public constructor() {
            super()
        }


    }
}