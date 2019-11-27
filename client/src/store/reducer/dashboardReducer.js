const initalState = {
  surveys: [],
};

const dashboardReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'SET_SURVEYS':
      return { ...state, surveys: action.payload };
    default:
      return state;
  }
};

export default dashboardReducer;
