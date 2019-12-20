import {
  SET_LOGIN,
  SET_PASSWORD_HELPER_TEXT,
  SET_USERNAME_HELPER_TEXT,
} from '../actions/adminLoginActions';

const initalState = {
  data: {
    id: '',
    username: '',
    password: '',
    auth: false,
    type: '',
  },
  usernameHelperText: '',
  passwordHelperText: '',
};

const adminLoginReducer = (state = initalState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, data: { ...state.data, ...payload } };
    case SET_USERNAME_HELPER_TEXT:
      return { ...state, usernameHelperText: payload.helperText };
    case SET_PASSWORD_HELPER_TEXT:
      return { ...state, passwordHelperText: payload.helperText };
    default:
      return state;
  }
};

export default adminLoginReducer;
