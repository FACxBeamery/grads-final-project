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
} from '@material-ui/core';
import Options from '../Options/Options';

const Question = ({ questionIndex }) => {
  const { title, type, required, commentsEnabled } = useSelector(
    (state) => state.createSurveyReducer.questions[questionIndex],
  );

  const dispatch = useDispatch();

  const setQuestionData = (event, inputType) => {
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
  };

  return (
    <>
      {/* QUESTION NUMBER */}
      <h2>{`Q${questionIndex + 1}`}</h2>
      {/*  QUESTION TITLE */}
      <TextField
        required
        error={title.length < 5 || title.length > 100}
        helperText={
          title < 5 ||
          (title > 100 && 'Title must be between 5 and 100 characters!')
        }
        value={title}
        name='title'
        label='Question'
        onChange={setQuestionData}
      />
      {/*  QUESTION TYPE SELECT */}
      <FormControl>
        <InputLabel id='question-type-select'>Question type: </InputLabel>
        <Select
          labelId='question-type-select'
          id='question-type-select'
          value={type}
          onChange={setQuestionData}
          name='type'
        >
          <MenuItem value='text'>Text</MenuItem>
          <MenuItem value='multichoice'>Multichoice</MenuItem>
        </Select>
      </FormControl>

      {/*  QUESTION REQUIRED CHECKBOX */}
      <FormControl>
        <InputLabel id='question-required-checkbox'>Required: </InputLabel>
        <Checkbox
          checked={required}
          onChange={(e) => setQuestionData(e, 'checkbox')}
          value='required'
          name='required'
          labelId='question-required-checkbox'
          inputProps={{
            'aria-label': 'Question required?',
          }}
        />
      </FormControl>
      {/*  COMMENTS ENABLED CHECKBOX */}
      {/* TODO make comments enabled work */}
      <FormControl>
        <InputLabel id='comments-enabled-checkbox'>Allow comments: </InputLabel>
        <Checkbox
          checked={commentsEnabled}
          onChange={(e) => setQuestionData(e, 'checkbox')}
          value='commentsEnabled'
          name='commentsEnabled'
          labelId='comments-enabled-checkbox'
          inputProps={{
            'aria-label': 'Allow comments: ',
          }}
        />
      </FormControl>
      <Button type='button' onClick={handleDeleteQuestion}>
        DELETE QUESTION
      </Button>

      {type === 'multichoice' ? (
        <Options questionIndex={questionIndex} />
      ) : null}
    </>
  );
};

Question.propTypes = {
  questionIndex: PropTypes.number.isRequired,
};

const QuestionsList = () => {
  const dispatch = useDispatch();
  const handleNewQuestionClick = () => {
    dispatch({ type: 'NEW_QUESTION' });
  };
  const { questions } = useSelector((state) => state.createSurveyReducer);

  return (
    <>
      {questions.map((question, questionIndex) => {
        return <Question key={question.title} questionIndex={questionIndex} />;
      })}
      <Button type='button' onClick={handleNewQuestionClick}>
        Add question
      </Button>
    </>
  );
};

export default QuestionsList;
