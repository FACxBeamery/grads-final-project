import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography, Box } from '@material-ui/core';

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

  const optionIsEmptyString = text === '';
  return (
    <Box
      display='flex'
      flexDirection='column'
      style={{ backgroundColor: '#fafafa' }}
      mb={2}
      p={2}
    >
      <TextField
        fullWidth
        required
        label='Answer text'
        error={optionIsEmptyString}
        helperText={optionIsEmptyString && 'Answer must not be empty!'}
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
    // TODO ADD ANSWERS h2
    <Box display='flex' justifyContent='flex-end'>
      <Box mr={4}>
        <Typography variant='h6'>ANSWERS:</Typography>
      </Box>
      <Box display='flex' flexDirection='column' flexGrow={0.8}>
        {options.map((option, optionIndex) => {
          return (
            <Option
              key={Math.random()}
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
