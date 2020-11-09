declare module Pan3d {
    class Grid9Compenent extends UICompenent {
        ogw: number;
        ogh: number;
        gw: number;
        gh: number;
        constructor();
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
    }
}
