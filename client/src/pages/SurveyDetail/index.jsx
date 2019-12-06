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

const SurveyDetail = ({ match }) => {
  const dispatch = useDispatch();
  const {
    id,
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
    successfulPublish = response.status === 204;
  };

  const closeSurvey = async (_id) => {
    const response = await axios.patch(`/surveys/${_id}`, {
      status: 'closed',
      dateClosed: Date.now(),
    });
    successfulClose = response.status === 204;
  };
  useEffect(() => {
    const setSurveyData = (data) => {
      dispatch({ type: 'SET_SURVEY_DATA', payload: data });
      dispatch({ type: 'SET_ACTIVE_STEP' });
    };

    const getSurvey = async (idToFind) => {
      try {
        const response = await axios.get(`/surveys/${idToFind}`);
        console.log(response);
        const data = response.data;
        setSurveyData(data);
      } catch (error) {
        setSurveyData({});
      }
    };
    const idFromEndpoint = match.params.id;
    getSurvey(idFromEndpoint);
  }, [match.params.id]);

  const SurveyDetailsStepper = () => {
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

  const PublishSurveyButton = () => {
    return (
      <Button
        type='submit'
        width='auto'
        variant='contained'
        color='secondary'
        onClick={async () => {
          // await publishSurvey(id);
          // await getSurvey(id);
        }}
      >
        Publish Survey
      </Button>
    );
  };

  const CloseSurveyButton = () => {
    return (
      <Button
        type='submit'
        width='auto'
        variant='contained'
        color='secondary'
        onClick={async () => {
          // await closeSurvey(id);
          // await getSurvey(id);
        }}
      >
        Close Survey
      </Button>
    );
  };

  return (
    <Box display='flex' flexDirection='row' align-items='flex-start'>
      <Typography color='primary' variant='h3'>
        Survey title.
      </Typography>
      <SurveyDetailsStepper />
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
