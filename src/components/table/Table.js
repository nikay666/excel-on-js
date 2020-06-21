import { ExcelComponents } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHadler } from './table.resize'
import { shouldResize, isCell, matrix, nextSelector } from './table.functions';
import { TableSelection } from "./TableSelection";
import { $ } from '../../core/dom';

  
export class Table extends ExcelComponents{

    constructor($root, options){
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown'],
            ...options
        })
    }

    static className = 'excel__table';
    toHTML(){
        return createTable(35);
    }
    prepare(){
        this.selection = new  TableSelection();
    }
    init(){
        super.init();

        const $cell = this.$root.find('[data-id="0:0"]');
        this.selection.select($cell);

        this.emitter.subscribe('it is working',text => {
            this.selection.current.text(text);
            console.log('Table  from Formula',text );
        } )
    }
    onMousedown(event){
        if(shouldResize(event)){
            resizeHadler(this.$root, event);
        }else if(isCell(event)){
            const $target = $(event.target);
            if(event.shiftKey){
                // const target = $target.id(true);
                // const current = this.selection.current.id(true);
                
                const $cells = matrix($target,  this.selection.current)
                                .map(id => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);
            }else{
                this.selection.select($target);
            }
        }
    }
    onKeydown(event){
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ];
        const {key} = event;

        if(keys.includes(key) && !event.shiftKey){
            event.preventDefault();

            const id= this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(key, id))
            this.selection.select($next);
           
        }
    }
}
