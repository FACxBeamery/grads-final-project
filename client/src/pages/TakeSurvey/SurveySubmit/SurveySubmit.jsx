import React from 'react';

import { Box, Typography, Button } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

const SurveySubmit = () => {
  const responses = useSelector((state) => state.takeSurveyReducer.responses);

  //   const handleSurveySubmit = (event) => {
  //     event.preventDefault();
  //     // POST request with responses
  //   };
  return (
    <Box>
      <Typography variant='h3'>
        You've finished the survey 🎉 Thanks for your time
      </Typography>
      <Button
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
