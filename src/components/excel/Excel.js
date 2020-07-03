import { $ } from "../../core/dom";
import { Emitter } from "../../core/Emitter";
import { storeSubscriber } from "../../core/storeSubscriber";
import { updateDate } from "../../redux/actions";

export class Excel{
    constructor(options){

        this.components = options.components || [];
        this.store = options.store;
        this.emitter = new Emitter();
        // this.subscribe = options.subscribe || [];
        this.subscriber = new storeSubscriber(this.store);

    }

    getRoot(){
        const $root  = $.create('div', 'excel');
        const  componentOptionns = {
            emitter: this.emitter,
            store: this.store
        };

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el,componentOptionns);
            $el.html(component.toHTML());
            $root.append($el);
            return component;
        });
        return $root;
    }

    init(){
        this.store.dispatch(updateDate());
        this.subscriber.subscribeComponents(this.components);
        this.components.forEach(component => {
            component.init();
        });
    }
    destroy(){
        this.subscriber.subscribeFromStore();
        this.components.forEach(component => component.destroy());
    }
}
