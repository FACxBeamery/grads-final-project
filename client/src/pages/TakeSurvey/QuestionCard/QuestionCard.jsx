import React from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

const MultichoiceQuestionOptions = () => {
  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );
  const activeStep = useSelector((state) => state.takeSurveyReducer.activeStep);

  const currentAnswer = useSelector(
    (state) => state.takeSurveyReducer.answers[activeStep - 1].answer,
  );

  const dispatch = useDispatch();

  const handleButtonClick = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ENABLE_NEXT',
    });
    dispatch({
      type: 'ADD_RESPONSE',
      payload: {
        questionId: activeQuestion.id,
        answer: event.target.innerText,
        comment: null,
      },
    });
  };

  return activeQuestion.options.map((option) => {
    const buttonColor = currentAnswer
      ? currentAnswer.toLowerCase() === option.text
        ? '#201E5A'
        : '#e8e8e8'
      : '#e8e8e8';
    const buttonTextColor = currentAnswer
      ? currentAnswer.toLowerCase() === option.text
        ? '#fff'
        : 'black'
      : 'black';

    return (
      <Box mb={2}>
        <Button
          size='large'
          style={{
            backgroundColor: buttonColor,
            width: '40vw',
            color: buttonTextColor,
          }}
          value={option.text}
          key={option.text}
          onClick={handleButtonClick}
          margin='normal'
        >
          {option.text}
        </Button>
      </Box>
    );
  });
};

const MultichoiceQuestion = () => {
  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );
  return (
    <Box mt={4} display='flex' flexDirection='column' alignSelf='flex-start'>
      <Typography variant='h5'>{activeQuestion.title}</Typography>
      <Box mt={2} display='flex' flexDirection='column' alignItems='center'>
        <MultichoiceQuestionOptions />
      </Box>
    </Box>
  );
};

const TextQuestion = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.takeSurveyReducer.activeStep);
  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );

  const currentAnswerText = useSelector(
    (state) => state.takeSurveyReducer.answers[activeStep - 1].answer,
  );
  const handleTextInput = (event) => {
    dispatch({
      type: 'ENABLE_NEXT',
    });
    dispatch({
      type: 'ADD_RESPONSE',
      payload: {
        questionId: activeQuestion.id,
        answer: event.target.value,
        comment: null,
      },
    });
  };
  return (
    <Box mt={4} display='flex' flexDirection='column' alignSelf='flex-start'>
      <Typography variant='h5'>{activeQuestion.title}</Typography>
      <Box mt={2} key={activeStep}>
        <TextField
          autoFocus
          fullWidth
          required
          autoComplete='off'
          value={currentAnswerText}
          margin='normal'
          key={activeStep}
          name='text-input-question'
          onChange={handleTextInput}
        />
      </Box>
    </Box>
  );
};

const QuestionCard = () => {
  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );

  return (
    <Box alignSelf='center' justifyContent='center'>
      {activeQuestion.type === 'multichoice' ? <MultichoiceQuestion /> : null}

      {activeQuestion.type === 'text' ? <TextQuestion /> : null}
    </Box>
  );
};
export default QuestionCard;