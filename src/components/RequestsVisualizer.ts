import {domLib} from "@cehlers88/ceutils";
import {IRequestInfo} from "../interface/IRequestInfo";
import io from "socket.io-client";
import StackContainer from "./StackContainer";
import DataGrid from "./DataGrid";
const socket:any = io();

class RequestVisualizer extends HTMLElement {
    private _historyBulletsContainer:StackContainer;
    private _outputContainer:DataGrid;
    private _requestHistory: (IRequestInfo&{
        date: Date
    })[] = [];

    constructor() {
        super();
        this._historyBulletsContainer = new StackContainer({
            class:'history-bullets',
            insertMode:'prepend'
        });
        this._historyBulletsContainer.setItemRenderer((requestInfo:IRequestInfo&{date:Date})=>{
            return domLib.createElement('span', {
                class: 'method--' + requestInfo.method!.toLowerCase(),
                innerText: requestInfo.method,
                onClick: () => {
                    this._updateOutputContainer(requestInfo);
                }
            });
        });
        this._outputContainer = domLib.createElement('data-grid',{class:'output-container'}) as DataGrid;
    }
    addRequestInfos(requestInfo:IRequestInfo){
        const historyEntry = {
            ...requestInfo,
            date: new Date()
        };
        this._requestHistory.unshift(historyEntry);
        this._historyBulletsContainer.addItem(historyEntry);
        this._updateOutputContainer(requestInfo);
    }
    connectedCallback() {
        socket.on('request_received', (requestInfo:IRequestInfo) => {
            this.addRequestInfos(requestInfo);
        });

        (this as any).appendChilds([
            this._historyBulletsContainer,
            this._outputContainer
        ]);
    }
    private _updateOutputContainer(RequestInfo:IRequestInfo){
        this._outputContainer.setData((RequestInfo as any),['env']);
    }
}

customElements.define('requests-visualizer', RequestVisualizer);
export default RequestVisualizer;