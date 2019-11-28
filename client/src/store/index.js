import { createStore, combineReducers } from 'redux';
import reducer from './reducer/reducer';
import createSurveyReducer from './reducer/createSurveyReducer';
import adminLoginReducer from './reducer/adminLoginReducer';

const store = createStore(
  combineReducers({ reducer, createSurveyReducer, adminLoginReducer }),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
