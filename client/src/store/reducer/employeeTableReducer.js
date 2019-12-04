const initalState = {
  employeeData: undefined,
  filteredEmployeeData: undefined,
  filters: {
    department: {},
    office: {},
    name: '',
  },
  recipients: [],
  page: 0,
  rowsPerPage: 10,
};

const toggleSingleRecipient = (array, item) => {
  const itemIndex = array.indexOf(item);
  if (itemIndex === -1) {
    return [...array, item];
  }

  return array.filter((x) => x !== item);
};
const toggleRecipients = (array, checked, recipientsList) => {
  let updatedArray = [...array];
  if (checked) {
    recipientsList.forEach((item) => {
      const itemIndex = array.indexOf(item);
      if (itemIndex === -1) {
        updatedArray = [...updatedArray, item];
      }
    });
  } else {
    recipientsList.forEach((item) => {
      updatedArray = updatedArray.filter((x) => x !== item);
    });
  }
  return updatedArray;
};

const setInitialOptions = (employeeData, attribute) => {
  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const allAttributeOptions = employeeData.map((person) => person[attribute]);

  const uniqueAttributeOptions = allAttributeOptions.filter(onlyUnique);
  const attributeCheckboxOptions = {};
  uniqueAttributeOptions.forEach((option) => {
    attributeCheckboxOptions[option] = false;
  });
  return attributeCheckboxOptions;
};

const setOption = (currentFilters, checked, option, attribute) => {
  const updatedFilters = { ...currentFilters };
  updatedFilters[attribute][option] = checked;
  return updatedFilters;
};

const setAllOptions = (attributeCheckboxOptions, checked) => {
  const newOptionsArray = { ...attributeCheckboxOptions };
  Object.keys(newOptionsArray).forEach((key) => {
    newOptionsArray[key] = checked;
  });
  return newOptionsArray;
};

const setAllFilter = (currentFilters, checked, attribute) => {
  const updatedFilters = { ...currentFilters };
  updatedFilters[attribute] = setAllOptions(currentFilters[attribute], checked);
  return updatedFilters;
};

const checkNameMatches = (person, searchString) => {
  const allNames = [
    ...person.firstName.toLowerCase().split(' '),
    ...person.lastName.toLowerCase().split(' '),
  ];
  return allNames.some((name) => name.startsWith(searchString));
};
const filterData = (filters, data, attribute) => {
  let filteredData;
  if (attribute === 'name') {
    filteredData = data.filter((element) =>
      checkNameMatches(element, filters.name.toLowerCase()),
    );
  } else {
    filteredData = data.filter((element) => {
      const elementOkay = filters[attribute][element[attribute]];
      return elementOkay;
    });
  }
  return filteredData;
};

const employeeTableReducer = (state = initalState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'SET_EMPLOYEE_DATA':
      return { ...state, employeeData: payload };
    case 'SET_FILTERED_EMPLOYEE_DATA':
      return { ...state, filteredEmployeeData: payload };
    case 'FILTER_DATA':
      return {
        ...state,
        filteredEmployeeData: filterData(
          state.filters,
          state.employeeData,
          payload.attribute,
        ),
      };
    case 'CHANGE_PAGE':
      return { ...state, page: payload.page };

    case 'CHANGE_ROWS_PER_PAGE':
      return { ...state, rowsPerPage: payload.rowsPerPage };
    case 'TOGGLE_RECIPIENT':
      return {
        ...state,
        recipients: toggleSingleRecipient(state.recipients, payload.id),
      };
    case 'TOGGLE_FILTERED_RECIPIENTS':
      return {
        ...state,
        recipients: toggleRecipients(
          state.recipients,
          payload.checked,
          state.filteredEmployeeData.map((person) => person.id),
        ),
      };
    case 'SET_INTITAL_FILTER_OPTIONS':
      return {
        ...state,
        filters: {
          allEmployees: false,
          department: setInitialOptions(state.employeeData, 'department'),
          office: setInitialOptions(state.employeeData, 'office'),
        },
      };
    case 'SET_FILTER_OPTION':
      return {
        ...state,
        filters: setOption(
          state.filters,
          payload.checked,
          payload.option,
          payload.attribute,
        ),
      };
    case 'SET_ALL_FILTER':
      return {
        ...state,
        filters: setAllFilter(
          state.filters,
          payload.checked,
          payload.attribute,
        ),
      };
    case 'SET_SEARCHBAR_TEXT':
      return {
        ...state,
        filters: { ...state.filters, name: payload.text },
      };
    default:
      return state;
  }
};

export default employeeTableReducer;
