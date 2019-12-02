import { createStore, combineReducers } from 'redux';

import reducer from './reducer/reducer';
import createSurveyReducer from './reducer/createSurveyReducer';
import dashboardReducer from './reducer/dashboardReducer';
import adminLoginReducer from './reducer/adminLoginReducer';
import snackbarReducer from './reducer/snackbarReducer';

const store = createStore(
  combineReducers({
    reducer,
    createSurveyReducer,
    adminLoginReducer,
    snackbarReducer,
    dashboardReducer,
  }),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
