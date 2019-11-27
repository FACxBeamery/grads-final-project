const initalState = {
  title: '',
  description: '',
  recipients: [],
  disclaimer: 'This is the dummy disclaimer',
  anonymous: false,
  questions: [],
};

// setInputs({
// ...state.inputs,
// [e.target.name]: e.target.value
// })

const createSurverReducer = (state = initalState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'SET_METADATA':
      return { ...state, payload };
    default:
      return state;
  }
};

export default createSurverReducer;
