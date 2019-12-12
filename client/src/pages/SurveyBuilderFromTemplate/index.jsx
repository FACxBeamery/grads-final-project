import React from 'react';
import { Box, Typography } from '@material-ui/core';
import TemplateSurveysTable from './components/TemplateSurveysTable';

const SurveyBuilderFromTemplate = () => {
  return (
    <Box>
      <Typography gutterBottom variant='h2'>
        Create Survey From Template
      </Typography>
      <Typography gutterBottom variant='subtitle1'>
        Use existing surveys as templates.
      </Typography>

      <TemplateSurveysTable />
    </Box>
  );
};

export default SurveyBuilderFromTemplate;
