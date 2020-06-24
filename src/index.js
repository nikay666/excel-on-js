import './scss/index.scss';
import { Excel } from './components/excel/Excel';
import { Toolbar } from './components/toolbar/toolbar';
import { Header } from './components/header/Header';
import { Formula } from './components/formula/formula';
import { Table } from './components/table/Table';
import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';
import { storage } from './core/utilits';

//создаем стор
const store = createStore(rootReducer, {
    colState: {}
});

//подписываемся на стор

store.subscribe(state => {
    storage('excel-state', state);
    console.log('App state:',  state) 
})

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});

excel.render();