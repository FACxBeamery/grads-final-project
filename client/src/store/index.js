import { createStore, combineReducers } from 'redux';
import reducer from './reducer/reducer';
import createSurveyReducer from './reducer/createSurveyReducer';

const store = createStore(combineReducers({ reducer, createSurveyReducer }));

export default store;
