import { createStore, combineReducers } from 'redux';

import reducer from './reducer/reducer';

import takeSurveyReducer from './reducer/takeSurveyReducer';
import createSurveyReducer from './reducer/createSurveyReducer';
import surveyDetailReducer from './reducer/surveyDetailReducer';
import adminLoginReducer from './reducer/adminLoginReducer';
import snackbarReducer from './reducer/snackbarReducer';
import dashboardReducer from './reducer/dashboardReducer';
import employeeTableReducer from './reducer/employeeTableReducer';
import editSurveyReducer from './reducer/editSurveyReducer';
import errorsBagReducer from './reducer/errorsBagReducer';

const store = createStore(
  combineReducers({
    reducer,
    createSurveyReducer,
    surveyDetailReducer,
    takeSurveyReducer,
    adminLoginReducer,
    snackbarReducer,
    dashboardReducer,
    employeeTableReducer,
    editSurveyReducer,
    errorsBagReducer,
  }),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
