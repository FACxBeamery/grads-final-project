const initalState = {
  surveys: [],
  showActiveSurveys: true,
};

const dashboardReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'SWAP_VIEWS':
      return { ...state, showActiveSurveys: !state.showActiveSurveys };
    case 'SET_SURVEYS':
      return { ...state, surveys: action.payload };
    default:
      return state;
  }
};

export default dashboardReducer;
