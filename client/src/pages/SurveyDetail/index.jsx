import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
import formatDate from '../../utils/formatDate';

import ProgressWheel from '../../components/ProgressWheel/ProgressWheel';

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

const setEmployeeData = (data, dispatch) => {
  const payload = data;
  dispatch({ type: 'SET_EMPLOYEE_DATA', payload });
};
const getEmployees = async (dispatch) => {
  try {
    const { data } = await axios.get(`/employees`);
    setEmployeeData(data, dispatch);
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
  const { activeStep, dateCreated, datePublished, dateClosed } = useSelector(
    (state) => state.surveyDetailReducer,
  );

  const stepperMuiTheme = createMuiTheme({
    overrides: {
      MuiStepIcon: {
        root: {
          zIndex: 1,
          '&$active': {
            color: '#F15852',
          },
          '&$completed': {
            color: '#F15852',
          },
        },
      },
      MuiStepConnector: {
        active: {
          '& $line': {
            backgroundColor: '#201E5A',
            border: 0,
            height: 3,
          },
        },
        completed: {
          '& $line': {
            backgroundColor: '#201E5A',
            border: 0,
            height: 3,
          },
        },
      },
    },
  });

  const stepperLabels = [
    `Drafted\n${formatDate(dateCreated)}`,
    datePublished
      ? `Published\n${formatDate(datePublished)}`
      : `Publish\npending`,
    dateClosed ? `Closed\n${formatDate(dateClosed)}` : `Closed\npending`,
  ];

  return (
    <MuiThemeProvider theme={stepperMuiTheme}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {stepperLabels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </MuiThemeProvider>
  );
};

const SurveyDetailProgressWheel = () => {
  const { recipients, responses } = useSelector(
    (state) => state.surveyDetailReducer,
  );
  const percentage = responses.length / recipients.length;

  return (
    <ProgressWheel
      strokeWidth='10'
      sqSize='100'
      percentage={percentage || 0}
      numerator={responses.length}
      denominator={recipients.length}
    />
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

  useEffect(() => {
    const { id: idFromUrl } = match.params;
    getSurvey(idFromUrl, dispatch);
    getEmployees(dispatch);
  }, [match.params, dispatch]);

  const {
    title,
    description,
    status,
    successfulPublish,
    successfulClose,
  } = useSelector((state) => state.surveyDetailReducer);

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
          <Box display='flex' flexDirection='column'>
            {status === 'published' && <CloseSurveyButton />}
            {(status === 'published' || status === 'closed') && (
              <Box m={4}>
                <SurveyDetailProgressWheel />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {status === 'published' && (
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
};

export default SurveyDetail;
