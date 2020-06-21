export class Emitter {
    constructor(){
        this.listeners = {}
    }
    // emit - испускают, излучать, выделять
    // options name: dispatch, fire, trigger
    //Уведмляем слушателей,если онии  есть 
    //'focus',  ''make-it-work any str
    emit(event, ...args){
        if( !Array.isArray(this.listeners[event])){
            return  false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        });
        return true;
    }

    // options name: on,  listen
    //Подписываемся на уведомление
    //Добавляем нового  слушателя
     
    subscribe(event, fn){
        this.listeners[event] =  this.listeners[event] || [];
        this.listeners[event].push(fn);

        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
        }
    }
}
