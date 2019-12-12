import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Box } from '@material-ui/core';
import UserProgressStepper from './UserProgressStepper/UserProgressStepper';
import QuestionCard from './QuestionCard/QuestionCard';
import SurveyDescription from './SurveyDescription/SurveyDescription';
import SurveySubmit from './SurveySubmit/SurveySubmit';
import SurveyClosedMessage from './SurveyClosedMessage/SurveyClosedMessage';
import AlreadyCompletedMessage from './AlreadyCompletedMessage/AlreadyCompletedMessage'

const TakeSurvey = () => {
  const dispatch = useDispatch();
  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );

  const employeeId = "507f1f77bcf86cd799439017"
  const surveyId = "508f1f99bcf86cd799439214"

  useEffect(() => {
    const getSurvey = async () => {
      const response = await axios.get(`/surveys/${surveyId}`);
      console.log("response: ", response)
      dispatch({ type: 'SET_SURVEY', payload: response.data });
      dispatch({ type: 'SET_QUESTIONS', payload: response.data.questions });
      dispatch({ type: 'SET_INITIAL_ANSWERS' });
      dispatch({ type: 'SET_SURVEY_CLOSED', payload: response.data.status === 'closed' })
      dispatch({ type: 'SET_EMPLOYEE_COMPLETED', payload: response.data.recipients.filter(recipient => recipient.employeeId === employeeId)[0].completed === true })
    };
    getSurvey();

  }, [dispatch]);

  const surveyClosed = useSelector(state => state.takeSurveyReducer.surveyClosed)

  const employeeHasCompleted = useSelector(state => state.takeSurveyReducer.employeeHasCompleted)

  if (employeeHasCompleted) {
    return <AlreadyCompletedMessage />
  } else if (surveyClosed) {
    return <SurveyClosedMessage />
  }
  return (
    < Box display='flex' flexDirection='column' >
      <UserProgressStepper />
      {activeQuestion === 'start' ? <SurveyDescription /> : <QuestionCard />}
      {activeQuestion === 'end' ? <SurveySubmit /> : null}
    </Box >)


};
export default TakeSurvey;
