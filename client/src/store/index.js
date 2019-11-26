import { createStore, combineReducers } from 'redux';
import { reducer } from './reducer/reducer';

export const store = createStore(combineReducers({ reducer }));
