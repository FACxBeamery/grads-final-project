import { createStore, combineReducers } from 'redux';

import reducer from './reducer/reducer';
import createSurveyReducer from './reducer/createSurveyReducer';
import surveyDetailReducer from './reducer/surveyDetailReducer';
import adminLoginReducer from './reducer/adminLoginReducer';
import snackbarReducer from './reducer/snackbarReducer';
import dashboardReducer from './reducer/dashboardReducer';

const store = createStore(
  combineReducers({
    reducer,
    createSurveyReducer,
    surveyDetailReducer,
    adminLoginReducer,
    snackbarReducer,
    dashboardReducer,
  }),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
