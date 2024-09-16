import './main.scss';
import './components';
import {domLib} from "@cehlers88/ceutils";
import DataGrid from "./components/DataGrid";
import io from "socket.io-client";

const socket:any = io();
const headInfoDataGrid = new DataGrid();

window.addEventListener('DOMContentLoaded',() => {
    const main = domLib.getElement('?body>main') as any;
    if (main) {
        main.appendChilds([
            domLib.createElement('div',{class: 'panel main-infos', childNodes:[
                domLib.createElement('h1',{innerText:'RequestVisualizer'}),
                headInfoDataGrid
            ]}),
            domLib.createElement('requests-visualizer'),
        ]);
    }
});

socket.on('request_received', (requestInfo:any) => {
    headInfoDataGrid.setData(requestInfo.env);
});