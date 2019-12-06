// import { SET_ACTIVE_STEP } from '../actions/surveyDetailActions';

const initalState = {
  activeStep: 1,
  successfulPublish: undefined,
  successfulClose: undefined,
};

const getStatusStep = (status) => {
  const surveyStatusToIndex = { draft: 1, published: 2, closed: 3 };
  return surveyStatusToIndex[status];
};

const surveyDetailReducer = (state = initalState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'SET_SURVEY_DATA_SURVEY_DETAIL':
      return { ...state, ...payload };
    case 'SET_ACTIVE_STEP':
      return { ...state, activeStep: getStatusStep(state.status) };
    case 'SET_SUCCESSFUL_PUBLISH':
      return { ...state, successfulPublish: payload };
    case 'SET_SUCCESSFUL_CLOSE':
      return { ...state, successfulClose: payload };
    default:
      return state;
  }
};

export default surveyDetailReducer;