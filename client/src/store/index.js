import { createStore, combineReducers } from 'redux';
import { reducer } from './reducer/reducer';
import dashboardReducer from './reducer/dashboardReducer';

const store = createStore(combineReducers({ reducer, dashboardReducer }));

export default store;
