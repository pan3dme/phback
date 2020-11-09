declare module maineditor {
    class HierarchyNodeType {
        static Folder: number;
        static Prefab: number;
        static Light: number;
        static Water: number;
        static Grass: number;
        static Capture: number;
        static Build: number;
        static Reflection: number;
        static LightProbe: number;
        static ParallelLight: number;
        static Particle: number;
        static Role: number;
        static SKILL: number;
        static Ground: number;
    }
    class HierarchyFileNode extends FileNode {
        type: number;
        treeSelect: Boolean;
        lock: Boolean;
        isHide: Boolean;
        isOpen: boolean;
        constructor();
    }
}
