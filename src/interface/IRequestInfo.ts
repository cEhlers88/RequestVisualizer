import {IncomingHttpHeaders} from "http";

export interface IRequestInfo {
    method: string | undefined;
    url: string | undefined;
    headers: IncomingHttpHeaders;
    body: string;
}