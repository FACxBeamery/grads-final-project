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
  const QuestionsArray = [1, 2, 3, 4, 5, 6];
  const numberOfSteps = QuestionsArray.length;

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_STEP' });
  };
  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_STEP' });
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
