import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import styles from './Dashboard.module.css';
import SurveyCard from './components/SurveyCard';
import AllSurveysTable from './components/AllSurveysTable';

const Dashboard = () => {
  const { surveys } = useSelector((state) => ({
    surveys: state.dashboardReducer.surveys,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    async function getSurveys() {
      const response = await axios.get('/surveys');
      dispatch({ type: 'SET_SURVEYS', payload: response.data });
      // console.log(response);
    }
    getSurveys();
    // dispatch({ type: 'SET_SURVEYS', payload: dummySurveys });
  }, [surveys]);

  return (
    <div>
      <Typography variant='h1'>Dashboard</Typography>
      <Typography variant='h2'>Active Surveys</Typography>
      <Grid container spacing={2}>
        {surveys.map((survey, idx) => {
          return <SurveyCard key={idx} survey={survey} />;
        })}
      </Grid>
      <Container maxWidth='sm' className={styles['center']} mb={4}>
        <Button color='secondary'>see all surveys</Button>
      </Container>
      <Container maxWidth='sm' className={styles['center']} mb={4}>
        <AllSurveysTable />
      </Container>
    </div>
  );
};

export default Dashboard;
