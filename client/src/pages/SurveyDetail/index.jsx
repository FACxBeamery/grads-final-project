import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  Grid,
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core';
import Snackbar from '../../components/Snackbar';

const getSurveyStatusForStepper = async (_id) => {
  const result = await axios.get(`/surveys/${_id}`);
  const surveyStatusToIndex = { draft: 1, published: 2, closed: 3 };
  return surveyStatusToIndex[result.data.status];
};

const getSurveyTitle = async (_id) => {
  const result = await axios.get(`/surveys/${_id}`);
  return result.data.title;
};

let successfulPublish;
let successfulClose;
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

const SurveyDetail = ({ match }) => {
  const allState = useSelector((state) => state);
  console.log('STATE: ', allState);

  const dispatch = useDispatch();

  //   const { title, status, datePublished, dateClosed } = useSelector(
  //     (state) => state.createSurveyReducer,
  //   );
  const { surveyStatus } = useSelector((state) => state.surveyDetailReducer);

  const { id } = match.params;
  React.useEffect(() => {
    getSurveyStatusForStepper(id).then((response) =>
      dispatch({ type: 'SET_SURVEY_STATUS', payload: response }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const StepperT = () => {
    const steps = ['Draft', 'Publish', 'Close'];
    return (
      <Stepper alternativeLabel activeStep={surveyStatus}>
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
          await publishSurvey(id);
          getSurveyStatusForStepper(id).then((response) =>
            dispatch({ type: 'SET_SURVEY_STATUS', payload: response }),
          );
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
          await closeSurvey(id);
          getSurveyStatusForStepper(id).then((response) =>
            dispatch({ type: 'SET_SURVEY_STATUS', payload: response }),
          );
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
      <StepperT />
      {surveyStatus === 1 && <PublishSurveyButton />}
      {surveyStatus === 2 && <CloseSurveyButton />}
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
