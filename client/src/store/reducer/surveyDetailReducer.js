const initalState = {
  activeStep: 1,
  successfulPublish: undefined,
  successfulClose: undefined,
  openExportModal: false,
  anonymousExport: false,
};

const getStatusStep = (status) => {
  const surveyStatusToIndex = { draft: 1, active: 2, closed: 3 };
  return surveyStatusToIndex[status];
};

const surveyDetailReducer = (state = initalState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'RESET_SURVEY_DETAIL_STATE':
      return {
        activeStep: 1,
        successfulPublish: undefined,
        successfulClose: undefined,
        openExportModal: false,
        anonymousExport: false,
      };
    case 'SET_SURVEY_DATA_SURVEY_DETAIL':
      return { ...state, ...payload };
    case 'SET_ACTIVE_STEP':
      return { ...state, activeStep: getStatusStep(state.status) };
    case 'SET_SUCCESSFUL_PUBLISH':
      return { ...state, successfulPublish: payload };
    case 'SET_SUCCESSFUL_CLOSE':
      return { ...state, successfulClose: payload };
    case 'TOGGLE_EXPORT_MODAL':
      return { ...state, openExportModal: !state.openExportModal };
    case 'TOGGLE_ANONYMOUS_EXPORT':
      return {
        ...state,
        anonymousExport: !state.anonymousExport,
      };
    default:
      return state;
  }
};

export default surveyDetailReducer;
