import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import UserProgressStepper from './UserProgressStepper/UserProgressStepper';
import QuestionCard from './QuestionCard/QuestionCard';
import SurveyDescription from './SurveyDescription/SurveyDescription';
import SurveySubmit from './SurveySubmit/SurveySubmit';
import SurveyClosedMessage from './SurveyClosedMessage/SurveyClosedMessage';
import AlreadyCompletedMessage from './AlreadyCompletedMessage/AlreadyCompletedMessage';

const TakeSurvey = ({ match }) => {
  const dispatch = useDispatch();
  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );

  const { employeeId, surveyId } = match.params;

  useEffect(() => {
    const getSurvey = async () => {
      const response = await axios.get(`/surveys/${surveyId}`);
      dispatch({ type: 'SET_SURVEY', payload: response.data });
      dispatch({ type: 'SET_QUESTIONS', payload: response.data.questions });
      dispatch({ type: 'SET_INITIAL_ANSWERS' });
      dispatch({
        type: 'SET_SURVEY_CLOSED',
        payload: response.data.status === 'closed',
      });
      dispatch({
        type: 'SET_EMPLOYEE_COMPLETED',
        payload:
          response.data.recipients.filter(
            (recipient) => recipient.employeeId === employeeId,
          )[0].completed === true,
      });
    };
    getSurvey();
  }, [dispatch, employeeId, surveyId]);

  const { surveyClosed, employeeHasCompleted } = useSelector(
    (state) => state.takeSurveyReducer,
  );

  return (
    <Box display='flex' flexDirection='column'>
      <UserProgressStepper />
      {employeeHasCompleted && <AlreadyCompletedMessage />}
      {surveyClosed && <SurveyClosedMessage />}
      {activeQuestion === 'start' ? <SurveyDescription /> : <QuestionCard />}
      {activeQuestion === 'end' && <SurveySubmit match={match} />}
    </Box>
  );
};

TakeSurvey.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      surveyId: PropTypes.string,
      employeeId: PropTypes.string,
    }),
  }).isRequired,

  surveyId: PropTypes.string.isRequired,
  employeeId: PropTypes.string.isRequired,
};
export default TakeSurvey;
