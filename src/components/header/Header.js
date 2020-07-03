import { ExcelComponents } from "../../core/ExcelComponent";
import { changeTitle } from "../../redux/actions";
import { defaultTitle } from "../../constants";
import { $ } from "../../core/dom";
import { debounce } from "../../core/utilits";
import { ActiveRoute } from "../../core/routes/ActiveRoute";

export class Header extends ExcelComponents{
    static className = 'excel__header';
    constructor($root, options){
        super($root,  {
            name: 'Header',
            listeners: ['input','click'],
            ...options
        })
    }

    prepare(){
        this.onInput = debounce(this.onInput,300);
    }

    toHTML(){  
        const title = this.store.getState().title || defaultTitle;
        return `
        <input type="text" class="input" value="${title}" />

        <div>
            <div class="button" data-button="remove">
                <span class="material-icons" data-button="remove">
                    delete
                </span>
            </div>
            <div class="button" data-button="exit">
                <span class="material-icons" data-button="exit">
                    exit_to_app
                </span>
            </div>
        </div>
        `;
    }

    onInput(event){
        const $target = $(event.target);
        this.$dispatch(changeTitle($target.text()));
    }

    onClick(event){
        const $target = $(event.target);

        if($target.data.button === 'remove'){
            const decision = confirm('Вы действительно хотете удалить эту таблицу? ');

            if(decision){
                localStorage.removeItem('excel:'+ ActiveRoute.param);
                ActiveRoute.navigate('');
            }

        }else if($target.data.button === 'exit'){
            ActiveRoute.navigate('');
        }
    }
}