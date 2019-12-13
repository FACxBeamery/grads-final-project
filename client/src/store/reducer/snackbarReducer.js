import { UPDATE_SNACKBAR, SET_SNACKBAR_OPEN } from '../actions/snackbarActions';

const initalState = {
  snackbar: {
    message: '',
    variant: 'success',
    timeOpened: Date.now(),
  },
  open: false,
};

const snackbarReducer = (state = initalState, action) => {
  const { payload } = action;
  switch (action.type) {
    case UPDATE_SNACKBAR:
      return {
        ...state,
        ...payload,
        snackbar: { ...state.snackbar, ...payload.snackbar },
      };
    case SET_SNACKBAR_OPEN:
      return { ...state, open: payload.open };
    default:
      return state;
  }
};

export default snackbarReducer;
