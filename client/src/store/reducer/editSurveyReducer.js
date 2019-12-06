const initalState = {
  openModal: false,
  modalStyle: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
  isConfirming: true,
};

const editSurveyReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'TOGGLE_ES_MODAL':
      return { ...state, openModal: !state.openModal };
    case 'TOGGLE_ES_CONFIRMATION_MODAL':
      return { ...state, isConfirming: !state.isConfirming };
    case 'RESET_ES_STATE':
      return {
        ...state,
        openModal: false,
        isConfirming: true,
      };
    default:
      return state;
  }
};

export default editSurveyReducer;
