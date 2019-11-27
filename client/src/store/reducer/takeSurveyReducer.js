const initalState = {
  activeStep: 0,
};

const takeSurveyReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        activeStep: state.activeStep + 1,
      };
    case 'PREVIOUS_STEP':
      return {
        activeStep: state.activeStep - 1,
      };

    default:
      return state;
  }
};

export default takeSurveyReducer;

// const createSurverReducer = (state = initalState, action) => {
//   const { payload } = action;
//   // TODO remove position
//   const defaultQuestion = {
//     position: state.questions.length,
//     title: '',
//     type: 'text',
//     required: false,
//     commentsEnabled: false,
//     options: [],
//   };
//   const defaultOption = {
//     text: '',
//   };
//   switch (action.type) {
//     case 'SET_METADATA':
//       console.log(state);
//       return { ...state, ...payload };
//     case 'NEW_QUESTION':
//       console.log(state);
//       return { ...state, questions: [...state.questions, defaultQuestion] };
//     case 'SET_QUESTION_DATA':
//       console.log(state);
//       return {
//         ...state,
//         questions: state.questions.map((question, index) =>
//           index === payload.index ? { ...question, ...payload } : question,
//         ),
//       };
//     case 'DELETE_QUESTION':
//       return {
//         ...state,
//         questions: state.questions.filter(
//           (question, index) => index !== payload.index,
//         ),
//       };
//     case 'NEW_OPTION':
//       return {
//         ...state,
//         questions: state.questions.map((question, index) =>
//           index === payload.index
//             ? { ...question, options: [...question.options, defaultOption] }
//             : question,
//         ),
//       };
//     case 'SET_OPTION_DATA':
//       return {
//         ...state,
//         questions: state.questions.map((question, index) =>
//           index === payload.questionIndex
//             ? {
//                 ...question,
//                 options: question.options.map((option, index) =>
//                   index === payload.optionIndex
//                     ? { ...option, text: payload.text }
//                     : option,
//                 ),
//               }
//             : question,
//         ),
//       };
//       case 'DELETE_OPTION':
//           return {
//               ...state, questions: state.questions.map((question, index) => index === payload.questionIndex ? )
//           }
//     default:
//       return state;
//   }
// };
// export default createSurverReducer;
