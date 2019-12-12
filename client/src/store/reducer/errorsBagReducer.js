const initialState = {};

const errorsBagReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'RESET_ERRORS_BAG':
      return {};
    case 'ADD_ERROR':
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default errorsBagReducer;
