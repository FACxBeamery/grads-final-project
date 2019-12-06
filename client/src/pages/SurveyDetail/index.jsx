import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import EmployeeTable from '../../components/EmployeeTable';

const publishSurvey = async (_id, dispatch) => {
  const response = await axios.patch(`/surveys/${_id}`, {
    status: 'published',
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
    setSurveyData({});
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

const PublishSurveyButton = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.surveyDetailReducer);

  return (
    <Button
      type='submit'
      width='auto'
      variant='contained'
      color='secondary'
      onClick={async () => {
        await publishSurvey(_id, dispatch);
        await getSurvey(_id, dispatch);
      }}
    >
      Publish Survey
    </Button>
  );
};

const CloseSurveyButton = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.surveyDetailReducer);

  return (
    <Button
      type='submit'
      width='auto'
      variant='contained'
      color='secondary'
      onClick={async () => {
        await closeSurvey(_id, dispatch);
        await getSurvey(_id, dispatch);
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
          ? 'The survey is now published and can welcome responses.'
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

const SurveyDetail = ({ match }) => {
  const dispatch = useDispatch();
  const { title, status, successfulPublish, successfulClose } = useSelector(
    (state) => state.surveyDetailReducer,
  );

  useEffect(() => {
    const { id: idFromUrl } = match.params;
    getSurvey(idFromUrl, dispatch);
  }, [match.params, dispatch]);

  return (
    <Box display='flex' flexDirection='row' align-items='flex-start'>
      <Typography color='primary' variant='h3'>
        {title}
      </Typography>
      <SurveyDetailsStepper />
      <EmployeeTable />
      {status === 'draft' && <PublishSurveyButton />}
      {status === 'published' && <CloseSurveyButton />}
      {successfulPublish !== undefined && <SnackbarPublish />}
      {successfulClose !== undefined && <SnackbarClose />}
    </Box>
  );
};

SurveyDetail.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
};

export default SurveyDetail;
