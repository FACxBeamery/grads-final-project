import React from 'react';
import { Box, Typography } from '@material-ui/core';
import TemplateSurveysTable from './components/TemplateSurveysTable';

const SurveyBuilderFromTemplate = () => {
  return (
    <Box>
      <Typography gutterBottom variant='h3'>
        Create Survey From Template
      </Typography>
      <Typography gutterBottom variant='subtitle1'>
        Duplicate one of the surveys you have previously built.
      </Typography>

      <TemplateSurveysTable />
    </Box>
  );
};

export default SurveyBuilderFromTemplate;
