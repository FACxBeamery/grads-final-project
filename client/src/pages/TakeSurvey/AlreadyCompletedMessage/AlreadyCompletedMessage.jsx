import React from 'react';

import { Typography, Box } from '@material-ui/core';
import AlreadyCompletedImage from './AlreadyCompletedImage';

const AlreadyCompletedMessage = () => (
  <Box my={6} display='flex' flexDirection='column' alignItems='center'>
    <Typography variant='h4' gutterBottom>
      You have completed this survey!
    </Typography>
    <Typography variant='body1'>Thank you for your response.</Typography>
    <Box my={5}>
      <AlreadyCompletedImage />
    </Box>
  </Box>
);

export default AlreadyCompletedMessage;
