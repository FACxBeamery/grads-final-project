import React from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

const CommentBox = () => {
  const dispatch = useDispatch();
  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );
  const activeStep = useSelector((state) => state.takeSurveyReducer.activeStep);
  const currentCommentText = useSelector(
    (state) => state.takeSurveyReducer.answers[activeStep - 1].comment,
  );
  const handleComment = (event) => {
    dispatch({
      type: 'ADD_COMMENT',
      payload: {
        questionId: activeQuestion.id,
        comment: event.target.value,
      },
    });
  };
  return (
    <Box mt={4} display='flex' flexDirection='column' alignSelf='flex-start'>
      <Typography variant='h5'>Add a Comment (optional)</Typography>
      <Box mt={2}>
        <TextField
          data-testid='comment-box'
          autoFocus
          fullWidth
          required
          autoComplete='off'
          value={currentCommentText}
          margin='normal'
          key={activeStep}
          name='comment-text-box'
          onChange={handleComment}
        />
      </Box>
    </Box>
  );
};

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
      },
    });
  };

  return activeQuestion.options.map((option) => {
    const isAnswerSelected =
      currentAnswer && currentAnswer.toLowerCase() === option.text;
    const buttonColor = isAnswerSelected && '#201E5A';

    const buttonTextColor = isAnswerSelected && '#fff';

    return (
      <Box mb={2} key={option.text}>
        <Button
          size='large'
          style={{
            backgroundColor: buttonColor,
            width: '40vw',
            color: buttonTextColor,
          }}
          data-testid={option.text}
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
  const activeStep = useSelector((state) => state.takeSurveyReducer.activeStep);

  const currentAnswer = useSelector(
    (state) => state.takeSurveyReducer.answers[activeStep - 1].answer,
  );

  return (
    <Box mt={4} display='flex' flexDirection='column' alignSelf='flex-start'>
      <Typography variant='h5'>{activeQuestion.title}</Typography>
      <Box mt={2} display='flex' flexDirection='column' alignItems='center'>
        <MultichoiceQuestionOptions />
      </Box>

      {currentAnswer && <CommentBox />}
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
          data-testid='text-question'
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
    <Box alignSelf='center' data-testid='question-card' justifyContent='center'>
      {activeQuestion.type === 'multichoice' ? <MultichoiceQuestion /> : null}

      {activeQuestion.type === 'text' ? <TextQuestion /> : null}
    </Box>
  );
};
export default QuestionCard;
