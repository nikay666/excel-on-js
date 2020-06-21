import { DOMListener } from "./DOMListener";

export class ExcelComponents extends DOMListener{
    constructor($root, options = {}){
        super($root, options.listeners);
        this.name =  options.name || '';
        
        this.emitter = options.emitter;
        this.prepare();
    }
    prepare(){}

    //Возвращает шаблон компонента
    toHTML(){
        return '';
    }
    init(){
        this.initDOMListeners();
    }
    destroy(){
        this.removeDOMListeners();
    }
}