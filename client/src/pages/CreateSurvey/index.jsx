/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Prompt } from 'react-router';
import axios from 'axios';
import PropTypes from 'prop-types';
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
import QuestionsList from './Questions/QuestionsList';
import RecipientsList from './RecipientsList';
import formatDate from '../../utils/formatDate';

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

const CreateSurvey = ({ history }) => {
  const classes = useStyles();
  const {
    title,
    description,
    disclaimer,
    anonymous,
    dateCreated,
    openCreateSurveyModal,
    modalStyle,
    isConfirming,
  } = useSelector((state) => state.createSurveyReducer);

  const { recipientIds } = useSelector((state) => state.employeeTableReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'RESET_CREATE_SURVEY_MODAL_STATE' });
    // dispatch({ type: 'RESET_SURVEY_DATA' });
    dispatch({ type: 'RESET_EDIT_SURVEY_STATE' });
    // dispatch({ type: 'RESET_EMPLOYEE_DATA' });
  }, [dispatch]);

  const setMetadata = (event, inputType) => {
    const payload = {};
    payload[event.target.name] =
      inputType === 'switch' ? event.target.checked : event.target.value;
    dispatch({ type: 'SET_METADATA', payload });
  };

  let surveyForSending = {
    ...useSelector((state) => state.createSurveyReducer),
  };

  const saveSurvey = async () => {
    const recipientsToSend = recipientIds.map((id) => {
      const obj = {};
      obj.employeeId = id;
      obj.completed = false;
      return obj;
    });

    try {
      surveyForSending = {
        ...surveyForSending,
        status: 'draft',
        responses: [],
        dateToClose: null,
        dateClosed: null,
        dateEdited: Date.now(),
        datePublished: null,
        dateToPublish: null,
        recipients: recipientsToSend,
        recipientIds: recipientsToSend,
      };
      delete surveyForSending.employeeData;
      delete surveyForSending.openCreateSurveyModal;
      delete surveyForSending.isConfirming;
      delete surveyForSending.openModal;

      await axios.post('/surveys', surveyForSending);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const toggleModal = () => {
    dispatch({ type: 'TOGGLE_CREATE_SURVEY_MODAL' });
  };

  const confirmEditing = () => {
    dispatch({ type: 'TOGGLE_CREATE_SURVEY_CONFIRMATION_MODAL' });
    saveSurvey();
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

  const ConfirmChanges = () => {
    return (
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
    );
  };

  const ChangesConfirmed = () => {
    return (
      <>
        <Typography variant='h5' style={{ textAlign: 'center' }}>
          Survey created successfully!
        </Typography>
        <Box mt={6}>
          <Button contained color='secondary' onClick={redirectToDashboard}>
            Go Back to Dashboard
          </Button>
        </Box>
      </>
    );
  };

  return (
    <Box>
      {isConfirming && <PromptMessage />}

      <form onSubmit={handleSubmit}>
        <Box display='flex' flexDirection='column' my={8}>
          <Box mb={4}>
            <Typography variant='h2'>Survey Editor</Typography>
          </Box>
          <Typography variant='h4'>Start building your survey...</Typography>
          <Box my={2}>
            <Typography>
              {`Date created: ${formatDate(dateCreated)}`}
            </Typography>
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
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={openCreateSurveyModal}
        onClose={toggleModal}
      >
        <Box style={modalStyle} className={classes.paper}>
          {isConfirming ? <ConfirmChanges /> : <ChangesConfirmed />}
        </Box>
      </Modal>
    </Box>
  );
};

CreateSurvey.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default CreateSurvey;
