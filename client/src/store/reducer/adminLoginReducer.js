import { SET_LOGIN, SET_HELPER_TEXT } from '../actions/adminLoginActions';

const initalState = {
  data: {
    id: '',
    username: '',
    password: '',
    auth: false,
    type: '',
  },
  helperText: '',
};

const adminLoginReducer = (state = initalState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, data: { ...state.data, ...payload } };
    case SET_HELPER_TEXT:
      return { ...state, helperText: payload.helperText };
    default:
      return state;
  }
};

export default adminLoginReducer;
