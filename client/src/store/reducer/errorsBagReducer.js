const initialState = {};

const swapKeyValuesInObject = (obj, key1, key2) => {
  console.log('KEY1', key1);
  console.log('KEY2', key2);
  console.log('OBJECT', obj);

  [obj[key1], obj[key2]] = [obj[key2], obj[key1]];
  return obj;
};

const returnErrorsBagWithoutDeletedProperty = (state, key) => {
  if (state[key]) {
    delete state[key];
    return state;
  }
  return state;
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
