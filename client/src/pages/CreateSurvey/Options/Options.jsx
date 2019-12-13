import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from '@material-ui/core';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';

const Option = ({ optionIndex, questionIndex }) => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.createSurveyReducer);
  const errors = useSelector((state) => state.errorsBagReducer);

  const { options } = questions[questionIndex];
  const text = options[optionIndex];

  const setOptionText = (event, optionTextIdentifier) => {
    const optionTextIsBiggerThanMaxValue =
      event.target.value && event.target.value.length > 280;
    const optionTextIsSmallerThanMinValue =
      event.target.value && event.target.value.length < 2;
    const optionTextIsEmpty = event.target.value === '';
    if (
      optionTextIsBiggerThanMaxValue ||
      optionTextIsSmallerThanMinValue ||
      optionTextIsEmpty
    ) {
      dispatch({
        type: 'ADD_ERROR',
        payload: { [optionTextIdentifier]: true },
      });
    } else {
      dispatch({
        type: 'ADD_ERROR',
        payload: { ...errors, [optionTextIdentifier]: false },
      });
    }
    const payload = { questionIndex, optionIndex, text: event.target.value };
    dispatch({ type: 'SET_OPTION_DATA', payload });
  };

  const handleDeleteOption = () => {
    const payload = {};
    payload.questionIndex = questionIndex;
    payload.optionIndex = optionIndex;
    dispatch({ type: 'DELETE_OPTION', payload });
    dispatch({
      type: 'REMOVE_ERROR',
      payload: `${questionIndex}${optionIndex}`,
    });
  };

  const handleUpClick = () => {
    const payload = {};
    payload.questionIndex = questionIndex;
    payload.optionIndex = optionIndex;

    dispatch({ type: 'MOVE_OPTION_UP', payload });
    dispatch({
      type: 'SWAP_ERRORS',
      payload: [
        `${questionIndex}${optionIndex}`,
        `${questionIndex}${optionIndex - 1}`,
      ],
    });
  };

  const handleDownClick = () => {
    const payload = {};
    payload.questionIndex = questionIndex;
    payload.optionIndex = optionIndex;
    dispatch({ type: 'MOVE_OPTION_DOWN', payload });
    dispatch({
      type: 'SWAP_ERRORS',
      payload: [
        `${questionIndex}${optionIndex}`,
        `${questionIndex}${optionIndex + 1}`,
      ],
    });
  };

  const isNotFirstQuestion = optionIndex !== 0;
  const isNotLastQuestion = options.length - 1 !== optionIndex;
  const optionTextIsBiggerThanMaxValue = text && text.length > 280;
  const optionTextIsSmallerThanMinValue = text && text.length < 2;
  const optionTextIsEmpty = text === '';

  const setOptionTextAndRefreshErrorsBag = (e) =>
    setOptionText(e, `${questionIndex}${optionIndex}`);

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
      <Box
        flex={1}
        display='flex'
        flexDirection='column'
        style={{ backgroundColor: '#e8e8e8' }}
        mb={2}
        p={2}
      >
        <TextField
          fullWidth
          required
          label='Answer text'
          value={text || ''}
          name='text'
          onChange={setOptionTextAndRefreshErrorsBag}
          error={Boolean(
            optionTextIsBiggerThanMaxValue ||
              optionTextIsSmallerThanMinValue ||
              optionTextIsEmpty,
          )}
          helperText={
            (optionTextIsBiggerThanMaxValue &&
              `This field must be less than 280 characters!`) ||
            (optionTextIsSmallerThanMinValue &&
              `This field must be more than 2 characters!`) ||
            (optionTextIsEmpty && `This field is required.`)
          }
        />
        <Box alignSelf='flex-end'>
          <Button type='button' color='secondary' onClick={handleDeleteOption}>
            DELETE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

Option.propTypes = {
  optionIndex: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
};

const Options = ({ questionIndex }) => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.createSurveyReducer);
  const { options } = questions[questionIndex];

  const handleNewOptionClick = () => {
    const payload = {};
    payload.index = questionIndex;
    dispatch({ type: 'NEW_OPTION', payload });
  };

  if (options.length < 1) {
    handleNewOptionClick();
  }

  return (
    <Box display='flex' justifyContent='flex-end'>
      <Box mr={4}>
        <Typography variant='h6'>ANSWERS:</Typography>
      </Box>
      <Box display='flex' flexDirection='column' flexGrow={0.8}>
        {options.map((option, optionIndex) => {
          return (
            <Option
              // eslint-disable-next-line react/no-array-index-key
              key={optionIndex}
              optionIndex={optionIndex}
              questionIndex={questionIndex}
            />
          );
        })}
        <Box alignSelf='flex-end'>
          <Button
            type='button'
            variant='outlined'
            color='secondary'
            onClick={handleNewOptionClick}
          >
            Add answer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

Options.propTypes = {
  questionIndex: PropTypes.number.isRequired,
};

export default Options;
