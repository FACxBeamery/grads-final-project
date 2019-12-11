/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core';
import Snackbar from '../../components/Snackbar';
import { EmployeeCompletionTable } from '../../components/EmployeeTable';

const publishSurvey = async (_id, dispatch) => {
  const response = await axios.patch(`/surveys/${_id}`, {
    status: 'active',
    datePublished: Date.now(),
  });

  const payload = response.status === 204;
  dispatch({ type: 'SET_SUCCESSFUL_PUBLISH', payload });
};

const setSurveyData = (data, dispatch) => {
  const payload = data;
  dispatch({ type: 'SET_SURVEY_DATA_SURVEY_DETAIL', payload });
  dispatch({ type: 'SET_ACTIVE_STEP' });
};

const getSurvey = async (idToSend, dispatch) => {
  try {
    const { data } = await axios.get(`/surveys/${idToSend}`);
    setSurveyData(data, dispatch);
  } catch (error) {
    setSurveyData({}, dispatch);
  }
};

const closeSurvey = async (_id, dispatch) => {
  const response = await axios.patch(`/surveys/${_id}`, {
    status: 'closed',
    dateClosed: Date.now(),
  });
  const payload = response.status === 204;
  dispatch({ type: 'SET_SUCCESSFUL_CLOSE', payload });
};

const PublishSurveyButton = ({ surveyId }) => {
  const dispatch = useDispatch();

  return (
    <Button
      type='submit'
      width='auto'
      variant='contained'
      color='secondary'
      onClick={async () => {
        dispatch({ type: 'RESET_EMPLOYEE_DATA' });
        await publishSurvey(surveyId, dispatch);
        await getSurvey(surveyId, dispatch);
      }}
    >
      Publish Survey
    </Button>
  );
};

const CloseSurveyButton = ({ surveyId }) => {
  const dispatch = useDispatch();

  return (
    <Button
      type='submit'
      width='auto'
      variant='contained'
      color='secondary'
      onClick={async () => {
        dispatch({ type: 'RESET_EMPLOYEE_DATA' });
        await closeSurvey(surveyId, dispatch);
        await getSurvey(surveyId, dispatch);
      }}
    >
      Close Survey
    </Button>
  );
};

const SurveyDetailsStepper = () => {
  const { activeStep } = useSelector((state) => state.surveyDetailReducer);
  const steps = ['Draft', 'Publish', 'Close'];

  return (
    <Stepper alternativeLabel activeStep={activeStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

const SnackbarPublish = () => {
  const { successfulPublish } = useSelector(
    (state) => state.surveyDetailReducer,
  );
  return (
    <Snackbar
      message={
        successfulPublish
          ? 'The survey is now active and can welcome responses.'
          : 'There was an error publishing survey. Please try again.'
      }
      variant={successfulPublish ? 'success' : 'error'}
      timeopened={Date.now()}
    />
  );
};

const SnackbarClose = () => {
  const { successfulClose } = useSelector((state) => state.surveyDetailReducer);

  return (
    <Snackbar
      message={
        successfulClose
          ? 'The survey is now closed. No more responses will be recorded.'
          : 'There was an error closing the survey. Please try again.'
      }
      variant={successfulClose ? 'success' : 'error'}
      timeopened={Date.now()}
    />
  );
};

const EditSurveyButton = () => {
  const { _id } = useSelector((state) => state.surveyDetailReducer);
  return (
    <Button color='secondary' variant='outlined' size='large'>
      <Link
        style={{ color: '#f15852', textDecoration: 'none' }}
        to={{
          pathname: `/admin/surveys/edit/${_id}`,
        }}
      >
        Edit survey
      </Link>
    </Button>
  );
};
const SurveyDetail = ({ match }) => {
  const dispatch = useDispatch();
  const {
    title,
    description,
    status,
    successfulPublish,
    successfulClose,
  } = useSelector((state) => state.surveyDetailReducer);

  useEffect(() => {
    const { id } = match.params;
    dispatch({ type: 'RESET_EMPLOYEE_DATA' });
    dispatch({ type: 'RESET_SURVEY_DETAIL_STATE' });
    getSurvey(id, dispatch);
  }, [match.params, dispatch]);

  return (
    <Box display='flex' flexDirection='column' align-items='flex-start'>
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex' flexDirection='column' alignItems='flex-start'>
          <Typography color='primary' variant='h2'>
            {title}
          </Typography>
          <SurveyDetailsStepper />
          <Typography color='primary' variant='h5'>
            {description}
          </Typography>
        </Box>
        <Box alignSelf='flex-start'>
          {status === 'draft' && (
            <Box display='flex' flexDirection='column'>
              <PublishSurveyButton surveyId={match.params.id} />
              <EditSurveyButton />
            </Box>
          )}
          {status === 'active' && (
            <CloseSurveyButton surveyId={match.params.id} />
          )}
        </Box>
      </Box>
      {status === 'active' && (
        <Box display='flex' flexDirection='column'>
          <Box alignSelf='flex-start' py={2}>
            <Button variant='outlined' color='secondary'>
              Add recipients
            </Button>
          </Box>
          <EmployeeCompletionTable />
        </Box>
      )}
      {successfulPublish !== undefined && <SnackbarPublish />}
      {successfulClose !== undefined && <SnackbarClose />}
    </Box>
  );
};

SurveyDetail.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  surveyId: PropTypes.string.isRequired,
};

export default SurveyDetail;
