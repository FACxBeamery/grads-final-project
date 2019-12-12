/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Prompt } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Switch,
  Box,
  FormControlLabel,
  Typography,
  Divider,
  Modal,
} from '@material-ui/core';
import QuestionsList from '../CreateSurvey/Questions/QuestionsList';
import RecipientsList from '../CreateSurvey/RecipientsList';
import formatDate from '../../utils/formatDate';
import formatDateWithTime from '../../utils/formatDateWithTime';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const EditSurvey = ({ match, history }) => {
  const classes = useStyles();
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
    disclaimer,
    anonymous,
    dateCreated,
    dateEdited,
  } = useSelector((state) => state.createSurveyReducer);

  const { openModal, modalStyle, isConfirming } = useSelector(
    (state) => state.editSurveyReducer,
  );

  const surveyForSending = {
    ...useSelector((state) => state.createSurveyReducer),
  };

  useEffect(() => {
    const { id } = match.params;
    dispatch({ type: 'RESET_EDIT_SURVEY_STATE' });
    dispatch({ type: 'RESET_EMPLOYEE_DATA' });
    const setSurveyData = (data) => {
      const payload = data;
      dispatch({ type: 'SET_SURVEY_DATA', payload });
      dispatch({
        type: 'SET_EMPLOYEE_TABLE_RECIPIENTS',
        payload: data.recipients,
      });
    };
    const getSurvey = async () => {
      try {
        const { data } = await axios.get(`/surveys/${id}`);

        setSurveyData(data);
      } catch (error) {
        setSurveyData({});
      }
    };
    getSurvey(id);
  }, [match.params, dispatch]);

  const toggleModal = () => {
    dispatch({ type: 'TOGGLE_EDIT_SURVEY_MODAL' });
  };

  const saveEditedSurvey = async () => {
    const { id } = match.params;
    try {
      const editedSurvey = {
        ...surveyForSending,
        dateEdited: Date.now(),
      };
      // remove _id key from data to edit on survey; This key is immutable.
      // eslint-disable-next-line dot-notation
      delete editedSurvey['_id'];
      delete editedSurvey.modalStyle;
      delete editedSurvey.openModal;
      delete editedSurvey.isConfirming;

      await axios.patch(`/surveys/${id}`, editedSurvey);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const confirmEditing = () => {
    dispatch({ type: 'TOGGLE_EDIT_SURVEY_CONFIRMATION_MODAL' });
    saveEditedSurvey();
  };

  const redirectToDashboard = () => {
    history.push('/admin');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleModal();
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
    <Box>
      {isConfirming && <PromptMessage />}

      <form onSubmit={handleSubmit}>
        <Box display='flex' flexDirection='column' my={8}>
          <Box mb={4}>
            <Typography variant='h2'>Editing Survey</Typography>
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-end'
            my={2}
          >
            <Typography>{`Created on: ${formatDate(dateCreated)}`}</Typography>
            <Typography>
              {`Last edited on: ${formatDateWithTime(dateEdited)}`}
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
          <RecipientsList />
          <Divider variant='middle' />
          <QuestionsList />
          <Box alignSelf='center' mt={8}>
            <Button type='submit' variant='contained' color='secondary'>
              Save changes
            </Button>
          </Box>
        </Box>
      </form>
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={openModal}
        onClose={toggleModal}
      >
        <Box style={modalStyle} className={classes.paper}>
          {isConfirming ? (
            <>
              <Typography variant='h5' id='simple-modal-title'>
                Are you sure you want to save your changes?
              </Typography>
              <Box mt={6} display='flex' justifyContent='space-between'>
                <Button onClick={redirectToDashboard} color='primary'>
                  Go back to dashboard
                </Button>
                <Button onClick={toggleModal} color='primary'>
                  Cancel
                </Button>
                <Button onClick={confirmEditing} color='secondary'>
                  Yes
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant='h5' style={{ textAlign: 'center' }}>
                Your changes were saved successfully!
              </Typography>
              <Box mt={6}>
                <Button
                  contained
                  color='secondary'
                  onClick={redirectToDashboard}
                >
                  Go Back to Dashboard
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

EditSurvey.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default EditSurvey;
