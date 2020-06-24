import './scss/index.scss';
import { Excel } from './components/excel/Excel';
import { Toolbar } from './components/toolbar/toolbar';
import { Header } from './components/header/Header';
import { Formula } from './components/formula/formula';
import { Table } from './components/table/Table';
import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer);

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});

excel.render();