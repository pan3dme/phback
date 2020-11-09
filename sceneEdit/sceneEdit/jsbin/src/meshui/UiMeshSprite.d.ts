declare module prop {
    class UiMeshSprite extends win.Sprite {
        resize(): void;
        onAdd(): void;
        onRemove(): void;
        addBaseMeshUi(value: BaseMeshUi): void;
        private metaViewItem;
        addMeshView(value: MetaDataView): void;
    }
}
