import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import styles from './UserProgressStepper.module.css';

const UserProgressStepper = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.takeSurveyReducer.activeStep);
  const questions = useSelector((state) => state.takeSurveyReducer.questions);
  // const QuestionsArray = [1, 2, 3, 4, 5, 6];
  const numberOfSteps = questions.length + 1;

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_STEP' });
    dispatch({
      type: 'SET_ACTIVE_QUESTION',
    });

    //TODO condition for not being able to skip a required question
  };
  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_STEP' });
    dispatch({
      type: 'SET_ACTIVE_QUESTION',
    });
  };

  return (
    <MobileStepper
      className={styles['mobile-stepper']}
      variant='progress'
      position='static'
      activeStep={activeStep}
      steps={numberOfSteps}
      nextButton={
        <Button size='small' onClick={nextQuestion} disabled={activeStep === 5}>
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button
          size='small'
          onClick={previousQuestion}
          disabled={activeStep === 0}
        >
          <KeyboardArrowLeft />
        </Button>
      }
    ></MobileStepper>
  );
};

export default UserProgressStepper;
