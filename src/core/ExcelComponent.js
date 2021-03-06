import { DOMListener } from "./DOMListener";


export class ExcelComponents extends DOMListener{
    constructor($root, options = {}){
        super($root, options.listeners);
        this.name =  options.name || '';
        this.unsubscribers = [];
        this.storeSub = null;
        this.subscribe =  options.subscribe  || [];

        this.store = options.store;
        this.emitter = options.emitter;
        this.prepare();
    }
    //Настраиваем компонент до init
    prepare(){}

    //Возвращает шаблон компонента
    toHTML(){
        return '';
    }

    //Уведомляем слушателей про событие evet
    $emit(event, ...args){
        this.emitter.emit(event, ...args);
    }

    //Подписываемся на событие event
    $on(event, fn){
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    //dispatch for  store(index.js -> exel -> exelComponent(dispatch in createStore))
    $dispatch(action){
        this.store.dispatch(action);
    }

    //Сюда уходят только изменения по тем полям, на которые мы подписались
    storeChanged(){

    }

    isWatching(key){
        return this.subscribe.includes(key)
    }

    //Инициализируе мкомпонент
    //Добавляем DOM слушатели
    init(){
        this.initDOMListeners();
    }

    //Удаляем компонент
    //Чистим слушаели
    destroy(){
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub());
    }
}