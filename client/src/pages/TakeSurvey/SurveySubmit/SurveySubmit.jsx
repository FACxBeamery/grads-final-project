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
    <Box alignSelf='center' justifyContent='center'>
      <Typography variant='h4'>
        You've finished the survey 🎉 Thanks for your time
      </Typography>
      <Button
        variant='contained'
        color='secondary'
        //onClick={handleSurveySubmit}
      >
        Submit My Responses
      </Button>
      <Typography variant='h5'>
        Made with ❤️ by Beamery Graduate Team
      </Typography>
    </Box>
  );
};

export default SurveySubmit;
