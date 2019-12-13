/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Checkbox,
  Box,
  FormControlLabel,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Delete, ArrowUpward, ArrowDownward } from '@material-ui/icons';
import Options from '../Options/Options';

const Question = ({ questionIndex }) => {
  const { title, type, required, commentEnabled } = useSelector(
    (state) => state.createSurveyReducer.questions[questionIndex],
  );
  const { questions } = useSelector((state) => state.createSurveyReducer);
  const errors = useSelector((state) => state.errorsBagReducer);
  const dispatch = useDispatch();

  const setQuestionData = (
    event,
    inputType,
    name,
    value,
    min,
    max,
    questionIdentifier,
  ) => {
    event.persist();

    if (inputType === 'text') {
      const questionTitleIsBiggerThanMaxValue =
        event.target.value && event.target.value.length > max;
      const questionTitleIsSmallerThanMinValue =
        event.target.value && event.target.value.length < min;
      const questionTitleIsEmpty = event.target.value === '';
      if (
        questionTitleIsBiggerThanMaxValue ||
        questionTitleIsSmallerThanMinValue ||
        questionTitleIsEmpty
      ) {
        dispatch({
          type: 'ADD_ERROR',
          payload: { [questionIdentifier]: true },
        });
      } else {
        dispatch({
          type: 'ADD_ERROR',
          payload: { ...errors, [questionIdentifier]: false },
        });
      }
    }
    const payload = {};
    payload.index = questionIndex;
    payload[event.target.name] =
      inputType === 'checkbox' ? event.target.checked : event.target.value;
    dispatch({ type: 'SET_QUESTION_DATA', payload });
  };

  const handleDeleteQuestion = () => {
    const payload = {};
    payload.index = questionIndex;
    dispatch({ type: 'DELETE_QUESTION', payload });
    dispatch({
      type: 'REMOVE_ERROR',
      payload: `question${questionIndex}`,
    });
  };

  const handleUpClick = () => {
    const payload = {};
    payload.index = questionIndex;
    dispatch({ type: 'MOVE_QUESTION_UP', payload });
    dispatch({
      type: 'SWAP_ERRORS',
      payload: [`question${questionIndex}`, `question${questionIndex - 1}`],
    });
  };

  const handleDownClick = () => {
    const payload = {};
    payload.index = questionIndex;
    dispatch({ type: 'MOVE_QUESTION_DOWN', payload });
    dispatch({
      type: 'SWAP_ERRORS',
      payload: [`question${questionIndex}`, `question${questionIndex + 1}`],
    });
  };

  const isNotFirstQuestion = questionIndex !== 0;
  const isNotLastQuestion = questions.length - 1 !== questionIndex;
  const questionTitleIsBiggerThanMaxValue = title && title.length > 280;
  const questionTitleIsSmallerThanMinValue = title && title.length < 2;
  const questionTitleIsEmpty = title === '';

  const setQuestionTitleAndRefreshErrorsBag = (e) =>
    setQuestionData(
      e,
      'text',
      'title',
      title,
      2,
      280,
      `question${questionIndex}`,
    );

  return (
    <Box display='flex'>
      <Box
        py={4}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        {isNotFirstQuestion ? (
          <IconButton onClick={handleUpClick}>
            <ArrowUpward />
          </IconButton>
        ) : (
          <IconButton />
        )}
        {isNotLastQuestion ? (
          <IconButton onClick={handleDownClick}>
            <ArrowDownward />
          </IconButton>
        ) : (
          <IconButton />
        )}
      </Box>
      <Box my={2} p={2} style={{ backgroundColor: '#fafafa' }} flex={1}>
        <Box
          display='flex'
          justifyContent='space-around'
          alignItems='flex-start'
        >
          <Box flex={1} mb={2}>
            {/* QUESTION NUMBER */}
            <Typography variant='h4'>{`Q${questionIndex + 1}`}</Typography>
            {/*  QUESTION TITLE */}

            <TextField
              fullWidth
              required
              error={Boolean(
                questionTitleIsBiggerThanMaxValue ||
                  questionTitleIsSmallerThanMinValue ||
                  questionTitleIsEmpty,
              )}
              helperText={
                (questionTitleIsBiggerThanMaxValue &&
                  `Question title must be less than 280 characters!`) ||
                (questionTitleIsSmallerThanMinValue &&
                  `Question title must be more than 2 characters!`) ||
                (questionTitleIsEmpty && `Question title is required.`)
              }
              value={title || ''}
              name='title'
              label='Question'
              onChange={setQuestionTitleAndRefreshErrorsBag}

              // eslint-disable-next-line react/jsx-curly-newline
            />
          </Box>
          <Box justifySelf='flex-end'>
            <Button
              type='button'
              color='secondary'
              onClick={handleDeleteQuestion}
              startIcon={<Delete />}
            >
              Delete question
            </Button>
          </Box>
        </Box>

        {/*  CHECKBOXES DIV */}
        <Box
          display='flex'
          alignSelf='center'
          justifyContent='space-around'
          alignItems='flex-end'
          mb={4}
        >
          {/*  QUESTION TYPE SELECT */}
          <Box mr={8}>
            <FormControl>
              <InputLabel id='question-type-select'>Type:</InputLabel>
              <Select
                labelid='question-type-select'
                id='question-type-select'
                value={type || ''}
                onChange={setQuestionData}
                name='type'
                inputProps={{
                  'data-testid': 'select-id',
                }}
              >
                <MenuItem value='text'>Text</MenuItem>
                <MenuItem value='multichoice'>Multichoice</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/*  QUESTION REQUIRED CHECKBOX */}
          <Box mr={4}>
            <FormControlLabel
              label='Required'
              control={
                <Checkbox
                  checked={required}
                  onChange={(e) => setQuestionData(e, 'checkbox')}
                  value='required'
                  name='required'
                  labelid='question-required-checkbox'
                  inputProps={{
                    'aria-label': 'Question required?',
                  }}
                />
              }
            />
          </Box>
          {/*  COMMENTS ENABLED CHECKBOX */}
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={commentEnabled}
                  onChange={(e) => setQuestionData(e, 'checkbox')}
                  value='commentEnabled'
                  name='commentEnabled'
                  labelid='comments-enabled-checkbox'
                  inputProps={{
                    'aria-label': 'Allow comments: ',
                  }}
                />
              }
              label='Allow Comments'
            />
          </Box>
        </Box>

        {type === 'multichoice' && <Options questionIndex={questionIndex} />}
      </Box>
    </Box>
  );
};

Question.propTypes = {
  questionIndex: PropTypes.number.isRequired,
};

export default Question;
