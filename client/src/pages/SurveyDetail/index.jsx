import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// import { Link } from 'react-router-dom';
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

const PublishSurveyButton = () => {
  const dispatch = useDispatch();
  const {
    _id,
    status,
    activeStep,
    successfulPublish,
    successfulClose,
  } = useSelector((state) => state.surveyDetailReducer);

  const publishSurvey = async (_id) => {
    const response = await axios.patch(`/surveys/${_id}`, {
      status: 'published',
      datePublished: Date.now(),
    });
    const payload = response.status === 204;
    dispatch({ type: 'SET_SUCCESSFUL_PUBLISH', payload });
  };

  const setSurveyData = (data) => {
    const payload = data;
    dispatch({ type: 'SET_SURVEY_DATA_SURVEY_DETAIL', payload });
    dispatch({ type: 'SET_ACTIVE_STEP' });
  };

  const getSurvey = async (idToSend) => {
    try {
      const { data } = await axios.get(`/surveys/${idToSend}`);
      setSurveyData(data);
    } catch (error) {
      setSurveyData({});
    }
  };
  return (
    <Button
      type='submit'
      width='auto'
      variant='contained'
      color='secondary'
      onClick={async () => {
        await publishSurvey(_id);
        await getSurvey(_id);
      }}
    >
      Publish Survey
    </Button>
  );
};

const CloseSurveyButton = () => {
  const dispatch = useDispatch();

  const {
    _id,
    status,
    activeStep,
    successfulPublish,
    successfulClose,
  } = useSelector((state) => state.surveyDetailReducer);

  const closeSurvey = async (_id) => {
    const response = await axios.patch(`/surveys/${_id}`, {
      status: 'closed',
      dateClosed: Date.now(),
    });
    const payload = response.status === 204;
    dispatch({ type: 'SET_SUCCESSFUL_CLOSE', payload });
  };

  const setSurveyData = (data) => {
    const payload = data;
    dispatch({ type: 'SET_SURVEY_DATA_SURVEY_DETAIL', payload });
    dispatch({ type: 'SET_ACTIVE_STEP' });
  };

  const getSurvey = async (idToSend) => {
    try {
      const { data } = await axios.get(`/surveys/${idToSend}`);
      setSurveyData(data);
    } catch (error) {
      setSurveyData({});
    }
  };

  return (
    <Button
      type='submit'
      width='auto'
      variant='contained'
      color='secondary'
      onClick={async () => {
        await closeSurvey(_id);
        await getSurvey(_id);
      }}
    >
      Close Survey
    </Button>
  );
};

const SurveyDetailsStepper = () => {
  const dispatch = useDispatch();
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

const SurveyDetail = ({ match }) => {
  const dispatch = useDispatch();
  const {
    id,
    title,
    status,
    activeStep,
    successfulPublish,
    successfulClose,
  } = useSelector((state) => state.surveyDetailReducer);

  useEffect(() => {
    dispatch({ type: 'RESET_STATE' });

    const setSurveyData = (data) => {
      const payload = data;
      dispatch({ type: 'SET_SURVEY_DATA_SURVEY_DETAIL', payload });
      dispatch({ type: 'SET_ACTIVE_STEP' });
    };

    const getSurvey = async (idToSend) => {
      try {
        const { data } = await axios.get(`/surveys/${idToSend}`);
        setSurveyData(data);
      } catch (error) {
        setSurveyData({});
      }
    };

    const { id: idFromUrl } = match.params;
    getSurvey(idFromUrl);
  }, [match.params, dispatch]);

  return (
    <Box display='flex' flexDirection='row' align-items='flex-start'>
      <Typography color='primary' variant='h3'>
        {title}
      </Typography>
      <SurveyDetailsStepper />
      <EmployeeTable />
      {activeStep === 1 && <PublishSurveyButton />}
      {activeStep === 2 && <CloseSurveyButton />}
      {successfulPublish !== undefined && (
        <Snackbar
          message={
            successfulPublish
              ? 'The survey is now published and can welcome responses.'
              : 'There was an error publishing survey. Please try again.'
          }
          variant={successfulPublish ? 'success' : 'error'}
          timeopened={Date.now()}
        />
      )}
      {successfulClose !== undefined && (
        <Snackbar
          message={
            successfulClose
              ? 'The survey is now closed. No more responses will be recorded.'
              : 'There was an error closing the survey. Please try again.'
          }
          variant={successfulClose ? 'success' : 'error'}
          timeopened={Date.now()}
        />
      )}
    </Box>
  );
};

SurveyDetail.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
};

export default SurveyDetail;
