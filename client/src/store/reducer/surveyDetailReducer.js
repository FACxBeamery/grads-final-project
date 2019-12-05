// import { SET_ACTIVE_STEP } from '../actions/surveyDetailActions';

const initalState = {
  surveyStatus: 0,
};

const surveyDetailReducer = (state = initalState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'SET_SURVEY_STATUS':
      return { ...state, surveyStatus: payload };

    default:
      return state;
  }
};

export default surveyDetailReducer;
