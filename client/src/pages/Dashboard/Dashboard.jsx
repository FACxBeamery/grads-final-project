import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import styles from './Dashboard.module.css';
import SurveyCard from './components/SurveyCard';
import AllSurveysTable from './components/AllSurveysTable';

const Dashboard = () => {
  const [activeSurveys, setActiveSurveys] = useState(true);
  const [allSurveys, setAllSurveys] = useState(false);
  const { surveys } = useSelector((state) => ({
    surveys: state.dashboardReducer.surveys,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    async function getSurveys() {
      const response = await axios.get('/surveys');
      dispatch({ type: 'SET_SURVEYS', payload: response.data });
    }
    getSurveys();
    // dispatch({ type: 'SET_SURVEYS', payload: dummySurveys });
  }, [surveys]);

  return (
    <Box>
      <Typography variant='h1'>Dashboard</Typography>
      {activeSurveys && (
        <Box>
          <Typography variant='h2'>Active Surveys</Typography>
          <Grid container>
            {surveys.map((survey, idx) => {
              return <SurveyCard key={idx} survey={survey} />;
            })}
          </Grid>
          <Container maxWidth='sm' className={styles['center']} mb={4}>
            <Button
              onClick={(e) => {
                setActiveSurveys(false);
                setAllSurveys(true);
              }}
              color='secondary'
            >
              see all surveys
            </Button>
          </Container>
        </Box>
      )}
      {allSurveys && (
        <Box>
          <Typography variant='h2'>All Surveys</Typography>

          <Container
            maxWidth='sm'
            className={styles['center']}
            mb={4}
          ></Container>
          <Container className={styles['center']} mb={4}>
            <AllSurveysTable surveys={surveys} />
          </Container>
          <Container maxWidth='sm' className={styles['center']} mb={4}>
            <Button
              onClick={(e) => {
                setActiveSurveys(true);
                setAllSurveys(false);
              }}
              color='secondary'
            >
              See only Active Surveys
            </Button>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
