import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { Typography, Button, Grid, Box } from '@material-ui/core';

import SurveyCard from './components/SurveyCard';
import AllSurveysTable from './components/AllSurveysTable';

const Dashboard = () => {
  const [activeSurveys, setActiveSurveys] = useState(true);
  const { surveys } = useSelector((state) => ({
    surveys: state.dashboardReducer.surveys,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    const getSurveys = async () => {
      // try {
      const { data } = await axios.get('/surveys');
      const allSurveysData = data;
      dispatch({ type: 'SET_SURVEYS', payload: allSurveysData });
      // } catch (error) {
      //   throw error;
      // }
    };
    getSurveys();
  }, [dispatch]);

  const title = activeSurveys ? 'Active Surveys' : 'All Surveys';

  const SurveyCards = () => {
    return (
      <Grid container>
        {surveys
          .filter((survey) => survey.status === 'published')
          .map((survey, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <SurveyCard key={idx} survey={survey} />
          ))}
      </Grid>
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
          setActiveSurveys(!activeSurveys);
        }}
        color='secondary'
      >
        {activeSurveys ? 'See all Surveys' : 'See only Active Surveys'}
      </Button>
    );
  };
  return (
    <Box>
      <Typography variant='h1'>Dashboard</Typography>
      <Box my={4}>
        <Typography variant='h2'>{title}</Typography>
      </Box>
      {activeSurveys ? <SurveyCards /> : <SurveyTable />}
      <Box display='flex' justifyContent='center' my={4}>
        <DashboardButton />
      </Box>
    </Box>
  );
};

export default Dashboard;
