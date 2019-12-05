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
import formatDate from '../../utils/formatDate';

const CreateSurvey = () => {
  const {
    title,
    description,
    disclaimer,
    anonymous,
    dateCreated,
  } = useSelector((state) => state.createSurveyReducer);
  const dispatch = useDispatch();

  const setMetadata = (event, inputType) => {
    const payload = {};
    payload[event.target.name] =
      inputType === 'switch' ? event.target.checked : event.target.value;
    dispatch({ type: 'SET_METADATA', payload });
  };

  let surveyForSending = {
    ...useSelector((state) => state.createSurveyReducer),
  };

  const createArrayOfObjectsFromArray = (array) => {
    return array.map((item) => {
      return { employeeId: item, completed: false };
    });
  };

  // TODO route back to dashboard on click
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      delete surveyForSending.employeeData;
      delete surveyForSending.openModal;

      surveyForSending = {
        ...surveyForSending,
        status: 'draft',
        responses: [],
        dateToClose: null,
        dateClosed: null,
        dateEdited: Date.now(),
        datePublished: null,
        dateToPublish: null,
        recipients: createArrayOfObjectsFromArray(surveyForSending.recipients),
      };

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
        <Box my={2}>
          <Typography>{`Date created: ${formatDate(dateCreated)}`}</Typography>
        </Box>

        <TextField
          margin='normal'
          required
          error={title && title.length > 60}
          helperText={
            title &&
            title.length > 60 &&
            'Title must be less than 60 characters!'
          }
          value={title}
          name='title'
          label='Survey title'
          onChange={setMetadata}
        />
        <TextField
          margin='normal'
          required
          error={description && description.length > 280}
          helperText={
            description &&
            description.length > 280 &&
            'Description must be less than 280 characters!'
          }
          value={description}
          name='description'
          label='Enter a description'
          onChange={setMetadata}
        />

        <TextField
          margin='normal'
          required
          error={disclaimer.length < 5}
          helperText={disclaimer < 5 ? 'You must provide a disclaimer' : ''}
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
        <RecipientsList />
        <Divider variant='middle' />
        <QuestionsList />
        <Box alignSelf='center' mt={8}>
          <Button type='submit' variant='contained' color='secondary'>
            Save as draft
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CreateSurvey;
