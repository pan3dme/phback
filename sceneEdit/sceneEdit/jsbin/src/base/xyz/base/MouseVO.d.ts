declare module xyz {
    import Object3D = Pan3d.Object3D;
    class MouseVO extends Object3D {
        _mouseDown: Boolean;
        last_mouse_x: number;
        last_mouse_y: number;
        oldPosx: number;
        oldPosy: number;
        oldPosz: number;
        old_rotation_x: number;
        old_rotation_y: number;
    }
}
