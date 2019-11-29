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
import RecipientsList from './RecipientsList';

const CreateSurvey = () => {
  const dispatch = useDispatch();

  const pageSize = 5;

  const getEmployees = async () => {
    const { data } = await axios.get(
      '/employees/pageS'`/employees/${pageSize}/${pageNumber}`,
    );
    dispatch({ type: 'SET_SURVEYS', payload: data });
  };

  const setMetadata = (event, inputType) => {
    const payload = {};
    payload[event.target.name] =
      inputType === 'switch' ? event.target.checked : event.target.value;
    dispatch({ type: 'SET_METADATA', payload });
  };

  const { title, description, recipients, disclaimer, anonymous } = useSelector(
    (state) => state.createSurveyReducer,
  );

  const textFields = [
    {
      label: 'Survey title',
      name: 'title',
      state: title,
      min: 10,
      max: 60,
    },
    {
      label: 'Enter a description',
      name: 'description',
      state: description,
      min: 30,
      max: 280,
    },
    {
      label: 'How will this data be used?',
      name: 'disclaimer',
      state: disclaimer,
      min: 5,
      max: 140,
    },
  ];
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
        {textFields.map((field, idx) => {
          const { label, name, state, min, max } = field;
          return (
            <TextField
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              margin='normal'
              required
              error={state && (state.length < min || state.length > max)}
              helperText={
                state &&
                (state.length < min || state.length > max) &&
                `Field ${name} must be between ${min} and ${max} characters!`
              }
              value={state}
              name={name}
              label={label}
              onChange={setMetadata}
            />
          );
        })}

        <Box display='flex' alignItems='baseline' my={8}>
          <TextField
            fullWidth
            required
            value={recipients && 'No recipients added yet'}
            label='Recipients'
            name='recipients'
          />
          <RecipientsList />
        </Box>
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
