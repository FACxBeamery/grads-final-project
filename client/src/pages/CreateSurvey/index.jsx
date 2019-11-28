import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  TextField,
  Button,
  Switch,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import QuestionsList from './Questions/Questions';

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

  const handleSubmit = async (event) => {
    try {
      await axios.post('/surveys', surveyForSending);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  console.log(surveyForSending);
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        error={title.length < 5 || title.length > 100}
        helperText={
          title < 5 || title > 100
            ? 'Title must be between 5 and 100 characters!'
            : ''
        }
        value={title}
        name='title'
        label='Survey title'
        onChange={setMetadata}
      />
      <TextField
        required
        error={description.length < 5 || description.length > 140}
        helperText={
          description < 5 || description > 140
            ? 'Description must be between 5 and 140 characters!'
            : ''
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
      <FormControl>
        <InputLabel id='anonymous-switch'>Anonymous</InputLabel>

        <Switch
          checked={anonymous}
          onChange={(e) => setMetadata(e, 'switch')}
          value='anonymous'
          name='anonymous'
          labelId='anonymous-switch'
          inputProps={{ 'aria-label': 'Make survey anonymous' }}
        />
      </FormControl>
      <QuestionsList />
      <Button type='submit' color='secondary'>
        Create Survey
      </Button>
    </form>
  );
};

export default CreateSurvey;
