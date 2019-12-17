/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Typography, Button, Box } from '@material-ui/core';

import Stepper from '../../components/Stepper';
import ExportModal from './ExportModal';
import { EmployeeCompletionTable } from '../../components/EmployeeTable';
import { UPDATE_SNACKBAR } from '../../store/actions/snackbarActions';

import SlackModalAndButton from '../../components/SlackModalAndButton/SlackModalAndButton';
import ProgressWheel from '../../components/ProgressWheel/ProgressWheel';
import formatDate from '../../utils/formatDate';

const publishSurvey = async (_id, dispatch) => {
  try {
    const response = await axios.patch(`/surveys/${_id}`, {
      status: 'active',
      datePublished: Date.now(),
    });
    const payload = response.status === 204;
    dispatch({ type: 'SET_SUCCESSFUL_PUBLISH', payload });
  } catch (err) {
    // eslint-disable-next-line no-console

    console.error(err.message);
    dispatch({ type: 'SET_SUCCESSFUL_PUBLISH', payload: false });
  }
};
const setSurveyData = (data, dispatch) => {
  const payload = data;
  dispatch({ type: 'SET_SURVEY_DATA_SURVEY_DETAIL', payload });
  dispatch({ type: 'SET_ACTIVE_STEP' });
};
const getSurvey = async (idToSend, dispatch) => {
  try {
    const { data } = await axios.get(`/surveys/${idToSend}?responses=true`);
    setSurveyData(data, dispatch);
  } catch (error) {
    setSurveyData({}, dispatch);
  }
};
const closeSurvey = async (_id, dispatch) => {
  try {
    const response = await axios.patch(`/surveys/${_id}`, {
      status: 'closed',
      dateClosed: Date.now(),
    });
    const payload = response.status === 204;
    dispatch({ type: 'SET_SUCCESSFUL_CLOSE', payload });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    dispatch({ type: 'SET_SUCCESSFUL_CLOSE', payload: false });
  }
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
        if (confirm('Are you sure you want to make this survey active?')) {
          dispatch({ type: 'RESET_EMPLOYEE_DATA' });
          await publishSurvey(surveyId, dispatch);
          await getSurvey(surveyId, dispatch);
        }
      }}
    >
      Activate Survey
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
        if (
          confirm(
            'Are you sure you want to close this survey? This action cannot be undone.',
          )
        ) {
          dispatch({ type: 'RESET_EMPLOYEE_DATA' });
          await closeSurvey(surveyId, dispatch);
          await getSurvey(surveyId, dispatch);
        }
      }}
    >
      Close Survey
    </Button>
  );
};

const ExportSurveyButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      type='button'
      width='auto'
      variant='contained'
      color='secondary'
      onClick={async () => {
        dispatch({ type: 'TOGGLE_EXPORT_MODAL' });
      }}
    >
      Export results
    </Button>
  );
};

const SurveyDetailProgressWheel = () => {
  const { recipients, responses } = useSelector(
    (state) => state.surveyDetailReducer,
  );
  const percentage = responses.length / recipients.length;

  return (
    <ProgressWheel
      strokeWidth='12.5'
      sqSize='125'
      percentage={percentage || 0}
      numerator={responses.length}
      denominator={recipients.length}
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
  }, [match.params, dispatch]);

  const {
    title,
    description,
    status,
    recipients,
    successfulPublish,
    successfulClose,
    employeeDataForSlack,
    activeStep,
    dateCreated,
    datePublished,
    dateClosed,
  } = useSelector((state) => state.surveyDetailReducer);

  const StepperLabelDiv = ({ label, date }) => {
    return (
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Typography style={{ fontSize: '0.75rem' }}>{label}</Typography>
        <Typography style={{ fontSize: '0.75rem' }}>
          {date && formatDate(date)}
        </Typography>
      </Box>
    );
  };

  const stepperLabels = [
    <StepperLabelDiv label='Drafted' date={dateCreated} />,
    <StepperLabelDiv label='Activated' date={datePublished} />,
    <StepperLabelDiv label='Closed' date={dateClosed} />,
  ];

  useEffect(() => {
    const { id } = match.params;
    dispatch({ type: 'RESET_EMPLOYEE_DATA' });
    dispatch({ type: 'RESET_SURVEY_DETAIL_STATE' });
    const getEmployees = async () => {
      const { data } = await axios.get(`/employees`);
      dispatch({ type: 'SET_EMPLOYEE_DATA_FOR_SLACK', payload: data });
    };
    getEmployees();

    getSurvey(id, dispatch);
  }, [match.params, dispatch]);

  const SnackbarPublish = () => {
    const snackbarPayload = {
      open: true,
      snackbar: {
        message: successfulPublish
          ? 'The survey is now active and can welcome responses.'
          : 'There was an error activating survey. Please try again.',
        variant: successfulPublish ? 'success' : 'error',
        timeopened: Date.now(),
      },
    };

    dispatch({ type: UPDATE_SNACKBAR, payload: snackbarPayload });
  };

  const SnackbarClose = () => {
    const snackbarPayload = {
      open: true,
      snackbar: {
        message: successfulClose
          ? 'The survey is now closed. No more responses will be recorded.'
          : 'There was an error closing the survey. Please try again.',
        variant: successfulClose ? 'success' : 'error',
        timeopened: Date.now(),
      },
    };

    dispatch({ type: UPDATE_SNACKBAR, payload: snackbarPayload });
  };

  return (
    <Box display='flex' flexDirection='column' align-items='flex-start'>
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex' flexDirection='column' alignItems='flex-start'>
          <Typography color='primary' variant='h2'>
            {title}
          </Typography>
          <Box mt={2} mb={4}>
            <Typography color='primary' variant='h5'>
              {description}
            </Typography>
          </Box>
          <Stepper steps={stepperLabels} activeStep={activeStep} />
          {/* <SurveyDetailsStepper /> */}
        </Box>
        <Box alignSelf='flex-start'>
          {status === 'draft' && (
            <Box display='flex' flexDirection='column' alignSelf='flex-start'>
              <Box mb={2}>
                <PublishSurveyButton surveyId={match.params.id} />
              </Box>
              <EditSurveyButton />
            </Box>
          )}
          <Box display='flex' flexDirection='column'>
            {status === 'active' && (
              <>
                <Box mb={2} display='flex' flexDirection='column'>
                  <CloseSurveyButton surveyId={match.params.id} />
                </Box>
                {employeeDataForSlack && <SlackModalAndButton />}
              </>
            )}

            {status === 'closed' && (
              <ExportSurveyButton surveyId={match.params.id} />
            )}

            {(status === 'active' || status === 'closed') && (
              <Box m={4}>
                <SurveyDetailProgressWheel />
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {status && (
        <Box display='flex' flexDirection='column' mt={4}>
          <Box mt={4} mb={2}>
            <Typography variant='h4' color='primary'>
              Recipients
            </Typography>
          </Box>
          {status === 'draft' && (
            <Typography>To edit recipient list, select Edit Survey</Typography>
          )}

          {recipients.length ? (
            <EmployeeCompletionTable />
          ) : (
            <Typography>
              No recipients have been added. Select Edit Survey to start adding.
            </Typography>
          )}

          {employeeDataForSlack && <SlackModal />}
        </Box>
      )}
      {[true, false].includes(successfulPublish) && SnackbarPublish()}
      {[true, false].includes(successfulClose) && SnackbarClose()}
      <ExportModal />
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
