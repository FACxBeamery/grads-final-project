import React from 'react';

import { Box, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SurveySubmit = () => {
  const answers = useSelector((state) => state.takeSurveyReducer.answers);
  // REPLACE THE BELOW WITH STATE VARIABLES
  const surveyId = '5de52524d55c7b00681530d8';
  const employeeId = '507f1f77bcf86cd799439073';
  const anonymous = true;
  const handleSurveySubmit = (event) => {
    event.preventDefault();
    axios.patch('/surveys', { employeeId, anonymous, surveyId, answers });
  };
  return (
    <Box>
      <Typography variant='h3'>
        You've finished the survey 🎉 Thanks for your time
      </Typography>
      <Button onClick={handleSurveySubmit}>Submit My Responses</Button>
      <Typography variant='h5'>
        Made with ❤️ by Tom Galligan, Antonio Gargaro, Thomas Kostrzewski,
        Martha Lambert, Lyndsey Scott, and João Viana
      </Typography>
    </Box>
  );
};

export default SurveySubmit;
