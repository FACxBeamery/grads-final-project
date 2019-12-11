const initalState = {
  surveys: [],
  showActiveSurveys: true,
  openSplitButton: false,
  selectedIndex: 0,
  options: ['Create Survey', 'Create From Template'],
};

const dashboardReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'RESET_DASHBOARD_STATE':
      return {
        surveys: [],
        showActiveSurveys: true,
        openSplitButton: false,
        selectedIndex: 1,
      };
    case 'SWAP_VIEWS':
      return { ...state, showActiveSurveys: !state.showActiveSurveys };
    case 'SET_SURVEYS':
      return { ...state, surveys: action.payload };
    case 'TOGGLE_SPLIT_BUTTON':
      return { ...state, openSplitButton: !state.openSplitButton };
    case 'SET_ACTIVE_INDEX':
      return { ...state, selectedIndex: action.payload };
    default:
      return state;
  }
};

export default dashboardReducer;
