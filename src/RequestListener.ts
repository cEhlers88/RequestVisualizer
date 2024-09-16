import express, {Express, NextFunction, Request, Response} from "express";
import http from "http";
import {Server} from "node:net";
import {IRequestInfo} from "./interface/IRequestInfo";
import {createProxyMiddleware} from "http-proxy-middleware";

export default class RequestListener {
    private _blacklistUrls: string[] = ['/favicon.ico'];
    private _app: Express;
    private _requestsListener: (reqInfo:IRequestInfo) => void = () => {};
    private _server: Server;
    constructor(targetServerUrl: string|null) {
        this._app = express();

        if(targetServerUrl!==null){
            const proxy = createProxyMiddleware({
                target: targetServerUrl,
                changeOrigin: true,
                on: {
                    proxyReq: (proxyReq:any, req:any, res:any) => {
                        this._handleRequests(req, res);
                    }
                }
            } as any);
            this._app.use(proxy);
        }else{
            this._app.use((req, res)=>{
                this._handleRequests(req, res, () => {
                    res.status(200).send('Request received');
                });
            });
        }

        this._server = http.createServer(this._app);
    }
    public listen(port: number, requestsListener: (reqInfo:IRequestInfo) => void) {
        this._requestsListener = requestsListener;
        this._server.listen(port, () => {
            console.log(`RequestListener listening at port ${port}`);
        });
    }
    private _handleRequests(req: Request, res: Response, endCallback:()=>void = ()=>{}) {
        const reqInfo: IRequestInfo = {
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: ''
        };
        req.on('data', (chunk: Buffer) => {
            reqInfo.body += chunk.toString();
        });
        req.on('end', () => {
            this._requestsListener(reqInfo);
            endCallback();
        });
    }


}