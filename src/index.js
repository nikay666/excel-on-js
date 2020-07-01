import './scss/index.scss';
import { Excel } from './components/excel/Excel';
import { Toolbar } from './components/toolbar/toolbar';
import { Header } from './components/header/Header';
import { Formula } from './components/formula/formula';
import { Table } from './components/table/Table';
import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';
import { storage, debounce } from './core/utilits';
import { initialState } from './redux/initialState';


const store = createStore(rootReducer,initialState);

const stateListener =  debounce(state =>  {
    storage('excel-state', state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});

excel.render();