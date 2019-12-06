import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
import EmployeesTable from '../../components/EmployeeTable';

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
  const dispatch = useDispatch();

  const { id, title, description, status, activeStep } = useSelector(
    (state) => state.surveyDetailReducer,
  );

  const state = useSelector((state) => state.surveyDetailReducer);

  console.log(state, 'STATE');

  useEffect(() => {
    const idFromUrl = match.params.id;
    dispatch({ type: 'RESET_STATE' });
    const setSurveyData = (data) => {
      const payload = data;
      dispatch({ type: 'SET_SURVEY_DATA_SURVEY_DETAIL', payload });
    };
    const getSurvey = async (idToSend) => {
      try {
        console.log(idToSend, 'ID');
        const { data } = await axios.get(`/surveys/${idToSend}`);
        console.log(data, 'DATA');
        setSurveyData(data);
      } catch (error) {
        setSurveyData({});
      }
    };
    getSurvey(idFromUrl);
  }, [match.params, dispatch]);

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
        size='large'
        onClick={async () => {
          await publishSurvey(id);
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
        size='large'
        onClick={async () => {
          await closeSurvey(id);
          // await getSurvey(id);
        }}
      >
        Close Survey
      </Button>
    );
  };

  const EditSurveyButton = () => {
    return (
      <Button color='secondary' variant='outlined' size='large'>
        <Link
          style={{ color: '#f15852', textDecoration: 'none' }}
          // className={styles.link}
          to={{
            pathname: `/admin/surveys/edit/${id}`,
          }}
        >
          Edit survey
        </Link>
      </Button>
    );
  };

  console.log(status, 'STATUS');
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
              <PublishSurveyButton />
              <EditSurveyButton />
            </Box>
          )}
          {status === 'published' && <CloseSurveyButton />}
        </Box>
      </Box>
      {status === 'published' && <EmployeesTable />}
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
