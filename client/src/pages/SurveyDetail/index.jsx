import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Typography, Button, Grid, Box } from '@material-ui/core';

const publishSurvey = async (_id) => {
  await axios.patch(`/surveys/${_id}`, {
    status: 'published',
    datePublished: Date.now(),
  });
};

const closeSurvey = async (_id) => {
  await axios.patch(`/surveys/${_id}`, {
    status: 'closed',
    dateClosed: Date.now(),
  });
};

const PublishSurveyButton = ({ match }) => {
  const { params } = match;
  const { id } = params;
  return (
    <Button
      type='submit'
      width='auto'
      variant='contained'
      color='secondary'
      onClick={() => publishSurvey(id)}
    >
      Publish Survey
    </Button>
  );
};

const CloseSurveyButton = ({ match }) => {
  const { params } = match;
  const { id } = params;
  return (
    <Button
      type='submit'
      width='auto'
      variant='contained'
      color='secondary'
      onClick={() => closeSurvey(id)}
    >
      Close Survey
    </Button>
  );
};

const SurveyDetail = ({ match }) => {
  const allState = useSelector((state) => state);
  console.log('STATE: ', allState);

  const dispatch = useDispatch();

  const { title, status, datePublished, dateClosed } = useSelector(
    (state) => state.createSurveyReducer,
  );

  return (
    <Box display='flex' flexDirection='row' align-items='flex-start'>
      <CloseSurveyButton match={match} />
      <PublishSurveyButton match={match} />
    </Box>
  );
};

SurveyDetail.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
};

CloseSurveyButton.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
};

PublishSurveyButton.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
};

export default SurveyDetail;
