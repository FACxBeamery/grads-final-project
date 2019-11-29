import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

const SurveyDescription = () => {
  const survey = useSelector((state) => state.takeSurveyReducer.survey);
  const activeStep = useSelector((state) => state.takeSurveyReducer.activeStep);

  return (
    <Box>
      <Typography variant='h3'>{survey.title}</Typography>
      <Typography variant='h4'>{survey.description}</Typography>
    </Box>
  );
};

export default SurveyDescription;
