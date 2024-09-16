import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import RequestListener from "./RequestListener";
import {IRequestInfo} from "./interface/IRequestInfo";
import dotenv from 'dotenv';
dotenv.config();

const frontendApp = express();
const frontendServer = http.createServer(frontendApp);
const io = new SocketIOServer(frontendServer);
frontendApp.use(express.static('public'));

const requestListener:RequestListener = new RequestListener(process.env.PROXY_TARGET || null);
requestListener.listen(Number(process.env.PORT_REQUEST_LISTENER || 4000), (reqInfo:IRequestInfo) => {
    io.emit('request_received', {
        ...reqInfo,
        env: {
            PORT_FRONTEND: process.env.PORT_FRONTEND,
            PORT_REQUEST_LISTENER: process.env.PORT_REQUEST_LISTENER,
            PROXY_TARGET: process.env.PROXY_TARGET
        }
    });
});

const frontendPort = Number(process.env.PORT_FRONTEND || 3000);
frontendServer.listen(frontendPort, () => {
    console.log(`Frontend server listening at port ${frontendPort}`);
});