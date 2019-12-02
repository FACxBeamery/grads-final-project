import React from 'react';
import Snackbar from '../../components/Snackbar';

const initalState = (
  <Snackbar message='' variant='success' timeopened={Date.now()} />
);

const snackbarReducer = (state = initalState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'OPEN_SNACKBAR':
      return (
        <Snackbar
          message={payload.message}
          variant={payload.variant}
          timeopened={Date.now()}
        />
      );
    default:
      return state;
  }
};

export default snackbarReducer;
