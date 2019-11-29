import React from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

const QuestionCard = () => {
  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );

  const dispatch = useDispatch();

  const MultichoiceQuestionOptions = () => {
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
    // const handleTextInput = (event) => {
    //   console.log(event.target.value);
    //   dispatch({
    //     type: 'SET_SURVEY',
    //     payload: {
    //       questionId: activeQuestion.id,
    //       answer: event.target.value,
    //       comment: null,
    //     },
    //   });
    // };
    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography>{activeQuestion.title}</Typography>
        <Box style={{ backgroundColor: '#E5E5E5' }}>
          <TextField
            margin='normal'
            //onChange={handleTextInput}
            required
            //value={responses}
            name='text-input-question'
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      {activeQuestion.type === 'multichoice' ? <MultichoiceQuestion /> : null}

      {activeQuestion.type === 'text' ? <TextQuestion /> : null}
    </Box>
  );
};
export default QuestionCard;
