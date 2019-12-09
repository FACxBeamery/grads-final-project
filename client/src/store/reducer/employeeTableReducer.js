/* eslint-disable no-underscore-dangle */
const initalState = {
  employeeData: undefined,
  filteredEmployeeData: undefined,
  filters: {
    department: {},
    office: {},
    name: '',
  },
  recipients: [],
  recipientIds: [],
  page: 0,
  rowsPerPage: 10,
};

const toggleSingleRecipient = (array, item) => {
  if (!array.includes(item)) {
    return [...array, item];
  }

  return array.filter((x) => x !== item);
};
const toggleRecipients = (array, checked, recipientsList) => {
  let updatedArray = [...array];
  if (checked) {
    recipientsList.forEach((item) => {
      if (!array.includes(item)) {
        updatedArray.push(item);
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
  // All attribute options is all the present values for e.g. department in the data
  const allAttributeOptions = employeeData.map((person) => person[attribute]);

  const uniqueAttributeOptions = [...new Set(allAttributeOptions)];

  // Returns an object with each option for that attribute (e.g. "engineering", "people") for department
  // Sets each value to false in this object as filtering has not occured yet
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
  const newCheckboxOptions = { ...attributeCheckboxOptions };
  Object.keys(newCheckboxOptions).forEach((key) => {
    newCheckboxOptions[key] = checked;
  });
  return newCheckboxOptions;
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

const checkAllTrueOrAllFalse = (object) => {
  const values = Object.values(object);
  return (
    values.every((item) => item === true) ||
    values.every((item) => item === false)
  );
};
const filterData = (filters, data, attribute) => {
  let filteredData;
  if (attribute === 'name') {
    filteredData = data.filter((element) =>
      checkNameMatches(element, filters.name.toLowerCase()),
    );
  } else {
    // filter by office
    if (!checkAllTrueOrAllFalse(filters.department)) {
      filteredData = data.filter((element) => {
        const elementOkay = filters.department[element.department];
        return elementOkay;
      });
    } else {
      filteredData = data;
    }
    if (!checkAllTrueOrAllFalse(filters.office)) {
      filteredData = filteredData.filter((element) => {
        const elementOkay = filters.office[element.office];
        return elementOkay;
      });
    }
  }
  return filteredData;
};

const employeeTableReducer = (state = initalState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'RESET_EMPLOYEE_DATA':
      return {
        employeeData: undefined,
        filteredEmployeeData: undefined,
        filters: {
          department: {},
          office: {},
          name: '',
        },
        recipients: [],
        recipientIds: [],
        page: 0,
        rowsPerPage: 10,
      };
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
    case 'SET_EMPLOYEE_TABLE_RECIPIENTS':
      return {
        ...state,
        recipients: payload,
        recipientIds: payload.map((obj) => obj.employeeId),
      };
    case 'CHANGE_PAGE':
      return { ...state, page: payload.page };

    case 'CHANGE_ROWS_PER_PAGE':
      return { ...state, rowsPerPage: payload.rowsPerPage };
    case 'TOGGLE_RECIPIENT':
      return {
        ...state,
        recipientIds: toggleSingleRecipient(state.recipientIds, payload.id),
      };
    case 'TOGGLE_FILTERED_RECIPIENTS':
      return {
        ...state,
        recipientIds: toggleRecipients(
          state.recipientIds,
          payload.checked,
          // eslint-disable-next-line no-underscore-dangle
          state.filteredEmployeeData.map((person) => person._id),
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
    case 'SET_FILTERED_EMPLOYEES_TO_RECIPIENTS':
      return {
        ...state,
        filteredEmployeeData: state.employeeData.filter((person) =>
          state.recipientIds.find(person._id),
        ),
      };
    default:
      return state;
  }
};

export default employeeTableReducer;
