import { createStore, combineReducers } from 'redux';
import reducer from './reducer/reducer';
import takeSurveyReducer from './reducer/takeSurveyReducer';

const store = createStore(combineReducers({ reducer, takeSurveyReducer }));

export default store;
