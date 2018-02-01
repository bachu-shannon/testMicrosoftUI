import {combineReducers} from 'redux';
import itemsStore from './ItemsStore';
import selectionStore from './SelectionStore';

let reducers = combineReducers({
    itemsStore,
    selectionStore
});

export default reducers;