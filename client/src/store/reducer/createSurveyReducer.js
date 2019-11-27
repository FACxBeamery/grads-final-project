const initalState = {
  title: '',
  description: '',
  recipients: [],
  disclaimer: 'This is the dummy disclaimer',
  anonymous: false,
  questions: [],
};

const changeOptionText = (options, payload) => {
  return options.map((option, index) =>
    index === payload.optionIndex ? { ...option, text: payload.text } : option,
  );
};

const deleteOption = (options, payload) => {
  return options.filter((option, index) => index !== payload.optionIndex);
};

const mappedQuestions = (questions, payload, editOptions) => {
  return questions.map((question, index) =>
    index === payload.questionIndex
      ? { ...question, options: editOptions(question.options, payload) }
      : question,
  );
};

const createSurverReducer = (state = initalState, action) => {
  const { payload } = action;
  const defaultQuestion = {
    title: '',
    type: 'text',
    required: false,
    commentsEnabled: false,
    options: [],
  };

  const defaultOption = {
    text: '',
  };

  switch (action.type) {
    case 'SET_METADATA':
      return { ...state, ...payload };
    case 'NEW_QUESTION':
      return { ...state, questions: [...state.questions, defaultQuestion] };
    case 'SET_QUESTION_DATA':
      return {
        ...state,
        questions: state.questions.map((question, index) =>
          index === payload.index ? { ...question, ...payload } : question,
        ),
      };
    case 'DELETE_QUESTION':
      return {
        ...state,
        questions: state.questions.filter(
          (question, index) => index !== payload.index,
        ),
      };
    case 'NEW_OPTION':
      return {
        ...state,
        questions: state.questions.map((question, index) =>
          index === payload.index
            ? { ...question, options: [...question.options, defaultOption] }
            : question,
        ),
      };
    case 'SET_OPTION_DATA':
      return {
        ...state,
        questions: mappedQuestions(state.questions, payload, changeOptionText),
      };
    case 'DELETE_OPTION':
      return {
        ...state,
        questions: mappedQuestions(state.questions, payload, deleteOption),
      };
    default:
      return state;
  }
};

export default createSurverReducer;
