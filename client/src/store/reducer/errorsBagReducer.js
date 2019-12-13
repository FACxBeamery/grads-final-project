const initialState = {};

const swapKeyValuesInObject = (obj, key1, key2) => {
  const objectToSwapValues = {};
  [objectToSwapValues[key1], objectToSwapValues[key2]] = [
    objectToSwapValues[key2],
    objectToSwapValues[key1],
  ];
  return objectToSwapValues;
};

const returnErrorsBagWithoutDeletedProperty = (state, key) => {
  const updatedState = {};
  if (updatedState[key]) {
    delete updatedState[key];
    return updatedState;
  }
  return updatedState;
};

const returnErrorsBagWithTwoSwappedValues = (state, indices) => {
  return swapKeyValuesInObject(state, indices[0], indices[1]);
};

const errorsBagReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'RESET_ERRORS_BAG':
      return {};
    case 'ADD_ERROR':
      return { ...state, ...payload };
    case 'REMOVE_ERROR':
      return returnErrorsBagWithoutDeletedProperty(state, payload);
    case 'SWAP_ERRORS':
      return returnErrorsBagWithTwoSwappedValues(state, payload);
    default:
      return state;
  }
};

export default errorsBagReducer;
