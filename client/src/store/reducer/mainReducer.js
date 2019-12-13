import { CHECKING_IF_AUTHED } from '../actions/mainActions';

const initalState = {
  checkingIfAuthed: true,
};

const mainReducer = (state = initalState, action) => {
  const { payload } = action;
  switch (action.type) {
    case CHECKING_IF_AUTHED:
      return { checkingIfAuthed: payload.checkingIfAuthed };
    default:
      return state;
  }
};

export default mainReducer;
