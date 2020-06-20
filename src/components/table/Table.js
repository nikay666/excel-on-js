import { ExcelComponents } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHadler } from './table.resize'
import { shouldResize } from './table.functions';
 
export class Table extends ExcelComponents{

    constructor($root){
        super($root, {
            listeners: ['mousedown']
        })
    }

    static className = 'excel__table';
    toHTML(){
        return createTable(35);
    }
    onMousedown(event){
        if(shouldResize(event)){
            resizeHadler(this.$root, event);
        }
    }
}
