import { createStore, combineReducers } from 'redux';
import reducer from './reducer/reducer';

import takeSurveyReducer from './reducer/takeSurveyReducer';
import createSurveyReducer from './reducer/createSurveyReducer';

const store = createStore(
  combineReducers({ reducer, takeSurveyReducer, createSurveyReducer }),
);

export default store;
