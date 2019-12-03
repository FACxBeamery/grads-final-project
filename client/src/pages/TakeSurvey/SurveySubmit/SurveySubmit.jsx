import React from 'react';

import { Box, Typography, Button } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

const SurveySubmit = () => {
  const answers = useSelector((state) => state.takeSurveyReducer.answers);

  //   const handleSurveySubmit = (event) => {
  //     event.preventDefault();
  //     // POST request with answers => responses + employee ID
  //   };
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
          You've finished the survey 🎉 Thanks for your time.
        </Typography>
      </Box>
      <Box mb={2}>
        <Button
          variant='contained'
          color='secondary'
          //onClick={handleSurveySubmit}
        >
          Submit My Responses
        </Button>
      </Box>
      <Box>
        <Typography>Made with ❤️ by Beamery Graduate Team</Typography>
      </Box>
    </Box>
  );
};

export default SurveySubmit;
