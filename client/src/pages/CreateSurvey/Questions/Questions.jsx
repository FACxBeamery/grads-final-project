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
  Divider,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Options from '../Options/Options';

// TODO FIX WEIRD LINTING ERRORS
// TODO fix annoying state update typing thing
const Question = ({ questionIndex }) => {
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
    dispatch({ type: 'SET_QUESTION_DATA', payload });
  };

  const handleDeleteQuestion = () => {
    const payload = {};
    payload.index = questionIndex;
    dispatch({ type: 'DELETE_QUESTION', payload });
  };

  return (
    <>
      <Box my={2}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Box flex={1} mb={2}>
            {/* QUESTION NUMBER */}
            <Typography variant='h4'>{`Q${questionIndex + 1}`}</Typography>
            {/*  QUESTION TITLE */}

            <TextField
              fullWidth
              required
              error={title && (title.length < 10 || title.length > 140)}
              helperText={
                title &&
                (title.length < 10 || title.length > 140) &&
                'Title must be between 10 and 140 characters!'
              }
              value={title}
              name='title'
              label='Question'
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

        {type === 'multichoice' && <Options questionIndex={questionIndex} />}
      </Box>
      <Divider variant='middle' />
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
