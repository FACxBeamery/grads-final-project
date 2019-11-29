import React from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

const MultichoiceQuestionOptions = () => {
  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );

  const dispatch = useDispatch();
  const handleButtonClick = (event) => {
    event.preventDefault();

    console.log(event.target.innerText);
    dispatch({
      type: 'ADD_RESPONSE',
      payload: {
        questionId: activeQuestion.id,
        answer: event.target.innerText,
        comment: null,
      },
    });
  };
  return activeQuestion.options.map((option) => (
    <Button
      style={{ backgroundColor: '#E5E5E5' }}
      value={option.text}
      key={option.text}
      onClick={handleButtonClick}
    >
      {option.text}
    </Button>
  ));
};

const MultichoiceQuestion = () => {
  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );
  return (
    <Box>
      <Typography>{activeQuestion.title}</Typography>
      <Box display='flex' flexDirection='column' alignItems='center'>
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
  console.log(activeStep, 'ACTIVE STEP');

  const currentAnswerText = useSelector(
    (state) => state.takeSurveyReducer.answers[activeStep - 1].answer,
  );
  const handleTextInput = (event) => {
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
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Typography>{activeQuestion.title}</Typography>
      <Box style={{ backgroundColor: '#E5E5E5' }} key={activeStep}>
        <TextField
          value={currentAnswerText}
          margin='normal'
          key={activeStep}
          required
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
    <Box>
      {activeQuestion.type === 'multichoice' ? <MultichoiceQuestion /> : null}

      {activeQuestion.type === 'text' ? <TextQuestion /> : null}
    </Box>
  );
};
export default QuestionCard;
