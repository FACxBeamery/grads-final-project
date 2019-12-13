import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { Box } from '@material-ui/core';
import UserProgressStepper from './UserProgressStepper/UserProgressStepper';
import QuestionCard from './QuestionCard/QuestionCard';
import SurveyDescription from './SurveyDescription/SurveyDescription';
import SurveySubmit from './SurveySubmit/SurveySubmit';

const TakeSurvey = () => {
  const dispatch = useDispatch();
  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );
  useEffect(() => {
    const getSurvey = async () => {
      const response = await axios.get('/surveys/508f1f99bcf86cd799439014');

      dispatch({ type: 'SET_SURVEY', payload: response.data });
      dispatch({ type: 'SET_QUESTIONS', payload: response.data.questions });
      dispatch({ type: 'SET_INITIAL_ANSWERS' });
    };
    getSurvey();
  }, [dispatch]);
  return (
    <Box display='flex' flexDirection='column'>
      <UserProgressStepper />
      {activeQuestion === 'start' ? <SurveyDescription /> : <QuestionCard />}
      {activeQuestion === 'end' ? <SurveySubmit /> : null}
    </Box>
  );
};
export default TakeSurvey;
