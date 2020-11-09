declare module prop {
    class CombineReflectionView extends MetaDataView {
        getMeshInfo(): any;
        private list;
        constructor(value: UiMeshSprite);
        replayUiList(): void;
        addView($view: MetaDataView): void;
        refreshViewValue(): void;
        destory(): void;
        resize(): void;
    }
}
