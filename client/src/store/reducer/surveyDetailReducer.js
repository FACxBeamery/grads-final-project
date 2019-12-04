const initalState = {
  activeStep: 0,
};

const surveyDetailReducer = (state = initalState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'SET_METADATA':
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default surveyDetailReducer;
