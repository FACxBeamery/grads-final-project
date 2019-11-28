/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useRef, useEffect } from 'react';
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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Options from '../Options/Options';

// TODO FIX WEIRD LINTING ERRORS
// TODO fix annoying state update typing thing
const Question = ({ questionIndex }) => {
  const [isEditing, setEditing] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(inputRef);
    if (isEditing) {
      inputRef.current.childNodes[1].childNodes['0'].focus(); //inputRef.current.focus();
    }
  }, [isEditing]);

  const { title, type, required, commentsEnabled } = useSelector(
    (state) => state.createSurveyReducer.questions[questionIndex],
  );

  const dispatch = useDispatch();

  const setQuestionData = (event, inputType) => {
    event.persist();
    const payload = {};
    payload.index = questionIndex;
    payload[event.target.name] =
      inputType === 'checkbox' ? event.target.checked : event.target.value;

    setEditing(!isEditing);
    dispatch({ type: 'SET_QUESTION_DATA', payload });
  };

  const handleDeleteQuestion = () => {
    const payload = {};
    payload.index = questionIndex;
    dispatch({ type: 'DELETE_QUESTION', payload });
  };

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box>
          {/* QUESTION NUMBER */}
          <Typography>{`Q${questionIndex + 1}`}</Typography>
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
            ref={inputRef}
            onChange={setQuestionData}
          />
        </Box>
        <Box justifySelf='flex-end'>
          <Button
            type='button'
            color='secondary'
            onClick={handleDeleteQuestion}
            startIcon={<DeleteIcon />}
          >
            Delete question
          </Button>
        </Box>
      </Box>

      {/*  CHECKBOXES DIV */}
      <Box
        display='flex'
        alignSelf='center'
        // width={0.5}
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
              value={type}
              onChange={setQuestionData}
              name='type'
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
        {/* TODO make comments enabled work */}
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={commentsEnabled}
                onChange={(e) => setQuestionData(e, 'checkbox')}
                value='commentsEnabled'
                name='commentsEnabled'
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

  if (questions.length < 1) {
    handleNewQuestionClick();
  }

  return (
    <Box mx={4} my={2} display='flex' flexDirection='column'>
      {questions.map((question, questionIndex) => {
        return (
          <Question
            key={questionIndex}
            question={question}
            questionIndex={questionIndex}
          />
        );
      })}
      <Box alignSelf='flex-start'>
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
