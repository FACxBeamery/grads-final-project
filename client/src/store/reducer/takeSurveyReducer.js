const initalState = {
  activeStep: 0,
  survey: [],
  questions: [],
  activeQuestion: 'start',
  answers: [],
  enableNext: true,
};

// [e5e5e5,e5e5e55, ]
const takeSurveyReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        activeStep: state.activeStep + 1,
      };
    case 'PREVIOUS_STEP':
      return {
        ...state,
        activeStep: state.activeStep - 1,
      };
    case 'SET_SURVEY':
      return { ...state, survey: action.payload };

    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };

    case 'SET_ACTIVE_QUESTION':
      return {
        ...state,
        activeQuestion:
          state.activeStep === 0
            ? 'start'
            : state.activeStep === state.questions.length + 1
            ? 'end'
            : state.questions[state.activeStep - 1],
      };

    case 'NEXT_QUESTION':
      return {
        ...state,
        activeQuestion: state.activeQuestion + 1,
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        activeQuestion: state.activeQuestion - 1,
      };

    case 'ADD_RESPONSE':
      return {
        ...state,
        answers: state.answers.map((response) =>
          response.questionId === action.payload.questionId
            ? { ...response, answer: action.payload.answer }
            : response,
        ),
      };
    case 'SET_INITIAL_ANSWERS':
      return {
        ...state,
        answers: state.questions.map((question) => {
          return {
            questionId: question.id,
            answer: null,
          };
        }),
      };

    case 'ENABLE_NEXT':
      return {
        ...state,

        enableNext: true,
      };
    case 'DISABLE_NEXT':
      return {
        ...state,

        enableNext: false,
      };

    default:
      return state;
  }
};

export default takeSurveyReducer;
