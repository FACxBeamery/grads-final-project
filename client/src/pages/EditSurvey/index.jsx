/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Prompt } from 'react-router';
import PropTypes from 'prop-types';
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
import QuestionsList from '../CreateSurvey/Questions/QuestionsList';
import formatDate from '../../utils/formatDate';

const EditSurvey = ({ match }) => {
  const dispatch = useDispatch();
  const setMetadata = (event, inputType) => {
    const payload = {};
    payload[event.target.name] =
      inputType === 'switch' ? event.target.checked : event.target.value;
    dispatch({ type: 'SET_METADATA', payload });
  };

  const {
    title,
    description,
    recipients,
    disclaimer,
    anonymous,
    dateCreated,
  } = useSelector((state) => state.createSurveyReducer);
  const surveyForSending = {
    ...useSelector((state) => state.createSurveyReducer),
  };

  useEffect(() => {
    const { id } = match.params;
    // match.params.id
    const setSurveyData = (data) => {
      const payload = data;
      dispatch({ type: 'SET_SURVEY_DATA', payload });
    };
    const getSurvey = async () => {
      try {
        const { data } = await axios.get(`/surveys/${id}`);
        console.log(data);
        setSurveyData(data);
      } catch (error) {
        setSurveyData({});
      }
    };
    getSurvey(id);
  }, [match.params, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = match.params;
    try {
      // console.log(surveyForSending);
      const editedSurvey = {
        ...surveyForSending,
        dateEdited: Date.now(),
      };
      // eslint-disable-next-line dot-notation
      delete editedSurvey['_id'];
      console.log(editedSurvey);

      const result = await axios.patch(`/surveys/${id}`, editedSurvey);
      console.log(result);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const PromptMessage = () => {
    return (
      <Prompt
        message={
          () =>
            'Are you sure you want to leave this page? Your changes will not be saved.'
          // eslint-disable-next-line react/jsx-curly-newline
        }
      />
    );
  };

  return (
    <div>
      <PromptMessage />
      <form onSubmit={handleSubmit}>
        <Box display='flex' flexDirection='column' my={8}>
          <Box mb={4}>
            <Typography variant='h2'>Editing Survey</Typography>
          </Box>
          <Box display='flex' justifyContent='flex-end' my={2}>
            <Typography>
              {`Date created: ${formatDate(dateCreated)}`}
            </Typography>
          </Box>

          <TextField
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
            required
            value={recipients[0]}
            label='PLACEHOLDER FOR RECIPIENTS'
            name='recipients'
            onChange={setMetadata}
          />
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
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
          <Divider variant='middle' />
          <QuestionsList />
          <Box alignSelf='center' mt={8}>
            <Button type='submit' variant='contained' color='secondary'>
              Save changes
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

EditSurvey.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({}) }).isRequired,
};

export default EditSurvey;
