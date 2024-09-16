import {domLib} from "@cehlers88/ceutils";

class DataGrid extends HTMLElement {
    setData(data: { [key:string] : string }, ignoreKeys?:string[]){
        (this as any).removeAllChilds();
        for(let key in data){
            if(ignoreKeys && ignoreKeys.includes(key)) continue;
            this.appendChild(domLib.createElement('span',{innerText:key}));
            if(Array.isArray(data[key]) || typeof data[key] === 'object'){
                const subGrid = domLib.createElement('data-grid') as DataGrid;
                subGrid.setData(data[key] as any);
                this.appendChild(subGrid);
            }else{
                this.appendChild(domLib.createElement('span',{innerText:data[key]}));
            }
        }
    }
}

customElements.define('data-grid', DataGrid);

export default DataGrid;