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

  const { options } = questions[questionIndex];
  const { text } = options[optionIndex];

  const setOptionText = (event) => {
    const payload = { questionIndex, optionIndex, text: event.target.value };
    dispatch({ type: 'SET_OPTION_DATA', payload });
  };

  const handleDeleteOption = () => {
    const payload = {};
    payload.questionIndex = questionIndex;
    payload.optionIndex = optionIndex;
    dispatch({ type: 'DELETE_OPTION', payload });
  };

  const handleUpClick = () => {
    const payload = {};
    payload.questionIndex = questionIndex;
    payload.optionIndex = optionIndex;

    dispatch({ type: 'MOVE_OPTION_UP', payload });
  };

  const handleDownClick = () => {
    const payload = {};
    payload.questionIndex = questionIndex;
    payload.optionIndex = optionIndex;
    dispatch({ type: 'MOVE_OPTION_DOWN', payload });
  };

  return (
    <Box display='flex'>
      <Box
        py={4}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        {/* Only render up button if not first item in list */}
        {/* Otherwise render placeholder for styling */}
        {optionIndex !== 0 ? (
          <IconButton onClick={handleUpClick}>
            <ArrowUpward />
          </IconButton>
        ) : (
          <IconButton />
        )}
        {/* Only render down button if not last item in list */}
        {/* Otherwise render placeholder for styling */}
        {options.length - 1 !== optionIndex ? (
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
          value={text}
          name='text'
          onChange={setOptionText}
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
