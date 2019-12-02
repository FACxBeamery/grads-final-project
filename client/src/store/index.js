import { createStore, combineReducers } from 'redux';

import reducer from './reducer/reducer';

import takeSurveyReducer from './reducer/takeSurveyReducer';
import createSurveyReducer from './reducer/createSurveyReducer';
import dashboardReducer from './reducer/dashboardReducer';

const store = createStore(
  combineReducers({
    reducer,
    createSurveyReducer,
    dashboardReducer,
    takeSurveyReducer,
  }),
);

export default store;
