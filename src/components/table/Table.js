import { ExcelComponents } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHadler } from './table.resize'
import { shouldResize, isCell, matrix, nextSelector } from './table.functions';
import { TableSelection } from "./TableSelection";
import { $ } from '../../core/dom';
import { TABLE_RESIZE } from "../../redux/types";
import * as  actions from '../../redux/actions';

  
export class Table extends ExcelComponents{

    constructor($root, options){
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    static className = 'excel__table';
    toHTML(){
        return createTable(35, this.store.getState());
    }
    prepare(){
        this.selection = new  TableSelection();
    }
    init(){
        super.init();

        const $cell = this.$root.find('[data-id="0:0"]');
        this.selectCell($cell);

        this.$on('formula:input',text => {
            this.selection.current.text(text);
            this.updateTextInStore(text);
        });
        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
    }

    selectCell($cell){
        this.selection.select($cell);
        this.$emit('table:select', $cell);
    }

    async resizeTable(event){
        try {
            //отпрравляем на обработку в стор
            const data = await resizeHadler(this.$root, event);
            //диспатчим экшен и он отправляется в rootReducer
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('[MY ERROR]', e);
        }
    }

    onMousedown(event){
        if(shouldResize(event)){
            this.resizeTable(event);
        }else if(isCell(event)){
            const $target = $(event.target);
            if(event.shiftKey){
                // const target = $target.id(true);
                // const current = this.selection.current.id(true);
                
                const $cells = matrix($target,  this.selection.current)
                                .map(id => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);
            }else{
                this.selectCell($target);
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
            this.selectCell($next);
           
        }
    }
    updateTextInStore(value){
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event){
        // this.$emit('table:input', $(event.target));
        this.updateTextInStore($(event.target).text());
    }
}
