import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

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

  const optionExists = text.length;
  return (
    <>
      <TextField
        required
        error={!optionExists}
        helperText={!optionExists && 'Answer must not be empty!'}
        value={text}
        name='text'
        onChange={setOptionText}
      />
      <Button type='button' onClick={handleDeleteOption}>
        DELETE ANSWER
      </Button>
    </>
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
    <>
      {options.map((option, optionIndex) => {
        return (
          <Option
            key={option.text}
            optionIndex={optionIndex}
            questionIndex={questionIndex}
          />
        );
      })}
      <Button type='button' onClick={handleNewOptionClick}>
        Add answer
      </Button>
    </>
  );
};

Options.propTypes = {
  questionIndex: PropTypes.number.isRequired,
};

export default Options;
