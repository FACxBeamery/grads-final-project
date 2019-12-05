// import { SET_ACTIVE_STEP } from '../actions/surveyDetailActions';

const initalState = {
  activeStep: 0,
};

const surveyDetailReducer = (state = initalState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'SET_ACTIVE_STEP':
      return { ...state, activeStep: payload };

    default:
      return state;
  }
};

export default surveyDetailReducer;
