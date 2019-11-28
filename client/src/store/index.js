import { createStore, combineReducers } from 'redux';

import reducer from './reducer/reducer';
import createSurveyReducer from './reducer/createSurveyReducer';
import dashboardReducer from './reducer/dashboardReducer';

const store = createStore(
  combineReducers({ reducer, createSurveyReducer, dashboardReducer }),
);

export default store;
