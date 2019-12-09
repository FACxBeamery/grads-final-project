const initalState = {
  activeStep: 0,
  survey: [],
  questions: [],
  activeQuestion: 'start',
  answers: [],
  enableNext: true,
  responseSubmission: false,
};

const setActiveQuestion = (step, questions) => {
  const startSurveyPage = step === 0;
  const submitSurveyPage = step === questions.length + 1;
  if (startSurveyPage) {
    return 'start';
  }
  if (submitSurveyPage) {
    return 'end';
  }
  return questions[step - 1];
};

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
        activeQuestion: setActiveQuestion(state.activeStep, state.questions),
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
      console.log(state.answers);
      return {
        ...state,
        answers: state.answers.map((response) =>
          response.questionId === action.payload.questionId
            ? {
                ...response,
                answer: action.payload.answer,
              }
            : {
                ...response,
              },
        ),
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        answers: state.answers.map((response) =>
          response.questionId === action.payload.questionId
            ? {
                ...response,
                comment: action.payload.comment,
              }
            : response,
        ),
      };
    case 'SET_INITIAL_ANSWERS':
      return {
        ...state,
        answers: state.questions.map((question) => {
          return {
            questionId: question._id,
            answer: '',
            comment: '',
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

    case 'RESPONSE_SUBMISSION':
      return {
        ...state,

        responseSubmission: true,
      };

    default:
      return state;
  }
};

export default takeSurveyReducer;
