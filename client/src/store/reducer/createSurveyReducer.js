const defaultOption = {
  text: '',
};

const defaultQuestion = {
  title: '',
  type: 'text',
  required: false,
  commentsEnabled: false,
  options: [defaultOption],
};

const initalState = {
  title: undefined,
  description: undefined,
  recipients: [],
  disclaimer: 'This is the dummy disclaimer',
  anonymous: false,
  questions: [defaultQuestion],
  dateCreated: Date.now(),
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

const switchQuestions = (questions, firstIndex, secondIndex) => {
  const switchedQuestionList = [...questions];
  const elementToMove = switchedQuestionList[secondIndex];
  switchedQuestionList[secondIndex] = switchedQuestionList[firstIndex];
  switchedQuestionList[firstIndex] = elementToMove;
  return switchedQuestionList;
};

const switchOptions = (options, firstIndex, secondIndex) => {
  const switchedOptionsList = [...options];
  const elementToMove = switchedOptionsList[secondIndex];
  switchedOptionsList[secondIndex] = switchedOptionsList[firstIndex];
  switchedOptionsList[firstIndex] = elementToMove;
  return switchedOptionsList;
};

const objectWithoutKey = (obj, key) => {
  const newObj = { ...obj };
  delete newObj[key];
  return newObj;
};

const createSurveyReducer = (state = initalState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'SET_METADATA':
      return { ...state, ...payload };
    case 'NEW_QUESTION':
      return { ...state, questions: [...state.questions, defaultQuestion] };
    case 'SET_QUESTION_DATA':
      return {
        ...state,
        questions: state.questions.map((question, index) =>
          index === payload.index
            ? { ...question, ...objectWithoutKey(payload, 'index') }
            : question,
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
    case 'MOVE_QUESTION_UP':
      return {
        ...state,
        questions: switchQuestions(
          state.questions,
          payload.index,
          payload.index - 1,
        ),
      };
    case 'MOVE_QUESTION_DOWN':
      return {
        ...state,
        questions: switchQuestions(
          state.questions,
          payload.index,
          payload.index + 1,
        ),
      };
    case 'MOVE_OPTION_UP':
      return {
        ...state,
        questions: state.questions.map((question, index) =>
          index === payload.questionIndex
            ? {
                ...question,
                options: switchOptions(
                  question.options,
                  payload.optionIndex,
                  payload.optionIndex - 1,
                ),
              }
            : question,
        ),
      };
    case 'MOVE_OPTION_DOWN':
      return {
        ...state,
        questions: state.questions.map((question, index) =>
          index === payload.questionIndex
            ? {
                ...question,
                options: switchOptions(
                  question.options,
                  payload.optionIndex,
                  payload.optionIndex + 1,
                ),
              }
            : question,
        ),
      };
    default:
      return state;
  }
};

export default createSurveyReducer;
