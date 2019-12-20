import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

const SurveyDescription = () => {
  const survey = useSelector((state) => state.takeSurveyReducer.survey);

  const AnonymousDisclaimer = () => {
    return (
      <Typography variant='h5'>
        This survey is
        <strong> anonymous</strong>
        .Your responses will not be linked to your personal data.
      </Typography>
    );
  };

  const NonAnonymousDisclaimer = () => {
    return (
      <Typography variant='h5'>
        This survey is
        <strong> not </strong>
        anonymous. Your responses will be linked to your personal data.
      </Typography>
    );
  };
  const SurveyTitle = () => {
    return (
      <Typography color='primary' data-testid='survey-title' variant='h2'>
        {survey.title}
      </Typography>
    );
  };

  const SurveyDescriptionText = () => {
    return (
      <Typography data-testid='survey-description' color='primary' variant='h4'>
        {survey.description}
      </Typography>
    );
  };

  const SurveyDisclaimer = () => {
    return (
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        mt={2}
        mb={4}
      >
        <Box alignItems='left'>
          <Typography variant='h5' style={{ fontWeight: 'bold' }}>
            Privacy Notice :
          </Typography>
        </Box>
        <Box alignItems='center'>
          <Typography
            data-testid='survey-disclaimer'
            variant='h6'
            style={{ fontStyle: 'italic' }}
          >
            {survey.disclaimer}
          </Typography>
        </Box>
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
    >
      <Box mb={4}>
        <SurveyTitle />
      </Box>
      <Box mb={4}>
        <SurveyDescriptionText />
      </Box>

      {survey.anonymous && <AnonymousDisclaimer />}
      {!survey.anonymous && <NonAnonymousDisclaimer />}
      <SurveyDisclaimer />
    </Box>
  );
};

export default SurveyDescription;
