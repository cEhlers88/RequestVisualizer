import {domLib} from "@cehlers88/ceutils";

class StackContainer extends HTMLElement {
    private _itemRenderer:(itemDefinition:any)=>HTMLElement;
    private _insertMode:'append'|'prepend' = 'append';
    constructor(props?:any) {
        super();
        for(let key in props){
            switch (key.toLowerCase()) {
                case 'class': this.classList.add(props[key]); break;
                case 'insertmode': this._insertMode = props[key]; break;
            }
        }
        this._itemRenderer = (def:any)=>{
            return domLib.createElement('span',{innerText:'Not implemented'});
        }
    }
    connectedCallback() {
        console.log('ist verbunden');
    }
    addItem(definition:any):StackContainer{
        this[this._insertMode](this._itemRenderer(definition));
        return this;
    }
    setItemRenderer(renderer:(itemDefinition:any)=>HTMLElement):StackContainer {
        this._itemRenderer = renderer;
        return this;
    }
}

customElements.define('stack-container', StackContainer);

export default StackContainer;