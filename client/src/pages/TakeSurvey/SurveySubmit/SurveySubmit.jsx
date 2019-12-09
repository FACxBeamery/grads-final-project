import React from 'react';

import { Box, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const SurveySubmit = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.takeSurveyReducer.answers);
  const responseSubmission = useSelector(
    (state) => state.takeSurveyReducer.responseSubmission,
  );
  // REPLACE THE BELOW WITH STATE VARIABLES WHEN LINK IS INDIVIDUAL

  const employeeId = "507f1f77bcf86cd799439012"
  const surveyId = "508f1f99bcf86cd799439214"

  const anonymous = true;

  const handleSurveySubmit = (event) => {
    event.preventDefault();
    axios.patch('/surveys', { employeeId, anonymous, surveyId, answers });
    dispatch({
      type: 'RESPONSE_SUBMISSION',
    });
  };

  const ConfirmationMessage = () => {
    return (
      <Box>
        <Typography> Your responses have been submitted :) </Typography>
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
      <Box mb={2}>
        <Typography variant='h4'>
          You have finished the survey! Thanks for your time.
        </Typography>
      </Box>
      <Box mb={2}>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleSurveySubmit}
        >
          Submit My Responses
        </Button>
        {responseSubmission === true ? <ConfirmationMessage /> : null}
      </Box>

      <Typography>
        Made with ❤ by Tom Galligan, Antonio Gargaro, Thomas Kostrzewski, Martha
        Lambert, Lyndsey Scott, and João Viana
      </Typography>
    </Box>
  );
};

export default SurveySubmit;
