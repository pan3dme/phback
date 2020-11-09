declare module maineditor {
    import Rectangle = Pan3d.Rectangle;
    import UICompenent = Pan3d.UICompenent;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Disp2DBaseText = Pan3d.Disp2DBaseText;
    class SelectFileListText extends Disp2DBaseText {
        bgUi: UICompenent;
        textMetrics: TextMetrics;
        tittlestr: string;
        select: boolean;
        private _select;
        makeData(): void;
    }
    class EditorOpenList {
        private perent;
        private topRender;
        constructor(value: MainEditorPanel, render: UIRenderComponent);
        private tabItemArr;
        private tabBgClik;
        removePathUrl(value: string): void;
        changeVoBg(vo: SelectFileListText, value: boolean): void;
        private refrishTabUiSelect;
        pushPathUrl(value: string): void;
        private selectTabStr;
    }
    class MainEditorPanel extends win.Dis2dBaseWindow {
        constructor();
        sceneProjectVo: SceneProjectVo;
        private _sceneViewRender;
        private e_line_left;
        private e_line_right;
        private e_centen_panel;
        editorOpenList: EditorOpenList;
        protected loadConfigCom(): void;
        showType: number;
        private a_scene_view;
        private initView;
        protected butClik(evt: InteractiveEvent): void;
        onPanellMouseWheel($evt: MouseWheelEvent): void;
        private dragDrop;
        suffix: string;
        private testSuffix;
        private dragEnter;
        private upFrame;
        resize(): void;
        panelEventChanger(value: Rectangle): void;
        refrishSize(): void;
    }
}
