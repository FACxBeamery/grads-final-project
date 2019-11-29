import React, { useEffect } from 'react';
import UserProgressStepper from './UserProgressStepper/UserProgressStepper';
import QuestionCard from './QuestionCard/QuestionCard';
import SurveyDescription from './SurveyDescription/SurveyDescription';
import SurveySubmit from './SurveySubmit/SurveySubmit';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import axios from 'axios';

const TakeSurvey = () => {
  const dispatch = useDispatch();
  //const survey = useSelector((state) => state.takeSurveyReducer.survey);
  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );

  useEffect(() => {
    const getSurvey = async () => {
      const response = await axios.get('/surveys/507f1f77bcf86cd799439001');

      dispatch({ type: 'SET_SURVEY', payload: response.data });
      dispatch({ type: 'SET_QUESTIONS', payload: response.data.questions });
      dispatch({ type: 'SET_INITIAL_ANSWERS' });
    };
    getSurvey();
  }, [dispatch]);

  return (
    <Box display='flex' flexDirection='column'>
      {' '}
      <UserProgressStepper />
      {activeQuestion === 'start' ? <SurveyDescription /> : <QuestionCard />}
      {activeQuestion === 'end' ? <SurveySubmit /> : null}
    </Box>
  );
};

export default TakeSurvey;
