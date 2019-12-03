const initalState = {
  employeeData: undefined,
  page: 0,
  totalRows: undefined,
  rowsPerPage: 5,
};

const employeeTableReducer = (state = initalState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'SET_EMPLOYEE_DATA':
      return { ...state, employeeData: payload };
    case 'CHANGE_PAGE':
      return { ...state, page: payload.page };
    default:
      return state;
  }
};

export default employeeTableReducer;
