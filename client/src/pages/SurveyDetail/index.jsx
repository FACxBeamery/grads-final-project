import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Typography, Button, Grid, Box } from '@material-ui/core';

const publishSurvey = (_id) => {
  axios.patch(`/surveys/${_id}`, {
    status: 'publish',
    datePublished: Date.now(),
  });
};

const closeSurvey = (_id) => {
  axios.patch(`/surveys/${_id}`, {
    status: 'closed',
    dateClosed: Date.now(),
  });
};

const PublishSurveyButton = () => {
  return (
    <Button
      type='submit'
      width='auto'
      variant='contained'
      color='secondary'
      onClick={publishSurvey}
    >
      Publish Survey
    </Button>
  );
};

const CloseSurveyButton = () => {
  return (
    <Button
      type='submit'
      width='auto'
      variant='contained'
      color='secondary'
      onClick={closeSurvey}
    >
      Close Survey
    </Button>
  );
};

const SurveyDetail = () => {
  const allState = useSelector((state) => state);
  console.log('STATE: ', allState);

  const dispatch = useDispatch();

  const { _id, status, datePublished, dateClosed } = useSelector(
    (state) => state.createSurveyRecuder,
  );

  return (
    <Box display='flex' flexDirection='row' align-items='flex-start'>
      <CloseSurveyButton />
      <PublishSurveyButton />
    </Box>
  );
};

export default SurveyDetail;
