/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box } from '@material-ui/core';
import Question from './Question';

const QuestionsList = () => {
  const dispatch = useDispatch();
  const handleNewQuestionClick = () => {
    dispatch({ type: 'NEW_QUESTION' });
  };
  const { questions } = useSelector((state) => state.createSurveyReducer);

  if (questions.length < 1) {
    handleNewQuestionClick();
  }

  return (
    <Box mx={4} my={2} display='flex' flexDirection='column'>
      {questions.map((question, questionIndex) => {
        return (
          <Question
            // eslint-disable-next-line react/no-array-index-key
            key={questionIndex}
            question={question}
            questionIndex={questionIndex}
          />
        );
      })}
      <Box alignSelf='flex-start' my={2}>
        <Button
          type='button'
          variant='outlined'
          color='secondary'
          onClick={handleNewQuestionClick}
        >
          Add question
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionsList;
