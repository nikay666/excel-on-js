import { DOMListener } from "./DOMListener";

export class ExcelComponents extends DOMListener{
    constructor($root, options = {}){
        super($root, options.listeners)
    }

    //Возвращает шаблон компонента
    toHTML(){
        return '';
    }
    init(){
        this.initDOMListeners();
    }
}