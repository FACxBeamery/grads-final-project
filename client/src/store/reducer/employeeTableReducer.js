const initalState = {
  employeeData: undefined,
  page: 0,
  rowsPerPage: 5,
  selected: [],
};

const employeeTableReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'SET_EMPLOYEE_DATA':
      return { ...state, employeeData: action.payload };
    default:
      return state;
  }
};

export default employeeTableReducer;
