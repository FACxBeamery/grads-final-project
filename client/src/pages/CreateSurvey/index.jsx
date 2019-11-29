/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  TextField,
  Button,
  Switch,
  Box,
  FormControlLabel,
  Typography,
  Divider,
} from '@material-ui/core';
import QuestionsList from './Questions/QuestionsList';

const CreateSurvey = () => {
  const dispatch = useDispatch();

  const setMetadata = (event, inputType) => {
    const payload = {};
    payload[event.target.name] =
      inputType === 'switch' ? event.target.checked : event.target.value;
    dispatch({ type: 'SET_METADATA', payload });
  };

  const { title, description, recipients, disclaimer, anonymous } = useSelector(
    (state) => state.createSurveyReducer,
  );
  const surveyForSending = {
    ...useSelector((state) => state.createSurveyReducer),
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/surveys', surveyForSending);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display='flex' flexDirection='column' my={8}>
        <Box mb={4}>
          <Typography variant='h1'>Survey Editor</Typography>
        </Box>
        <Typography variant='h4'>Start building your survey...</Typography>
        <TextField
          margin='normal'
          required
          error={title && (title.length < 10 || title.length > 60)}
          helperText={
            title &&
            (title.length < 10 || title.length > 60) &&
            'Title must be between 10 and 60 characters!'
          }
          value={title}
          name='title'
          label='Survey title'
          onChange={setMetadata}
        />
        <TextField
          margin='normal'
          required
          error={
            description && (description.length < 30 || description.length > 280)
          }
          helperText={
            description &&
            (description.length < 30 || description.length > 280) &&
            'Description must be between 30 and 280 characters!'
          }
          value={description}
          name='description'
          label='Enter a description'
          onChange={setMetadata}
        />
        <TextField
          required
          value={recipients[0]}
          label='PLACEHOLDER FOR RECIPIENTS'
          name='recipients'
          onChange={setMetadata}
        />
        <TextField
          margin='normal'
          required
          error={disclaimer.length < 5 || disclaimer.length > 140}
          helperText={
            disclaimer < 5 || disclaimer > 140
              ? 'You must provide a disclaimer'
              : ''
          }
          value={disclaimer}
          name='disclaimer'
          label='How will this data be used?'
          onChange={setMetadata}
        />
        <FormControlLabel
          control={
            <Switch
              checked={anonymous}
              onChange={(e) => setMetadata(e, 'switch')}
              value='anonymous'
              name='anonymous'
              labelid='anonymous-switch'
              inputProps={{ 'aria-label': 'Make survey anonymous' }}
            />
          }
          label='Anonymous'
        />
        <Divider variant='middle' />
        <QuestionsList />
        <Box alignSelf='center' mt={8}>
          <Button type='submit' variant='contained' color='secondary'>
            Create Survey
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CreateSurvey;
