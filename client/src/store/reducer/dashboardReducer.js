const initalState = {
  surveys: [],
  showActiveSurveys: true,
  openDeleteSurveyModal: false,
  surveyToDeleteId: undefined,
  surveyToDeleteTitle: '',
};

const dashboardReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'RESET_DASHBOARD_STATE':
      return {
        surveys: [],
        showActiveSurveys: true,
      };
    case 'SWAP_VIEWS':
      return { ...state, showActiveSurveys: !state.showActiveSurveys };
    case 'SET_SURVEYS':
      return { ...state, surveys: action.payload };
    case 'TOGGLE_DELETE_SURVEY_MODAL':
      return { ...state, openDeleteSurveyModal: !state.openDeleteSurveyModal };
    case 'SET_DELETE_SURVEY_DATA':
      return {
        ...state,
        surveyToDeleteId: action.payload.id,
        surveyToDeleteTitle: action.payload.title,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
