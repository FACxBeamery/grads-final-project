import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

const SurveyDescription = () => {
  const survey = useSelector((state) => state.takeSurveyReducer.survey);

  return (
    <Box mt={4} alignItems='center' justifyContent='space-between'>
      <Box mb={2}>
        <Typography data-testid='survey-title' variant='h3'>
          {survey.title}
        </Typography>
      </Box>
      <Typography data-testid='survey-description' variant='h5'>
        {survey.description}
      </Typography>
      {/* <Typography data-testid="survey-disclaimer" variant='h5'>{survey.disclaimer}</Typography> */}
    </Box>
  );
};

export default SurveyDescription;
