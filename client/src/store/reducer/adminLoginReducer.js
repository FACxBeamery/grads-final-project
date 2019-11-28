const initalState = {
  id: '',
  username: '',
  password: '',
  auth: false,
  type: '',
};

const adminLoginReducer = (state = initalState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'SET_LOGIN':
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default adminLoginReducer;
