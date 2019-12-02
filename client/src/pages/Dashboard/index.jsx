import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Typography, Button, Grid, Box } from '@material-ui/core';

import SurveyCard from './components/SurveyCard';
import AllSurveysTable from './components/AllSurveysTable';

const Dashboard = () => {
  const { surveys, showActiveSurveys } = useSelector((state) => ({
    surveys: state.dashboardReducer.surveys,
    showActiveSurveys: state.dashboardReducer.showActiveSurveys,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    const getSurveys = async () => {
      const { data } = await axios.get('/surveys');
      const allSurveysData = data;
      dispatch({ type: 'SET_SURVEYS', payload: allSurveysData });
    };
    getSurveys();
  }, [dispatch]);

  const ActiveSurveyCards = () => {
    return (
      <Grid container spacing={1}>
        {surveys
          .filter((survey) => survey.status === 'published')
          .map((survey, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <SurveyCard key={idx} survey={survey} />
          ))}
      </Grid>
    );
  };

  const DraftSurveyCards = () => {
    return (
      <Grid container spacing={1}>
        {surveys
          .filter((survey) => survey.status === 'draft')
          .map((survey, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <SurveyCard key={idx} survey={survey} />
          ))}
      </Grid>
    );
  };

  const ActiveAndDraftSurveys = () => {
    return (
      <Box>
        <Box my={4}>
          <Typography variant='h2'>Active Surveys</Typography>
        </Box>
        <ActiveSurveyCards />
        <Box my={4}>
          <Typography variant='h2'>Draft Surveys</Typography>
        </Box>
        <DraftSurveyCards />
      </Box>
    );
  };

  const AllSurveys = () => {
    return (
      <Box>
        <Box my={4}>
          <Typography variant='h2'>All Surveys</Typography>
        </Box>
        <SurveyTable />
      </Box>
    );
  };

  const SurveyTable = () => {
    return (
      <Grid container>
        <AllSurveysTable surveys={surveys} />
      </Grid>
    );
  };

  const DashboardButton = () => {
    return (
      <Button
        onClick={() => {
          dispatch({ type: 'SWAP_VIEWS' });
        }}
        color='secondary'
      >
        {showActiveSurveys
          ? 'See all Surveys'
          : 'See only Active and Draft Surveys'}
      </Button>
    );
  };
  return (
    <Box>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h1'>Dashboard</Typography>
        <Button
          component={Link}
          to={{
            pathname: `/admin/surveys/create`,
          }}
          variant='contained'
          color='secondary'
        >
          Create New Survey
        </Button>
      </Box>
      <Box display='flex' justifyContent='center' my={4}>
        <DashboardButton />
      </Box>
      {showActiveSurveys ? <ActiveAndDraftSurveys /> : <AllSurveys />}
    </Box>
  );
};

export default Dashboard;
