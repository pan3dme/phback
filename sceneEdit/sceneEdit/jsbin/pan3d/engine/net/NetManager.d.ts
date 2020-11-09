declare module Pan3d {
    class NetManager {
        private static _instance;
        static getInstance(): NetManager;
        private _socket;
        private _handlerMap;
        protocolos: Protocols;
        private _connetFun;
        connectState: number;
        constructor();
        connect(ip: string, port: number, conntFun: Function): void;
        private onErrorEvent;
        private onopenEvent;
        private onmessageEvent;
        private oncloseEvent;
        reg(netReg: any): void;
        unReg(key: any): void;
        send($byte: Pan3dByteArray): void;
        close(): void;
    }
}
