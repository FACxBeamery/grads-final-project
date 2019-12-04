import { createStore, combineReducers } from 'redux';

import reducer from './reducer/reducer';

import takeSurveyReducer from './reducer/takeSurveyReducer';
import createSurveyReducer from './reducer/createSurveyReducer';
import adminLoginReducer from './reducer/adminLoginReducer';
import snackbarReducer from './reducer/snackbarReducer';
import dashboardReducer from './reducer/dashboardReducer';
import employeeTableReducer from './reducer/employeeTableReducer';

const store = createStore(
  combineReducers({
    reducer,
    createSurveyReducer,
    takeSurveyReducer,

    adminLoginReducer,
    snackbarReducer,
    dashboardReducer,
    employeeTableReducer,
  }),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
