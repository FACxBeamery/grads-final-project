const defaultOption = '';

const defaultQuestion = {
  title: '',
  type: 'text',
  required: false,
  commentEnabled: false,
  options: [defaultOption],
};

const initalState = {
  title: undefined,
  description: undefined,
  recipients: [],
  disclaimer: 'This is the dummy disclaimer',
  anonymous: false,
  questions: [defaultQuestion],
  openModal: false,
  dateCreated: Date.now(),
  openCreateSurveyModal: false,
  modalStyle: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
  isConfirming: true,
};

const changeOptionText = (options, payload) => {
  return options.map((option, index) =>
    index === payload.optionIndex ? payload.text : option,
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

const switchArrayItems = (array, firstIndex, secondIndex) => {
  const switchedList = [...array];
  const elementToMove = switchedList[secondIndex];
  switchedList[secondIndex] = switchedList[firstIndex];
  switchedList[firstIndex] = elementToMove;
  return switchedList;
};

const objectWithoutKey = (obj, key) => {
  const newObj = { ...obj };
  delete newObj[key];
  return newObj;
};

const createSurveyReducer = (state = initalState, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'TOGGLE_MODAL':
      return { ...state, openModal: !state.openModal };
    case 'SET_SURVEY_DATA':
      return { ...state, ...payload };

    case 'SET_SURVEY_DATA_FROM_TEMPLATE':
      return {
        ...state,
        ...payload,
        title: `COPY FROM - ${payload.title}`,
        responses: [],
        dateCreated: Date.now(),
        dateEdited: undefined,
        dateToPublish: undefined,
        datePublished: undefined,
        dateToClose: undefined,
        dateClosed: undefined,
      };
    case 'TOGGLE_CREATE_SURVEY_MODAL':
      return { ...state, openCreateSurveyModal: !state.openCreateSurveyModal };
    case 'TOGGLE_CREATE_SURVEY_CONFIRMATION_MODAL':
      return { ...state, isConfirming: !state.isConfirming };
    case 'RESET_CREATE_SURVEY_MODAL_STATE':
      return {
        ...state,
        openCreateSurveyModal: false,
        isConfirming: true,
      };
    case 'RESET_SURVEY_DATA':
      return {
        ...state,
        title: undefined,
        description: undefined,
        recipients: [],
        disclaimer: 'This is the dummy disclaimer',
        anonymous: false,
        questions: [
          {
            title: '',
            type: 'text',
            required: false,
            commentEnabled: false,
            options: [''],
          },
        ],
        dateCreated: Date.now(),
        dateEdited: undefined,
        dateToPublish: undefined,
        datePublished: undefined,
        dateToClose: undefined,
        dateClosed: undefined,
      };
    case 'SET_METADATA':
      return { ...state, ...payload };
    case 'SET_EMPLOYEE_DATA':
      return { ...state, employeeData: payload };
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
        questions: switchArrayItems(
          state.questions,
          payload.index,
          payload.index - 1,
        ),
      };
    case 'MOVE_QUESTION_DOWN':
      return {
        ...state,
        questions: switchArrayItems(
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
                options: switchArrayItems(
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
                options: switchArrayItems(
                  question.options,
                  payload.optionIndex,
                  payload.optionIndex + 1,
                ),
              }
            : question,
        ),
      };
    case 'SAVE_RECIPIENTS':
      return { ...state, recipientIds: payload.recipients };
    default:
      return state;
  }
};

export default createSurveyReducer;
