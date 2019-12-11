import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Typography, Button, Grid, Box } from '@material-ui/core';

import SurveyCard from './components/SurveyCard';
import AllSurveysTable from './components/AllSurveysTable';
import SplitButton from '../../components/SplitButton';

const Dashboard = ({ history }) => {
  const { surveys, showActiveSurveys } = useSelector((state) => ({
    surveys: state.dashboardReducer.surveys,
    showActiveSurveys: state.dashboardReducer.showActiveSurveys,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'RESET_SPLIT_BUTTON_STATE' });
    dispatch({
      type: 'SET_OPTIONS',
      payload: ['Create Survey', 'Create from template'],
    });

    const getSurveys = async () => {
      const { data } = await axios.get('/surveys');
      const allSurveysData = data;
      dispatch({ type: 'SET_SURVEYS', payload: allSurveysData });
    };
    getSurveys();
  }, [dispatch]);

  const goToSurveyBuilder = () => {
    history.push(`/admin/surveys/create`);
    dispatch({ type: 'RESET_SURVEY_DATA' });
  };

  const ActiveSurveyCards = () => {
    const publishedSurveys = surveys.filter(
      (survey) => survey.status === 'active',
    );
    const isPublishedSurveysEmpty = publishedSurveys.length === 0;
    return (
      <Grid container spacing={1}>
        {publishedSurveys.map((survey, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <SurveyCard key={idx} survey={survey} />
        ))}
        {isPublishedSurveysEmpty && (
          <Typography variant='h6'>No active surveys available. </Typography>
        )}
      </Grid>
    );
  };

  const DraftSurveyCards = () => {
    const draftSurveys = surveys.filter((survey) => survey.status === 'draft');
    const isDraftSurveysEmpty = draftSurveys.length === 0;
    return (
      <Grid container spacing={1}>
        {draftSurveys.map((survey, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <SurveyCard key={idx} survey={survey} />
        ))}
        {isDraftSurveysEmpty && (
          <Typography variant='h6'>No draft surveys available. </Typography>
        )}
      </Grid>
    );
  };

  const ActiveAndDraftSurveys = () => {
    return (
      <Box>
        <Box my={4}>
          <Typography variant='h4'>Active Surveys</Typography>
        </Box>
        <ActiveSurveyCards />
        <Box my={4}>
          <Typography variant='h4'>Draft Surveys</Typography>
        </Box>
        <DraftSurveyCards />
      </Box>
    );
  };

  const AllSurveys = () => {
    return (
      <Box>
        <Box my={4}>
          <Typography variant='h3'>All Surveys</Typography>
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
        <Typography variant='h2'>Dashboard</Typography>
        <SplitButton />
        {/* <Button
          onClick={goToSurveyBuilder}
          variant='contained'
          color='secondary'
        >
          Create New Survey
        </Button> */}
      </Box>
      <Box display='flex' justifyContent='center' my={4}>
        <DashboardButton />
      </Box>
      {showActiveSurveys ? <ActiveAndDraftSurveys /> : <AllSurveys />}
    </Box>
  );
};

Dashboard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(Dashboard);
