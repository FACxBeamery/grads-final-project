import React from 'react';
import Snackbar from '../../components/Snackbar';
import { UPDATE_SNACKBAR, SET_SNACKBAR_OPEN } from '../actions/snackbarActions';

const initalState = {
  // snackbar: <Snackbar message='' variant='success' timeopened={Date.now()} />,
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
        snackbar: (
          <Snackbar
            message={payload.message}
            variant={payload.variant}
            timeopened={Date.now()}
          />
        ),
      };
    case SET_SNACKBAR_OPEN:
      return { ...state, open: payload.open };
    default:
      return state;
  }
};

export default snackbarReducer;
