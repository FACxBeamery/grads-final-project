import React from 'react';

import { Box, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import SurveyCompletedImage from './SurveyCompletedImage';

const SurveySubmit = ({ match }) => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.takeSurveyReducer.answers);
  const responseSubmission = useSelector(
    (state) => state.takeSurveyReducer.responseSubmission,
  );
  // REPLACE THE BELOW WITH STATE VARIABLES WHEN LINK IS INDIVIDUAL

  const { surveyId, employeeId } = match.params;
  const anonymous = true;

  const handleSurveySubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(`/surveys/${surveyId}`, {
        employeeId,
        anonymous,
        answers,
      });
      if (response) {
        if (response.status === 204) {
          dispatch({
            type: 'RESPONSE_SUBMISSION',
          });
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error();
    }
  };

  const ConfirmationMessage = () => {
    return (
      <Box
        mt={4}
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='space-between'
        data-testid='survey-submit'
      >
        <Typography variant='h5'>
          Your responses have been submitted
          <span aria-label='partyemoji' role='img'>
            🎉
          </span>
        </Typography>
      </Box>
    );
  };
  return (
    <Box
      mt={4}
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
      data-testid='survey-submit'
    >
      <Box my={4}>
        <Typography variant='h4'>You have finished the survey!</Typography>
        <Typography variant='h4'>Thanks for your time.</Typography>
        <SurveyCompletedImage />
      </Box>
      <Box mb={2}>
        {!responseSubmission ? (
          <Button
            variant='contained'
            color='secondary'
            onClick={handleSurveySubmit}
          >
            Submit My Responses
          </Button>
        ) : (
          <ConfirmationMessage />
        )}
      </Box>

      <Typography>
        Made with ❤ by Tom Galligan, Antonio Gargaro, Thomas Kostrzewski, Martha
        Lambert, Lyndsey Scott, and João Viana
      </Typography>
    </Box>
  );
};

SurveySubmit.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.shape({
    params: PropTypes.shape({
      surveyId: PropTypes.string,
      employeeId: PropTypes.string,
    }),
  }).isRequired,
};

export default SurveySubmit;
