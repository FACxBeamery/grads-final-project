import { createStore, combineReducers } from 'redux';

import reducer from './reducer/reducer';
import createSurveyReducer from './reducer/createSurveyReducer';
import dashboardReducer from './reducer/dashboardReducer';
import employeeTableReducer from './reducer/employeeTableReducer';
const store = createStore(
  combineReducers({
    reducer,
    createSurveyReducer,
    dashboardReducer,
    employeeTableReducer,
  }),
);

export default store;
