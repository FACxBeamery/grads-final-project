import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

const SurveyDescription = () => {
  const survey = useSelector((state) => state.takeSurveyReducer.survey);

  const AnonymousDisclaimer = () => {
    return (
      <Typography>
        This survey is anonymous. Your responses will not be linked to your
        personal data.
      </Typography>
    );
  };

  const NonAnonymousDisclaimer = () => {
    return (
      <Typography>
        This survey is not anonymous. Your responses will be linked to your
        personal data.
      </Typography>
    );
  };
  const SurveyTitle = () => {
    return (
      <Typography data-testid='survey-title' variant='h3'>
        {survey.title}
      </Typography>
    );
  };

  const SurveyDescription = () => {
    return (
      <Typography data-testid='survey-description' variant='h5'>
        {survey.description}
      </Typography>
    );
  };

  const SurveyDisclaimer = () => {
    return (
      <Typography data-testid='survey-disclaimer' variant='h5'>
        {survey.disclaimer}
      </Typography>
    );
  };
  return (
    <Box
      mt={4}
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
    >
      <Box mb={2}>
        <SurveyTitle />
      </Box>
      <SurveyDescription />
      <SurveyDisclaimer />
      {survey.anonymous && <AnonymousDisclaimer />}
      {!survey.anonymous && <NonAnonymousDisclaimer />}
    </Box>
  );
};

export default SurveyDescription;
